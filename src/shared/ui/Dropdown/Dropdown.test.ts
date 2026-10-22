/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { h } from "vue";
import { mount } from "@vue/test-utils";
import Dropdown from "./Dropdown.vue";

describe("Dropdown", () => {
  it("should render", () => {
    const wrapper = mount(Dropdown);
    expect(wrapper.find(".relative").exists()).toBe(true);
  });

  it("should hide body by default", () => {
    const wrapper = mount(Dropdown, {
      slots: {
        body: '<div class="menu-body">Menu</div>',
      },
    });
    const dropdown = wrapper.find(".dropdown");
    expect(dropdown.attributes("class")).toContain("hidden");
  });

  it("should show body after handleDropdown is called", async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        button: ({ actions }: { actions: { handleDropdown: () => void } }) =>
          h(
            "button",
            { class: "trigger-btn", onClick: actions.handleDropdown },
            "Open",
          ),
        body: '<div class="menu-body">Menu</div>',
      },
    });
    await wrapper.find(".trigger-btn").trigger("click");
    const dropdown = wrapper.find(".dropdown");
    expect(dropdown.attributes("class")).toContain("block");
  });

  it("should hide body after second handleDropdown call", async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        button: ({ actions }: { actions: { handleDropdown: () => void } }) =>
          h(
            "button",
            { class: "trigger-btn", onClick: actions.handleDropdown },
            "Toggle",
          ),
        body: "<div>Menu</div>",
      },
    });
    await wrapper.find(".trigger-btn").trigger("click");
    await wrapper.find(".trigger-btn").trigger("click");
    const dropdown = wrapper.find(".dropdown");
    expect(dropdown.attributes("class")).toContain("hidden");
  });

  it("should render body slot content", () => {
    const wrapper = mount(Dropdown, {
      slots: {
        body: '<span class="item">Item 1</span>',
      },
    });
    expect(wrapper.find(".item").exists()).toBe(true);
  });
});
