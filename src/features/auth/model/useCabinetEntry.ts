import { useRouter } from "vue-router";
import { modal } from "@/shared/ui";
import { isUserLoggedIn } from "@/shared/utils/auth";

// "Личный кабинет" buttons: open the cabinet for a logged-in user,
// otherwise show the login modal rendered by the navbar
export const useCabinetEntry = () => {
  const router = useRouter();

  const goToCabinet = () => {
    if (isUserLoggedIn()) {
      router.push({ name: "cabinet-services" });
    } else {
      modal("login-modal").show();
    }
  };

  return { goToCabinet };
};
