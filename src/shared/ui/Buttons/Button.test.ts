/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

type Color =
  | "primary"
  | "danger"
  | "yellow"
  | "gray"
  | "gray-light"
  | "underline"
  | "outline"
  | "blue"
  | "icon";

describe("Button", () => {
  const wrapper = mount(Button);
  const btn = wrapper.find("button");

  it("should render button", () => {
    expect(wrapper.find("button").exists()).toBeTruthy();
  });

  it.each([
    ["primary", "bg__primary__gradient"],
    ["danger", "bg__danger__gradient"],
    ["yellow", "bg__yellow__gradient"],
    ["gray", "bg__gray__gradient"],
    ["blue", "bg__blue__gradient"],
  ] as [Color, string][])(
    'should apply gradient class for color "%s"',
    async (color, expectedClass) => {
      await wrapper.setProps({ color });
      expect(btn.attributes("class")).toContain(expectedClass);
      expect(btn.attributes("class")).toContain("hover:opacity-90");
      expect(btn.attributes("class")).toContain("active:opacity-70");
    },
  );

  it('should apply correct class for color "gray-light"', async () => {
    await wrapper.setProps({ color: "gray-light" as Color });
    expect(btn.attributes("class")).toContain("bg-[#E6E6E6]");
    expect(btn.attributes("class")).toContain("text-[#999999]");
  });

  it('should apply correct class for color "outline"', async () => {
    await wrapper.setProps({ color: "outline" as Color });
    expect(btn.attributes("class")).toContain("border");
    expect(btn.attributes("class")).toContain("border-secondary-400");
  });

  it('should apply correct class for color "underline"', async () => {
    await wrapper.setProps({ color: "underline" as Color });
    expect(btn.attributes("class")).toContain("underline");
    expect(btn.attributes("class")).toContain("text__primary__gradient");
  });

  it('should apply correct class for color "icon"', async () => {
    await wrapper.setProps({ color: "icon" as Color });
    expect(btn.attributes("class")).toContain("bg-transparent");
  });

  it("should be disabled", async () => {
    await wrapper.setProps({ disabled: true });
    expect(btn.element.disabled).toBe(true);
  });
});
