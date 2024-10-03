import SettingsTitle from "@/components/settings/settings-title.tsx";
import WorkspaceNameForm from "@/features/workspace/components/settings/components/workspace-name-form";

export default function WorkspaceSettings() {
  return (
    <>
      <SettingsTitle title="일반" />
      <WorkspaceNameForm />
    </>
  );
}
