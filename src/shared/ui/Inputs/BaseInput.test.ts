/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseInput from "./BaseInput.vue";

describe("BaseInput", () => {
  const global = { stubs: { Icon: true } };

  it("should render input element", () => {
    const wrapper = mount(BaseInput, { global });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it('should render with default type "text"', () => {
    const wrapper = mount(BaseInput, { global });
    expect(wrapper.find("input").attributes("type")).toBe("text");
  });

  it("should apply custom type", () => {
    const wrapper = mount(BaseInput, {
      props: { type: "email" },
      global,
    });
    expect(wrapper.find("input").attributes("type")).toBe("email");
  });

  it("should set placeholder", () => {
    const wrapper = mount(BaseInput, {
      props: { placeholder: "Enter text..." },
      global,
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Enter text...",
    );
  });

  it("should be disabled when prop is set", () => {
    const wrapper = mount(BaseInput, {
      props: { disabled: true },
      global,
    });
    expect(wrapper.find("input").element.disabled).toBe(true);
  });

  it("should not be disabled by default", () => {
    const wrapper = mount(BaseInput, { global });
    expect(wrapper.find("input").element.disabled).toBe(false);
  });

  it("should not dim the input when enabled", () => {
    const wrapper = mount(BaseInput, { global });
    expect(wrapper.find("div").classes()).not.toContain("opacity-50");
  });

  it("should dim the input when disabled", () => {
    const wrapper = mount(BaseInput, { props: { disabled: true }, global });
    const classes = wrapper.find("div").classes();
    expect(classes).toContain("bg-secondary-200");
    expect(classes).toContain("opacity-50");
  });

  it('should apply "md" size class by default', () => {
    const wrapper = mount(BaseInput, { global });
    expect(wrapper.find("div").attributes("class")).toContain("py-1.5");
    expect(wrapper.find("div").attributes("class")).toContain("px-3");
  });

  it.each([
    ["xs", "p-1.5"],
    ["sm", "py-1.5"],
    ["lg", "py-3"],
  ] as ["xs" | "sm" | "md" | "lg", string][])(
    'should apply size class for "%s"',
    (size, expectedClass) => {
      const wrapper = mount(BaseInput, { props: { size }, global });
      expect(wrapper.find("div").attributes("class")).toContain(expectedClass);
    },
  );

  it("should bind modelValue to input", async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: "hello",
        "onUpdate:modelValue": (v: string) =>
          wrapper.setProps({ modelValue: v }),
      },
      global,
    });
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe(
      "hello",
    );
  });

  it("should emit update:modelValue on input", async () => {
    const wrapper = mount(BaseInput, { global });
    await wrapper.find("input").setValue("new value");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["new value"]);
  });

  it("should not render password toggle by default", () => {
    const wrapper = mount(BaseInput, {
      props: { type: "password" },
      global,
    });
    expect(wrapper.find("button").exists()).toBe(false);
    expect(wrapper.find("input").attributes("type")).toBe("password");
  });

  it("should not render password toggle for non-password type", () => {
    const wrapper = mount(BaseInput, {
      props: { type: "text", passwordToggle: true },
      global,
    });
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("should toggle password visibility on click", async () => {
    const wrapper = mount(BaseInput, {
      props: { type: "password", passwordToggle: true },
      global,
    });
    const toggle = wrapper.find("button");
    expect(toggle.attributes("type")).toBe("button");
    expect(wrapper.find("input").attributes("type")).toBe("password");

    await toggle.trigger("click");
    expect(wrapper.find("input").attributes("type")).toBe("text");

    await toggle.trigger("click");
    expect(wrapper.find("input").attributes("type")).toBe("password");
  });

  it("should disable password toggle when input is disabled", () => {
    const wrapper = mount(BaseInput, {
      props: { type: "password", passwordToggle: true, disabled: true },
      global,
    });
    expect(wrapper.find("button").element.disabled).toBe(true);
  });
});
