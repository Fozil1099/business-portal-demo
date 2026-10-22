# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is Yarn 1 (`packageManager: yarn@1.22.22`); Node >= 22.12.

- `yarn dev` — Vite dev server (runs with `--host`)
- `yarn build` — type-check with `vue-tsc -b` and then `vite build`. This is the only type-check step. No linter is configured.
- `yarn test` — Vitest in watch mode. Use `yarn test --run` for a single run.
- Run one test file: `yarn vitest run src/shared/ui/Tabs/Tabs.test.ts`. Run one test by name: add `-t "should emit"`.

Tests use Vitest with `globals: true`, `happy-dom` and `@vue/test-utils`. Test files sit next to the component they test as `*.test.ts`. So far only `src/shared/ui` components have tests.

`VITE_API_URL` (backend base URL) and `VITE_LOCALE_STORAGE_KEY` come from `.env.development` (see `.env.example`).

## Architecture

This is a Vue 3 + TypeScript SPA (`<script setup>`, Composition API), laid out with **Feature-Sliced Design**. Layers, from top to bottom, and each layer may import only from the layers below it:

`app` → `pages` → `widgets` → `features` → `entities` → `shared`

- **pages**: thin route components that usually render a single widget.
- **widgets**: composed UI blocks. A widget may have a `model/useXWidget.ts` that builds display config such as field lists with `t()` labels.
- **features**: business slices, split into `api/` (HTTP calls + types), `model/` (composables `useX` that hold `ref` state, loading and submit logic) and `ui/` (mostly modals).
- **entities**: domain display units (`submission`, `criterion`, `region`).
- **shared**: UI kit (`shared/ui`), utils, types, config and assets.

Each slice has an `index.ts` public API. It re-exports types and composables, and exposes components as `defineAsyncComponent(() => import(...))`. Import through the slice index (e.g. `@/features/cabinet/company`), not through deep paths. Shared UI comes from `@/shared/ui`.

### Mandatory rules

These rules are not optional. If a task seems to require breaking one, stop and ask instead of working around it.

#### 1. FSD architecture, strictly

- Put new code in the correct layer and slice. Never import from a higher layer, never import sideways between slices of the same layer, and never bypass a slice's `index.ts` with a deep import.
- Keep the `api/` → `model/` → `ui/` split inside a slice. HTTP calls go only in `api/`. State, loading flags, validation and submit logic go in `model/` composables. Components in `ui/` only render and call the composable; they never call `http` and never hold business logic.
- If two slices need the same code, move it down a layer (usually to `entities` or `shared`) instead of importing across slices.

#### 2. The API contract is the backend OpenAPI schema (not included in this repository)

- This OpenAPI 3 file is the single source of truth for the backend. Before writing or changing anything in `api/`, find the endpoint there and take the exact path, HTTP method, path/query params, request body (JSON or multipart) and response shape from it. Don't guess endpoints or field names, and don't copy them from other slices.
- Request and response TypeScript types in `api/` must match the schema field-for-field, including nullable and optional fields. Multilingual fields use `Lang`, and the response wrapper is `ApiResponse<T>` (see the HTTP layer section).
- Each operation's summary says who can call it (`[Public (no login)]`, role names). Public endpoints are the ones to call from public routes.
- **Known schema gap: list endpoints are paginated.** Where the schema says a list response is `type: array`, the real `data` is `{ pagination, results }` (`ResponseData<T>` from `@/shared/types`; `pagination` has `total_items`, `total_pages`, `current_page`, `page_size`, `count`, `next_page`, `prev_page`). Pass `page`/`page_size` and render lists with `LazyScroll` + `loadMore`. The item shape in the schema is still correct.
- If the schema and existing code disagree, the schema wins: fix the code and mention it. If an endpoint you need is missing from the schema, say so instead of inventing one.

#### 3. Tailwind everywhere

- Style with Tailwind utility classes in the template. Use the design tokens from `@theme` in `src/app/styles/variables.css` (`text-success-100`, `bg-secondary-200`, ...) rather than hard-coded hex colors or arbitrary values when a token exists. If a color or size repeats and has no token, add a token to `@theme`.
- Don't add `<style>` blocks, inline `style="..."` or new SCSS in features, widgets, entities or pages. The only exceptions are things Tailwind can't express (keyframes, third-party library overrides, complex pseudo-elements); put those in `shared/ui` components or `src/shared/assets/styles`, not in a slice.

#### 4. Reusable UI lives only in `src/shared/ui`

Buttons, inputs, selects, checkboxes, radios, modals, tables, tabs, dropdowns, tooltips, pagination, loaders, avatars, cards and anything else generic are global components. Never write a raw styled `<button>`, `<input>`, `<select>`, `<textarea>` or a home-made modal/table/tab inside a feature, widget, entity or page, and never copy a shared component into a slice.

Before writing any UI, go through these steps in order:

