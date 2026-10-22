/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TagInput from "./TagInput.vue";

describe("TagInput", () => {
  const global = { stubs: { Icon: true } };

  it("should render input", () => {
    const wrapper = mount(TagInput, { global });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should add tag on Enter key", async () => {
    const wrapper = mount(TagInput, {
      props: {
        modelValue: [],
        "onUpdate:modelValue": (v: string[]) =>
          wrapper.setProps({ modelValue: v }),
      },
      global,
    });
    const input = wrapper.find("input");
    await input.setValue("new-tag");
    await input.trigger("keyup.enter");
    expect(wrapper.props("modelValue")).toContain("new-tag");
  });

  it("should clear input after adding tag", async () => {
    const wrapper = mount(TagInput, {
      props: {
        modelValue: [],
        "onUpdate:modelValue": (v: string[]) =>
          wrapper.setProps({ modelValue: v }),
      },
      global,
    });
    const input = wrapper.find("input");
    await input.setValue("tag1");
    await input.trigger("keyup.enter");
    expect((input.element as HTMLInputElement).value).toBe("");
  });

  it("should not add empty tag", async () => {
    const wrapper = mount(TagInput, {
      props: {
        modelValue: [],
        "onUpdate:modelValue": (v: string[]) =>
          wrapper.setProps({ modelValue: v }),
      },
      global,
    });
    const input = wrapper.find("input");
    await input.setValue("   ");
    await input.trigger("keyup.enter");
    expect(wrapper.props("modelValue")).toHaveLength(0);
  });

  it("should render existing tags", () => {
    const wrapper = mount(TagInput, {
      props: { modelValue: ["tag1", "tag2"] },
      global,
    });
    expect(wrapper.html()).toContain("tag1");
    expect(wrapper.html()).toContain("tag2");
  });

  it("should remove tag when clear icon is clicked", async () => {
    const wrapper = mount(TagInput, {
      props: {
        modelValue: ["tag1", "tag2"],
        "onUpdate:modelValue": (v: string[]) =>
          wrapper.setProps({ modelValue: v }),
      },
      global,
    });
    // Click the first remove button (svg wrapper div)
    const clearButtons = wrapper.findAll(".cursor-pointer");
    await clearButtons[0]!.trigger("click");
    expect(wrapper.props("modelValue")).not.toContain("tag1");
    expect(wrapper.props("modelValue")).toContain("tag2");
  });

  it("should set placeholder on input", () => {
    const wrapper = mount(TagInput, {
      props: { placeholder: "Add tag..." },
      global,
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe("Add tag...");
  });

  it("should disable input when disabled prop is set", () => {
    const wrapper = mount(TagInput, {
      props: { disabled: true },
      global,
    });
    expect(wrapper.find("input").element.disabled).toBe(true);
  });
});
