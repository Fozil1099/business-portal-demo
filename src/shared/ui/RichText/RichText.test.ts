/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import RichText from "./RichText.vue";

describe("RichText", () => {
  it("should render html markup", () => {
    const wrapper = mount(RichText, {
      props: { html: "<h2>Sarlavha</h2><p>Matn <strong>qalin</strong></p>" },
    });
    expect(wrapper.find("h2").text()).toBe("Sarlavha");
    expect(wrapper.find("p strong").text()).toBe("qalin");
  });

  it("should render empty container for empty html", () => {
    const wrapper = mount(RichText, { props: { html: "" } });
    expect(wrapper.element.innerHTML).toBe("");
  });

  it("should update content when html changes", async () => {
    const wrapper = mount(RichText, { props: { html: "<p>A</p>" } });
    await wrapper.setProps({ html: "<p>B</p>" });
    expect(wrapper.text()).toBe("B");
  });
});