1. **Search** `src/shared/ui` (and `shared/ui/index.ts`) for a component that does the same job or something close to it.
2. **Use it as is** if it fits, configuring it only through its props, slots and events.
3. **Extend it** if it is close but missing something: add an optional prop, slot, variant or emit whose default keeps the current behavior exactly. Existing call sites must keep working without changes, and existing tests must still pass. Add a test for the new option.
4. **Create a new global component** only if nothing similar exists, or if extending the existing one would change its main logic, break its API, or turn it into a pile of unrelated modes. Put it in its own folder `shared/ui/<Name>/` (PascalCase) with the `.vue` file, an `index.ts` and a `<Name>.test.ts`, re-export it from `shared/ui/index.ts`, style it with Tailwind, and keep it free of business logic, API calls and feature imports (text comes in through props/slots, not hard-coded `t()` keys of a feature).

Business-specific UI (a company card that knows the company type, an employee row) stays in its feature, widget or entity, but it is built out of `shared/ui` components.

State is kept in per-feature composables. Pinia is used only for `app/store/auth.ts` (refresh and logout).

### HTTP layer (`src/app/providers/axios`)

All API calls go through the `http` instance exported from `@/app/providers/axios/http`. The interceptors change the usual axios behavior:

- **The response interceptor returns `response.data`**, so a call resolves to the response body, not to an AxiosResponse. Every endpoint wraps its payload as `{ id, message, data, success }` (`ApiResponse<T>` in `@/shared/types`), and `http` is typed as `HttpClient`, so `http.get<T>()` returns `Promise<ApiResponse<T>>` and `const { data } = await getCompany(id)` gives the payload. Always pass `T`, since it defaults to `unknown`. Use `http.getFile(url)` for binary downloads; it resolves to a `Blob`, not the wrapper.
- **Toasts are automatic.** A non-GET 200 response that has a `message` field shows a success toast. An error response with a `message` shows an error toast, except for status 423. Don't add duplicate toasts for these cases.
- A 401 response triggers a refresh-token flow (`tokenRefresh.ts`). Concurrent requests are queued and retried with the new token.
- A request header `no_add_token: true` skips the `Authorization` header.
- Multipart payloads are built with `changeToFormData` from `@/shared/utils/formatter`. Array fields are JSON-stringified first.

### Auth and routing

- The access token, refresh token and `userData` are stored in **cookies** (`src/shared/utils/auth.ts`), not in Pinia or localStorage. Cabinet endpoints are keyed by `getUserData()?.company_id`.
- Routes are split into `app/router/public` and `app/router/private`. The global guard (`shared/utils/routerPermissions.ts`) redirects to `home` unless the user is logged in **or** the route has `meta.loginNotRequired: true`. Every public route must set this.
- `meta.layout` (`main` by default, `empty` or `cabinet`) selects the layout wrapper in `App.vue`.

### i18n

- vue-i18n in composition mode. There are two locales, `uz` (the default and fallback) and `ru`, stored in `src/app/providers/i18n/locales/*.json`. All UI text goes through `t()`. Add each new key to **both** files.
- Multilingual API fields have type `Lang` (`{ uz, ru }`). Render them with `field[localeKey]`, where `localeKey` comes from `useLocale()` (`@/shared/model/useLocale`).

### UI kit specifics

- **Modals** are shown and hidden imperatively through the DOM by id, not through `v-if` or `v-model`. Render `<Modal id="x">`, then open it with the `v-modal="'x'"` directive or with `modal("x").show()` / `.hide()` from `@/shared/ui`.
- **Icons**: SVG files go in `src/shared/assets/icons`. The `@neodx/svg` Vite plugin builds them into `public/sprites/` and generates `src/shared/ui/Icon/sprite.gen.ts`. That file is autogenerated, so never edit it by hand; it changes whenever icons change. Use icons as `<Icon name="edit" />`, which is type-checked against `IconName`.
- **Styling**: Tailwind v4 through `@tailwindcss/vite`, with no config file. Design tokens are defined in `@theme` in `src/app/styles/variables.css`, e.g. `text-success-100`, `bg-secondary-200`. Gradient and helper classes are in SCSS under `src/shared/assets/styles`. The font is Gilroy.

### Gotchas

- **Directory names are PascalCase** (`shared/ui/Modals`, `Icon`, `Buttons`, ...), but many imports use lowercase (`./modals`, `@/shared/ui/icon/types`). This works only because Windows and git are case-insensitive here (`core.ignorecase=true`); a build on Linux would fail. Watch for this when adding or moving files.
- The `Accept-Language` header value is read **once** when the module loads (`requestInterceptor.ts`), so it does not follow later locale changes. The initial i18n locale is read from localStorage key `last-locale`, but `useLocale` saves to `VITE_LOCALE_STORAGE_KEY` (`locale`).
- The permission check `check()` in `shared/utils/auth.ts` is a stub that always returns `true`.
