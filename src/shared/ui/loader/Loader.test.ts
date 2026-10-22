/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Loader from "./Loader.vue";

describe("Loader", () => {
  const global = {
    stubs: { LoaderAnimation: true },
    mocks: { $t: (key: string) => key },
  };

  it("should show LoaderAnimation when isLoading is true", () => {
    const wrapper = mount(Loader, {
      props: { isLoading: true, data: [] },
      global,
    });
    expect(wrapper.findComponent({ name: "LoaderAnimation" }).exists()).toBe(
      true,
    );
  });

  it("should not show slot when isLoading is true", () => {
    const wrapper = mount(Loader, {
      props: { isLoading: true, data: [] },
      slots: { default: '<div class="content">Data</div>' },
      global,
    });
    expect(wrapper.find(".content").exists()).toBe(false);
  });

  it("should show noData message when data is empty and not loading", () => {
    const wrapper = mount(Loader, {
      props: { isLoading: false, data: [] },
      global,
    });
    expect(wrapper.find("p").exists()).toBe(true);
    expect(wrapper.find("p").text()).toBe("common.noData");
  });

  it("should show slot content when data is provided and not loading", () => {
    const wrapper = mount(Loader, {
      props: { isLoading: false, data: [{ id: 1 }] },
      slots: { default: '<div class="content">Data loaded</div>' },
      global,
    });
    expect(wrapper.find(".content").exists()).toBe(true);
    expect(wrapper.find(".content").text()).toBe("Data loaded");
  });

  it("should not show LoaderAnimation when not loading", () => {
    const wrapper = mount(Loader, {
      props: { isLoading: false, data: [{ id: 1 }] },
      global,
    });
    expect(wrapper.findComponent({ name: "LoaderAnimation" }).exists()).toBe(
      false,
    );
  });
});
