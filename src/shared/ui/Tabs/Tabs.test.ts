/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Tabs from "./Tabs.vue";

const tabs = [
  { id: "tab1", name: "First" },
  { id: "tab2", name: "Second" },
  { id: "tab3", name: "Third" },
];

describe("Tabs", () => {
  it("should render all tabs", () => {
    const wrapper = mount(Tabs, { props: { tabs } });
    const tabItems = wrapper.findAll(".cursor-pointer");
    expect(tabItems.length).toBe(3);
  });

  it("should render tab names", () => {
    const wrapper = mount(Tabs, { props: { tabs } });
    const html = wrapper.html();
    expect(html).toContain("First");
    expect(html).toContain("Second");
    expect(html).toContain("Third");
  });

  it("should set first tab as active by default", async () => {
    const wrapper = mount(Tabs, {
      props: { tabs, modelValue: undefined },
    });
    await wrapper.vm.$nextTick();
    // First tab span should have !text-white class
    const firstTabSpan = wrapper.findAll("span")[0]!;
    expect(firstTabSpan.attributes("class")).toContain("!text-white");
  });

  it("should apply active class to the selected tab", () => {
    const wrapper = mount(Tabs, {
      props: { tabs, modelValue: "tab2" },
    });
    const spans = wrapper.findAll("span");
    expect(spans[1]!.attributes("class")).toContain("!text-white");
  });

  it("should show underline indicator on active tab", () => {
    const wrapper = mount(Tabs, {
      props: { tabs, modelValue: "tab1" },
    });
    const activeUnderline = wrapper.find(".bg-danger");
    expect(activeUnderline.exists()).toBe(true);
  });

  it("should emit update:modelValue when tab is clicked", async () => {
    const wrapper = mount(Tabs, {
      props: { tabs, modelValue: "tab1" },
    });
    const tabItems = wrapper.findAll(".cursor-pointer");
    await tabItems[1]!.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["tab2"]);
  });

  it("should change active tab on click", async () => {
    const wrapper = mount(Tabs, {
      props: { tabs, modelValue: "tab1" },
    });
    const tabItems = wrapper.findAll(".cursor-pointer");
    await tabItems[2]!.trigger("click");
    await wrapper.setProps({ modelValue: "tab3" });
    const spans = wrapper.findAll("span");
    expect(spans[2]!.attributes("class")).toContain("!text-white");
  });
});
