<script lang="ts" setup>
interface Props {
  // HTML должен быть заранее санитизирован (например, на бэке)
  html: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="text-base font-medium leading-6 tracking-[1.5%] wrap-break-word [&>*:last-child]:mb-0 [&_p]:mb-4 [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-[28px] [&_h1]:leading-9 [&_h1]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:leading-8 [&_h2]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:leading-7 [&_h3]:font-semibold [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_a]:text-success-100 [&_a]:underline [&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_i]:italic [&_blockquote]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-success-100 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[20px] [&_figure]:mb-4 [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_hr]:my-6 [&_hr]:border-gray-200"
    v-html="html"
  />
</template>
