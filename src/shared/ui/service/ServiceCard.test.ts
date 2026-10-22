/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ServiceCard from "./ServiceCard.vue";

vi.mock("@/shared/ui", () => ({
  Btn: { template: "<button><slot /></button>" },
  Icon: { template: "<i />" },
}));

describe("ServiceCard", () => {
  const props = { title: "Посадка деревьев", value: "20", label: "Текущий балл" };

  it("should render title, label and value", () => {
    const wrapper = mount(ServiceCard, { props });
    expect(wrapper.text()).toContain("Посадка деревьев");
    expect(wrapper.text()).toContain("Текущий балл");
    expect(wrapper.text()).toContain("20");
  });

  it("should emit open on button click", async () => {
    const wrapper = mount(ServiceCard, { props });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("open")).toHaveLength(1);
  });
});
