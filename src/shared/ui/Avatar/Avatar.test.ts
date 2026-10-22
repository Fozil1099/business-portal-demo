/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Avatar from "./Avatar.vue";

describe("Avatar", () => {
  it("should render initials from the first two words", () => {
    const wrapper = mount(Avatar, {
      props: { name: "каримов азиз рустамович" },
    });
    expect(wrapper.text()).toBe("КА");
  });

  it("should render a single initial for one word", () => {
    const wrapper = mount(Avatar, { props: { name: "admin" } });
    expect(wrapper.text()).toBe("A");
  });

  it("should render image when src is passed", () => {
    const wrapper = mount(Avatar, {
      props: { name: "Aziz", src: "/avatar.png" },
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("/avatar.png");
    expect(img.attributes("alt")).toBe("Aziz");
  });

  it("should not render initials without a name", () => {
    const wrapper = mount(Avatar, { props: { name: "  " } });
    expect(wrapper.text()).toBe("");
  });

  it("should apply size classes", () => {
    const sm = mount(Avatar, { props: { size: "sm" } });
    const lg = mount(Avatar, { props: { size: "lg" } });
    expect(sm.classes()).toContain("size-8");
    expect(lg.classes()).toContain("size-14");
  });

  it("should use md size by default", () => {
    const wrapper = mount(Avatar);
    expect(wrapper.classes()).toContain("size-11");
  });
});
