/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import LocationInput from "./LocationInput.vue";
import { loadYandexMaps } from "@/shared/utils/yandexMaps";

vi.mock("@/shared/utils/yandexMaps", () => ({ loadYandexMaps: vi.fn() }));

type Handler = (event?: { get: (key: string) => unknown }) => void;

const createYmaps = () => {
  const state = {
    map: null as null | {
      options: Record<string, unknown>;
      handlers: Record<string, Handler>;
      added: unknown[];
    },
  };

  class Placemark {
    coords: number[];
    handlers: Record<string, Handler> = {};
    geometry = {
      getCoordinates: () => this.coords,
      setCoordinates: (coords: number[]) => (this.coords = coords),
    };
    events = { add: (name: string, fn: Handler) => (this.handlers[name] = fn) };
    constructor(coords: number[]) {
      this.coords = coords;
    }
  }

  class Map {
    options: Record<string, unknown>;
    handlers: Record<string, Handler> = {};
    added: unknown[] = [];
    events = { add: (name: string, fn: Handler) => (this.handlers[name] = fn) };
    geoObjects = {
      add: (obj: unknown) => this.added.push(obj),
      remove: (obj: unknown) => (this.added = this.added.filter((o) => o !== obj)),
    };
    panTo = vi.fn();
    destroy = vi.fn();
    constructor(_el: HTMLElement, options: Record<string, unknown>) {
      this.options = options;
      state.map = this;
    }
  }

  return { ymaps: { Map, Placemark }, state };
};

describe("LocationInput", () => {
  it("should center on the default point without a placemark", async () => {
    const { ymaps, state } = createYmaps();
    vi.mocked(loadYandexMaps).mockResolvedValue(ymaps);

    mount(LocationInput);
    await flushPromises();

    expect(state.map?.options.center).toEqual([48.858370, 2.294481]);
    expect(state.map?.added).toHaveLength(0);
  });

  it("should show a placemark for the initial value", async () => {
    const { ymaps, state } = createYmaps();
    vi.mocked(loadYandexMaps).mockResolvedValue(ymaps);

    mount(LocationInput, { props: { modelValue: [40.1, 71.7] } });
    await flushPromises();

    expect(state.map?.options.center).toEqual([40.1, 71.7]);
    expect(state.map?.added).toHaveLength(1);
  });

  it("should emit the clicked coordinates", async () => {
    const { ymaps, state } = createYmaps();
    vi.mocked(loadYandexMaps).mockResolvedValue(ymaps);

    const wrapper = mount(LocationInput);
    await flushPromises();
    state.map?.handlers.click?.({ get: () => [41.2, 69.3] });

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([[41.2, 69.3]]);
  });

  it("should show the error slot when the map fails to load", async () => {
    vi.mocked(loadYandexMaps).mockImplementation(() =>
      Promise.reject(new Error("offline")),
    );

    const wrapper = mount(LocationInput, {
      slots: { error: "Карта недоступна" },
    });
    await flushPromises();

    expect(wrapper.text()).toContain("Карта недоступна");
  });
});
