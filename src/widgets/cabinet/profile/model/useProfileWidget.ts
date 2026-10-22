import { formatPhoneNumber } from "@/shared/utils/formatter";
import { computed, onMounted } from "vue";
import { useProfile } from "@/features/cabinet/profile";
import { modal } from "@/shared/ui";
import { useI18n } from "vue-i18n";

export const useProfileWidget = () => {
  const { profile, isLoading, fetchProfile, handleUpdatePhones } =
    useProfile();
  const { t } = useI18n();

  const formatDate = (value: string | null | undefined) => {
    if (!value) return "—";
    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return value;
    return `${day}.${month}.${year}`;
  };

  const getFullName = () => {
    if (!profile.value) return "—";
    if (profile.value.full_name) return profile.value.full_name;
    const parts = [
      profile.value.last_name,
      profile.value.first_name,
      profile.value.middle_name,
    ].filter(Boolean);
    return parts.length ? parts.join(" ") : "—";
  };

  const getPhoneNumbers = () => {
    const value = profile.value?.phone_numbers || [];
    const phones = value.map((phone) => formatPhoneNumber(phone));

    return phones.length ? phones : ["—"];
  };

  // ПИНФЛ и паспорт не приходят из GET /users/me/, поэтому пока всегда «—»
  const personalData = computed(() => [
    {
      label: t("employees.fullNameLabel"),
      key: "name",
      value: getFullName(),
      span: 1,
    },
    {
      label: t("profile.birthdayLabel"),
      key: "birthday",
      value: formatDate(profile.value?.birth_date),
      span: 1,
    },
    {
      label: t("profile.pinLabel"),
      key: "pinfl",
      value: "—",
      span: 1,
    },
    {
      label: t("employees.passportLabel"),
      key: "passport",
      value: "—",
      span: 1,
    },
    {
      label: t("company.phoneLabel"),
      key: "phone",
      value: getPhoneNumbers(),
      span: 2,
    },
    {
      label: t("profile.loginPasswordLabel"),
      key: "login",
      value: profile.value?.username
        ? `${profile.value.username} : ••••••`
        : "—",
      span: 2,
    },
  ]);

  const onChangePassword = () => {
    modal("change-password-modal").show();
  };

  const onEditPhone = () => {
    modal("editPhoneModal").show();
  };

  const onSavePhones = async (phones: string[]) => {
    try {
      await handleUpdatePhones(phones);
      modal("editPhoneModal").hide();
    } catch (err) {
      console.error("Ошибка при сохранении телефонов:", err);
    }
  };

  onMounted(() => {
    fetchProfile();
  });

  return {
    personalData,
    isLoading,
    onChangePassword,
    onEditPhone,
    onSavePhones,
    profile,
  };
};
