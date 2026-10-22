/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DraggableGrid from "./DraggableGrid.vue";

describe("DraggableGrid", () => {
  it("should render", () => {
    const wrapper = mount(DraggableGrid);
    expect(wrapper.find("#matrix-grid").exists()).toBe(true);
  });

  it("should render slot content", () => {
    const wrapper = mount(DraggableGrid, {
      slots: { default: '<div class="test-child">content</div>' },
    });
    expect(wrapper.find(".test-child").exists()).toBe(true);
    expect(wrapper.find(".test-child").text()).toBe("content");
  });

  it("should have overflow-auto class", () => {
    const wrapper = mount(DraggableGrid);
    expect(wrapper.find("#matrix-grid").classes()).toContain("overflow-auto");
  });

  it("should have grab cursor style", () => {
    const wrapper = mount(DraggableGrid);
    expect(wrapper.find("#matrix-grid").attributes("style")).toContain("grab");
  });

  it("should have user-select: none style", () => {
    const wrapper = mount(DraggableGrid);
    expect(wrapper.find("#matrix-grid").attributes("style")).toContain("none");
  });
});
