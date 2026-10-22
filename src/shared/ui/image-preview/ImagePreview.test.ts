/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ImagePreview from "./ImagePreview.vue";

describe("ImagePreview", () => {
  const defaultProps = {
    src: "https://example.com/image.jpg",
    alt: "Test image",
  };

  it("should render image with correct src", () => {
    const wrapper = mount(ImagePreview, {
      props: defaultProps,
      attachTo: document.body,
    });
    const img = document.body.querySelector("img");
    expect(img?.getAttribute("src")).toBe(defaultProps.src);
    wrapper.unmount();
  });

  it("should render image with correct alt", () => {
    const wrapper = mount(ImagePreview, {
      props: defaultProps,
      attachTo: document.body,
    });
    const img = document.body.querySelector("img");
    expect(img?.getAttribute("alt")).toBe(defaultProps.alt);
    wrapper.unmount();
  });

  it('should use "Preview" as default alt', () => {
    const wrapper = mount(ImagePreview, {
      props: { src: "image.jpg" },
      attachTo: document.body,
    });
    const img = document.body.querySelector("img");
    expect(img?.getAttribute("alt")).toBe("Preview");
    wrapper.unmount();
  });

  it("should emit close when overlay is clicked", async () => {
    const wrapper = mount(ImagePreview, {
      props: defaultProps,
      attachTo: document.body,
    });
    const overlay = document.body.querySelector(".fixed") as HTMLElement;
    overlay?.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("close")).toBeTruthy();
    wrapper.unmount();
  });

  it("should emit close when close button is clicked", async () => {
    const wrapper = mount(ImagePreview, {
      props: defaultProps,
      attachTo: document.body,
    });
    const btn = document.body.querySelector(
      'button[aria-label="Закрыть"]',
    ) as HTMLElement;
    btn?.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("close")).toBeTruthy();
    wrapper.unmount();
  });
});
