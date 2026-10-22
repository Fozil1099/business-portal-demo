/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import RadioLabel from "./RadioLabel.vue";

describe("RadioLabel", () => {
  it("should render a label element", () => {
    const wrapper = mount(RadioLabel);
    expect(wrapper.find("label").exists()).toBe(true);
  });

  it("should render slot content", () => {
    const wrapper = mount(RadioLabel, {
      slots: { default: "Accept terms" },
    });
    expect(wrapper.find("label").text()).toBe("Accept terms");
  });

  it("should render HTML slot content", () => {
    const wrapper = mount(RadioLabel, {
      slots: { default: '<span class="label-text">Option A</span>' },
    });
    expect(wrapper.find("span.label-text").exists()).toBe(true);
  });
});
