/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Collapse from "./Collapse.vue";

describe("Collapse", () => {
  it("should render button", () => {
    const wrapper = mount(Collapse);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("should be closed by default", () => {
    const wrapper = mount(Collapse, {
      slots: { content: "<p>Content</p>" },
    });
    expect(wrapper.find("div.pb-4").exists()).toBe(false);
  });

  it("should show content after click", async () => {
    const wrapper = mount(Collapse, {
      slots: { title: "Question", content: "<p>Answer text</p>" },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.html()).toContain("Answer text");
  });

  it("should hide content after second click", async () => {
    const wrapper = mount(Collapse, {
      slots: { content: "<p>Answer text</p>" },
    });
    await wrapper.find("button").trigger("click");
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("div.pb-4").exists()).toBe(false);
  });

  it("should render title slot", () => {
    const wrapper = mount(Collapse, {
      slots: { title: "FAQ Question" },
    });
    expect(wrapper.html()).toContain("FAQ Question");
  });

  it("should show single-line icon when closed", () => {
    const wrapper = mount(Collapse);
    // When closed: v-if="!isOpen" shows horizontal path only
    const paths = wrapper.findAll("path");
    expect(paths.length).toBe(1);
  });

  it("should show cross icon when open", async () => {
    const wrapper = mount(Collapse);
    await wrapper.find("button").trigger("click");
    // When open: v-else shows two paths (vertical + horizontal)
    const paths = wrapper.findAll("path");
    expect(paths.length).toBe(2);
  });
});
