/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DefaultInput from "./DefaultInput.vue";

describe("DefaultInput", () => {
  const global = { stubs: { Icon: true } };

  it("should render input element", () => {
    const wrapper = mount(DefaultInput, { global });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it('should have type "text" by default', async () => {
    const wrapper = mount(DefaultInput, { global });
    await wrapper.vm.$nextTick();
    expect((wrapper.find("input").element as HTMLInputElement).type).toBe(
      "text",
    );
  });

  it("should set placeholder", () => {
    const wrapper = mount(DefaultInput, {
      props: { placeholder: "Enter name" },
      global,
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe("Enter name");
  });

  it("should be disabled when prop is set", () => {
    const wrapper = mount(DefaultInput, {
      props: { disabled: true },
      global,
    });
    expect(wrapper.find("input").element.disabled).toBe(true);
  });

  it("should not be disabled by default", () => {
    const wrapper = mount(DefaultInput, { global });
    expect(wrapper.find("input").element.disabled).toBe(false);
  });

  it('should show eye icon when type is "password"', async () => {
    const wrapper = mount(DefaultInput, {
      props: { type: "password" },
      global,
    });
    await wrapper.vm.$nextTick();
    // password toggle div is shown
    const toggleDiv = wrapper.find(".absolute.right-3");
    expect(toggleDiv.exists()).toBe(true);
  });

  it('should not show eye icon when type is "text"', async () => {
    const wrapper = mount(DefaultInput, {
      props: { type: "text" },
      global,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".absolute.right-3").exists()).toBe(false);
  });

  it("should toggle password visibility on click", async () => {
    const wrapper = mount(DefaultInput, {
      props: { type: "password" },
      global,
    });
    await wrapper.vm.$nextTick();
    // Initially type is password - the "show eye" div is visible
    const showEye = wrapper.find(".absolute.right-3 > div:first-child");
    await showEye.trigger("click");
    await wrapper.vm.$nextTick();
    // After click, type becomes "text"
    expect((wrapper.find("input").element as HTMLInputElement).type).toBe(
      "text",
    );
  });

  it("should emit update:modelValue on input", async () => {
    const wrapper = mount(DefaultInput, { global });
    await wrapper.find("input").setValue("typed text");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["typed text"]);
  });

  it("should bind modelValue to input", () => {
    const wrapper = mount(DefaultInput, {
      props: { modelValue: "initial" },
      global,
    });
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe(
      "initial",
    );
  });
});
