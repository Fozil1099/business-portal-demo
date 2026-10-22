/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import RadioButton from "./RadioButton.vue";

describe("RadioButton", () => {
  const defaultProps = { id: "radio-1", name: "group", value: "option1" };

  it("should render input[type=radio]", () => {
    const wrapper = mount(RadioButton, { props: defaultProps });
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("type")).toBe("radio");
  });

  it("should set correct id", () => {
    const wrapper = mount(RadioButton, { props: defaultProps });
    expect(wrapper.find("input").attributes("id")).toBe("radio-1");
  });

  it("should set correct name", () => {
    const wrapper = mount(RadioButton, { props: defaultProps });
    expect(wrapper.find("input").attributes("name")).toBe("group");
  });

  it("should set correct value", () => {
    const wrapper = mount(RadioButton, { props: defaultProps });
    expect(wrapper.find("input").attributes("value")).toBe("option1");
  });

  it("should not be disabled by default", () => {
    const wrapper = mount(RadioButton, { props: defaultProps });
    expect(wrapper.find("input").element.disabled).toBe(false);
  });

  it("should be disabled when prop is set", async () => {
    const wrapper = mount(RadioButton, {
      props: { ...defaultProps, disabled: true },
    });
    expect(wrapper.find("input").element.disabled).toBe(true);
  });
});
