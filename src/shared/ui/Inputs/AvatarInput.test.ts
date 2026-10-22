/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AvatarInput from "./AvatarInput.vue";

vi.mock("@/shared/ui", () => ({
  Icon: { template: "<i />" },
  Btn: { template: '<span class="btn"><slot /></span>' },
}));

describe("AvatarInput", () => {
  const global = {};

  it("should render placeholder when there is no image", () => {
    const wrapper = mount(AvatarInput, { global });
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("should accept only jpeg and png files", () => {
    const wrapper = mount(AvatarInput, { global });
    expect(wrapper.find('input[type="file"]').attributes("accept")).toBe(
      "image/jpeg,image/png",
    );
  });

  it("should preview an existing image url from modelValue", () => {
    const wrapper = mount(AvatarInput, {
      props: { modelValue: "https://example.com/logo.png" },
      global,
    });
    expect(wrapper.find("img").attributes("src")).toBe(
      "https://example.com/logo.png",
    );
  });

  it("should clear an existing image url", async () => {
    const wrapper = mount(AvatarInput, {
      props: {
        modelValue: "https://example.com/logo.png",
        "onUpdate:modelValue": (v: File | string | null) =>
          wrapper.setProps({ modelValue: v }),
      },
      global,
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([null]);
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("should render default hint and button text", () => {
    const wrapper = mount(AvatarInput, { global });
    expect(wrapper.text()).toContain("Файл");
  });

  it("should render custom hint and button text", () => {
    const wrapper = mount(AvatarInput, {
      props: { hint: "Upload a logo", buttonText: "Choose" },
      global,
    });
    expect(wrapper.text()).toContain("Upload a logo");
    expect(wrapper.text()).toContain("Choose");
  });
});
