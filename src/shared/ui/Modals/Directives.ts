export const vModal = {
  mounted: (el: HTMLElement, binding: any) => {
    el.addEventListener("click", () => {
      const modal = document.getElementById(binding.value) as any;
      
      if (modal?.classList.value.includes("hide")) {
        modal?.classList.remove("hide");
        modal?.show();
      } else {
        modal?.classList.add("hide");
        modal?.hide();
      }
    });
  },
  destroyed: (el: HTMLElement) => {
    el.removeEventListener("click", () => {});
  },
};

export const modal = (id: string): { show: Function; hide: Function } => {
  const modal = document.getElementById(id) as any;

  function show() {
    if (modal?.classList.value.includes("hide")) {
      modal?.classList.remove("hide");
      modal?.show();
    }
  }

  function hide() {
    if (!modal?.classList.value.includes("hide")) {
      modal?.classList.add("hide");
      modal?.hide();
    }
  }

  return {
    show,
    hide,
  };
};
