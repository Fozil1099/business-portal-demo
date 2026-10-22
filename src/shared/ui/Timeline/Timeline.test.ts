/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Timeline from "./Timeline.vue";

const items = [
  { icon: "check", subtitle: "2024-01-01", title: "First event" },
  { icon: "arrow", subtitle: "2024-01-02", title: "Second event" },
  { icon: "link", subtitle: "2024-01-03", title: null },
];

describe("Timeline", () => {
  const global = { stubs: { Icon: true } };

  it("should render all items", () => {
    const wrapper = mount(Timeline, { props: { items }, global });
    expect(wrapper.findAll(".timeline__item").length).toBe(3);
  });

  it("should render item titles", () => {
    const wrapper = mount(Timeline, { props: { items }, global });
    expect(wrapper.html()).toContain("First event");
    expect(wrapper.html()).toContain("Second event");
  });

  it('should render "N/A" when title is null', () => {
    const wrapper = mount(Timeline, { props: { items }, global });
    expect(wrapper.html()).toContain("N/A");
  });

  it("should render subtitles", () => {
    const wrapper = mount(Timeline, { props: { items }, global });
    expect(wrapper.html()).toContain("2024-01-01");
    expect(wrapper.html()).toContain("2024-01-02");
  });

  it("should render empty list", () => {
    const wrapper = mount(Timeline, { props: { items: [] }, global });
    expect(wrapper.findAll(".timeline__item").length).toBe(0);
  });

  it("should render timeline container", () => {
    const wrapper = mount(Timeline, { props: { items }, global });
    expect(wrapper.find(".timeline").exists()).toBe(true);
  });
});
