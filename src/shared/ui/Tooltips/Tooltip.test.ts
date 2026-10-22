/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";

describe("Tooltip", () => {
  const defaultProps = { visible: true, x: 100, y: 200 };

  it("should render when visible is true", () => {
    const wrapper = mount(Tooltip, {
      props: defaultProps,
      attachTo: document.body,
    });
    expect(document.body.querySelector("[style]")).not.toBeNull();
    wrapper.unmount();
  });

  it("should not render when visible is false", () => {
    const wrapper = mount(Tooltip, {
      props: { ...defaultProps, visible: false },
      attachTo: document.body,
    });
    // Teleport renders to body, so check body — nothing with [style] should be there
    expect(document.body.querySelector("[style]")).toBeNull();
    wrapper.unmount();
  });

  it("should render slot content", () => {
    const wrapper = mount(Tooltip, {
      props: defaultProps,
      slots: { default: '<span class="tooltip-text">Hello</span>' },
      attachTo: document.body,
    });
    expect(document.body.querySelector(".tooltip-text")).not.toBeNull();
    wrapper.unmount();
  });

  it("should apply default styles when no class prop is given", () => {
    const wrapper = mount(Tooltip, {
      props: defaultProps,
      attachTo: document.body,
    });
    const el = document.body.querySelector("[style]") as HTMLElement;
    expect(el?.className).toContain("bg-[#232021]");
    wrapper.unmount();
  });

  it("should apply custom class when class prop is given", () => {
    const wrapper = mount(Tooltip, {
      props: { ...defaultProps, class: "my-custom-tooltip" },
      attachTo: document.body,
    });
    const el = document.body.querySelector(".my-custom-tooltip");
    expect(el).not.toBeNull();
    wrapper.unmount();
  });

  it("should apply default minWidth and maxWidth", () => {
    const wrapper = mount(Tooltip, {
      props: defaultProps,
      attachTo: document.body,
    });
    const el = document.body.querySelector("[style]") as HTMLElement;
    expect(el?.style.minWidth).toBe("380px");
    expect(el?.style.maxWidth).toBe("450px");
    wrapper.unmount();
  });

  it("should apply custom minWidth and maxWidth", () => {
    const wrapper = mount(Tooltip, {
      props: { ...defaultProps, minWidth: "200px", maxWidth: "300px" },
      attachTo: document.body,
    });
    const el = document.body.querySelector("[style]") as HTMLElement;
    expect(el?.style.minWidth).toBe("200px");
    expect(el?.style.maxWidth).toBe("300px");
    wrapper.unmount();
  });
});
