/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import StatCard from "./StatCard.vue";

describe("StatCard", () => {
  it("should render label and value", () => {
    const wrapper = mount(StatCard, {
      props: { label: "Korxonalar", value: "1,248" },
    });
    expect(wrapper.text()).toContain("Korxonalar");
    expect(wrapper.text()).toContain("1,248");
  });

  it("should not render caption by default", () => {
    const wrapper = mount(StatCard, { props: { label: "A", value: "1" } });
    expect(wrapper.findAll("p")).toHaveLength(2);
  });

  it("should render caption when provided", () => {
    const wrapper = mount(StatCard, {
      props: { label: "A", value: "1", caption: "Active companies" },
    });
    expect(wrapper.text()).toContain("Active companies");
  });

  it("should use light background by default", () => {
    const wrapper = mount(StatCard, { props: { label: "A", value: "1" } });
    expect(wrapper.classes()).toContain("bg-secondary-200");
    expect(wrapper.classes()).not.toContain("bg__primary__gradient");
  });

  it("should use medium size by default", () => {
    const wrapper = mount(StatCard, { props: { label: "A", value: "1" } });
    expect(wrapper.classes()).toContain("rounded-[20px]");
    expect(wrapper.findAll("p")[1]!.classes()).toContain("text-4xl");
  });

  it("should render compact card for small size", () => {
    const wrapper = mount(StatCard, {
      props: { label: "A", value: "1", size: "sm" },
    });
    expect(wrapper.classes()).toContain("rounded-xl");
    expect(wrapper.classes()).toContain("sm:rounded-2xl");
    expect(wrapper.classes()).toContain("justify-between");
    expect(wrapper.classes()).not.toContain("rounded-[20px]");
    expect(wrapper.findAll("p")[1]!.classes()).toContain("text-lg");
  });

  it("should render compact two-line caption for small size", () => {
    const wrapper = mount(StatCard, {
      props: { label: "A", value: "1", caption: "C", size: "sm" },
    });
    const caption = wrapper.findAll("p")[2]!.classes();
    expect(caption).toContain("text-[9px]");
    expect(caption).toContain("line-clamp-2");
    expect(caption).toContain("sm:line-clamp-1");
  });

  it("should use primary gradient for primary variant", () => {
    const wrapper = mount(StatCard, {
      props: { label: "A", value: "1", variant: "primary" },
    });
    expect(wrapper.classes()).toContain("bg__primary__gradient");
    expect(wrapper.classes()).toContain("text-white");
  });
});
