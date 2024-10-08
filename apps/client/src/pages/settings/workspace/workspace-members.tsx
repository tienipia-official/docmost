import WorkspaceInviteModal from "@/features/workspace/components/members/components/workspace-invite-modal";
import { Group, SegmentedControl, Space, Text } from "@mantine/core";
import WorkspaceMembersTable from "@/features/workspace/components/members/components/workspace-members-table";
import SettingsTitle from "@/components/settings/settings-title.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WorkspaceInvitesTable from "@/features/workspace/components/members/components/workspace-invites-table.tsx";
import useUserRole from "@/hooks/use-user-role.tsx";

export default function WorkspaceMembers() {
  const [segmentValue, setSegmentValue] = useState("members");
  const [searchParams] = useSearchParams();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab === "invites") {
      setSegmentValue(currentTab);
    }
  }, [searchParams.get("tab")]);

  const handleSegmentChange = (value: string) => {
    setSegmentValue(value);
    if (value === "invites") {
      navigate(`?tab=${value}`);
    } else {
      navigate("");
    }
  };

  return (
    <>
      <SettingsTitle title="멤버" />

      {/* <WorkspaceInviteSection /> */}
      {/* <Divider my="lg" /> */}

      <Group justify="space-between">
        <SegmentedControl
          value={segmentValue}
          onChange={handleSegmentChange}
          data={[
            { label: "멤버", value: "members" },
            { label: "대기", value: "invites" },
          ]}
          withItemsBorders={false}
        />

        {isAdmin && <WorkspaceInviteModal />}
      </Group>

      <Space h="lg" />

      {segmentValue === "invites" ? (
        <WorkspaceInvitesTable />
      ) : (
        <WorkspaceMembersTable />
      )}
    </>
  );
}
