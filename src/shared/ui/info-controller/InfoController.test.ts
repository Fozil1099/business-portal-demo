/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import InfoController from "./InfoController.vue";

vi.mock("@/shared/ui", () => ({
  Icon: { template: "<i />" },
  Btn: {
    emits: ["click"],
    template: '<button class="btn" @click="$emit(\'click\')"><slot /></button>',
  },
}));

const loginItem = { label: "Login", key: "login", value: "user : ••••" };

describe("InfoController", () => {
  it("should render label and value", () => {
    const wrapper = mount(InfoController, {
      props: { item: { label: "Name", key: "name", value: "John" } },
    });
    expect(wrapper.text()).toContain("Name");
    expect(wrapper.text()).toContain("John");
  });

  it("should render refresh button for login by default", () => {
    const wrapper = mount(InfoController, { props: { item: loginItem } });
    expect(wrapper.find(".btn").exists()).toBe(true);
  });

  it("should emit refresh on refresh button click", async () => {
    const wrapper = mount(InfoController, { props: { item: loginItem } });
    await wrapper.find(".btn").trigger("click");
    expect(wrapper.emitted("refresh")).toBeTruthy();
  });

  it("should hide refresh button when refreshHidden is set", () => {
    const wrapper = mount(InfoController, {
      props: { item: loginItem, refreshHidden: true },
    });
    expect(wrapper.find(".btn").exists()).toBe(false);
    expect(wrapper.text()).toContain("user : ••••");
  });

  it("should render phone edit button only with phoneEdit", () => {
    const item = { label: "Phone", key: "phone", value: ["+998 90 123 45 67"] };
    expect(
      mount(InfoController, { props: { item } }).find(".btn").exists(),
    ).toBe(false);
    expect(
      mount(InfoController, { props: { item, phoneEdit: true } })
        .find(".btn")
        .exists(),
    ).toBe(true);
  });
});
