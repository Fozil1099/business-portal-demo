/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CongratulationModal from "./CongratulationModal.vue";

vi.mock("./index", () => ({
  Modal: {
    props: ["title"],
    template: "<div><h2>{{ title }}</h2><slot /></div>",
  },
}));

describe("CongratulationModal", () => {
  it("should keep the default title and text", () => {
    const wrapper = mount(CongratulationModal, {
      props: { points: 30, treesCount: 3 },
    });
    expect(wrapper.find("h2").text()).toBe("Поздравляем!");
    expect(wrapper.text()).toContain("30 баллов");
  });

  it("should render a custom title and slot text", () => {
    const wrapper = mount(CongratulationModal, {
      props: { title: "Заявка отправлена" },
      slots: { default: "Ждите проверки" },
    });
    expect(wrapper.find("h2").text()).toBe("Заявка отправлена");
    expect(wrapper.text()).toContain("Ждите проверки");
    expect(wrapper.text()).not.toContain("баллов");
  });
});
