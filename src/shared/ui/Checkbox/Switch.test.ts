/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Switch from "./Switch.vue";

describe("Switch", () => {
  const wrapper = mount(Switch);
  const btn = wrapper.find("button");

  it("should render button", () => {
    expect(btn.exists()).toBeTruthy();
  });

  it('should have role="switch"', () => {
    expect(btn.attributes("role")).toBe("switch");
  });

  it("should be off by default", () => {
    expect(btn.attributes("aria-checked")).toBe("false");
  });

  it("should apply off styles by default", () => {
    expect(btn.attributes("class")).toContain("bg-[#4E4C4D]");
  });

  it("should apply on styles when modelValue is true", async () => {
    await wrapper.setProps({ modelValue: true });
    expect(btn.attributes("class")).toContain("bg-info");
    expect(btn.attributes("aria-checked")).toBe("true");
  });

  it("should apply correct thumb position when off", async () => {
    await wrapper.setProps({ modelValue: false });
    const thumb = wrapper.find("span");
    expect(thumb.attributes("class")).toContain("translate-x-0.5");
  });

  it("should apply correct thumb position when on", async () => {
    await wrapper.setProps({ modelValue: true });
    const thumb = wrapper.find("span");
    expect(thumb.attributes("class")).toContain("translate-x-3.5");
  });

  it("should emit update:modelValue with true on click when off", async () => {
    await wrapper.setProps({ modelValue: false });
    await btn.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
  });

  it("should emit update:modelValue with false on click when on", async () => {
    await wrapper.setProps({ modelValue: true });
    await btn.trigger("click");
    const emitted = wrapper.emitted("update:modelValue")!;
    expect(emitted[emitted.length - 1]).toEqual([false]);
  });

  it("should emit update:modelValue on Space keydown", async () => {
    await wrapper.setProps({ modelValue: false });
    const before = wrapper.emitted("update:modelValue")?.length ?? 0;
    await btn.trigger("keydown.space");
    const after = wrapper.emitted("update:modelValue")?.length ?? 0;
    expect(after).toBe(before + 1);
  });
});
