/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Checkbox from "./Checkbox.vue";

describe("Checkbox", () => {
  const wrapper = mount(Checkbox);
  const input = wrapper.find("input");

  it("should render input", () => {
    expect(input.exists()).toBeTruthy();
  });

  it("should be unchecked by default", () => {
    expect(input.element.checked).toBe(false);
  });

  it("should be checked when modelValue is true", async () => {
    await wrapper.setProps({ modelValue: true });
    expect(input.element.checked).toBe(true);
  });

  it("should show checkmark icon when modelValue is true", async () => {
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("should hide checkmark icon when modelValue is false", async () => {
    await wrapper.setProps({ modelValue: false });
    expect(wrapper.find("svg").exists()).toBe(false);
  });

  it("should emit update:modelValue with true on click when unchecked", async () => {
    await wrapper.setProps({ modelValue: false, disabled: false });
    await wrapper.find("div.relative").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
  });

  it("should emit update:modelValue with false on click when checked", async () => {
    await wrapper.setProps({ modelValue: true, disabled: false });
    await wrapper.find("div.relative").trigger("click");
    const emitted = wrapper.emitted("update:modelValue")!;
    expect(emitted[emitted.length - 1]).toEqual([false]);
  });

  it("should not emit update:modelValue when disabled", async () => {
    await wrapper.setProps({ modelValue: false, disabled: true });
    const before = wrapper.emitted("update:modelValue")?.length ?? 0;
    await wrapper.find("div.relative").trigger("click");
    const after = wrapper.emitted("update:modelValue")?.length ?? 0;
    expect(after).toBe(before);
  });

  it("should be disabled", async () => {
    await wrapper.setProps({ disabled: true });
    expect(input.element.disabled).toBe(true);
  });

  it("should render label when prop is provided", async () => {
    await wrapper.setProps({ label: "Согласен с условиями" });
    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Согласен с условиями");
  });

  it("should not render label when prop is empty", async () => {
    await wrapper.setProps({ label: "" });
    expect(wrapper.find("label").exists()).toBe(false);
  });

  it("should apply opacity class on wrapper div when disabled", async () => {
    await wrapper.setProps({ disabled: true, label: "Test" });
    const box = wrapper.find("div.relative");
    expect(box.attributes("class")).toContain("opacity-50");
    expect(box.attributes("class")).toContain("cursor-not-allowed");
  });

  it("should apply checked styles on inner div when modelValue is true", async () => {
    await wrapper.setProps({ modelValue: true, disabled: false });
    const box = wrapper.find("div.w-4.h-4.border-2");
    expect(box.attributes("class")).toContain("bg-red-500");
    expect(box.attributes("class")).toContain("border-red-500");
  });

  it("should apply unchecked styles on inner div when modelValue is false", async () => {
    await wrapper.setProps({ modelValue: false });
    const box = wrapper.find("div.w-4.h-4.border-2");
    expect(box.attributes("class")).toContain("bg-transparent");
  });
});
