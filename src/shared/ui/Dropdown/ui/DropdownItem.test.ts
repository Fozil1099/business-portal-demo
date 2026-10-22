/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DropdownItem from "./DropdownItem.vue";

describe("DropdownItem", () => {
  it("should render title", () => {
    const wrapper = mount(DropdownItem, { props: { title: "Profile" } });
    expect(wrapper.text()).toContain("Profile");
  });

  it("should render as a non-submit button", () => {
    const wrapper = mount(DropdownItem, { props: { title: "Profile" } });
    expect(wrapper.find("button").attributes("type")).toBe("button");
  });

  it("should emit click", async () => {
    const wrapper = mount(DropdownItem, { props: { title: "Profile" } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("should apply danger styles", () => {
    const wrapper = mount(DropdownItem, {
      props: { title: "Logout", variant: "danger" },
    });
    expect(wrapper.find("button").classes()).toContain(
      "hover:text-danger-100",
    );
  });

  it("should render default slot", () => {
    const wrapper = mount(DropdownItem, {
      props: { title: "Profile" },
      slots: { default: '<span class="badge">3</span>' },
    });
    expect(wrapper.find(".badge").exists()).toBe(true);
  });
});
