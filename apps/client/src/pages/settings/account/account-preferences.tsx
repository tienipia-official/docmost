import SettingsTitle from "@/components/settings/settings-title.tsx";
import AccountTheme from "@/features/user/components/account-theme.tsx";
import PageWidthPref from "@/features/user/components/page-width-pref.tsx";
import { Divider } from "@mantine/core";

export default function AccountPreferences() {
  return (
    <>
      <SettingsTitle title="환경설정" />
      <AccountTheme />
      <Divider my={"md"} />
      <PageWidthPref />
    </>
  );
}
