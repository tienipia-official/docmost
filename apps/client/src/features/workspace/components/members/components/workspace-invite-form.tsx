import { Group, Box, Button, TagsInput, Select } from "@mantine/core";
import React, { useState } from "react";
import { MultiGroupSelect } from "@/features/group/components/multi-group-select.tsx";
import { UserRole } from "@/lib/types.ts";
import { userRoleData } from "@/features/workspace/types/user-role-data.ts";
import { useCreateInvitationMutation } from "@/features/workspace/queries/workspace-query.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}
export function WorkspaceInviteForm({ onClose }: Props) {
  const [emails, setEmails] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(UserRole.MEMBER);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const createInvitationMutation = useCreateInvitationMutation();
  const navigate = useNavigate();

  async function handleSubmit() {
    const validEmails = emails.filter((email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    });

    await createInvitationMutation.mutateAsync({
      role: role.toLowerCase(),
      emails: validEmails,
      groupIds: groupIds,
    });

    onClose();

    navigate("?tab=invites");
  }

  const handleGroupSelect = (value: string[]) => {
    setGroupIds(value);
  };

  return (
    <>
      <Box maw="500" mx="auto">
        {/*<WorkspaceInviteSection /> */}

        <TagsInput
          mt="sm"
          description="새로운 구성원을 초대할 이메일 주소를 입력하세요. (최대 50개, 쉼표로 구분)"
          label="이메일로 초대"
          placeholder="이메일 주소를 입력하세요"
          variant="filled"
          splitChars={[",", " "]}
          maxDropdownHeight={200}
          maxTags={50}
          onChange={setEmails}
        />

        <Select
          mt="sm"
          description="초대된 구성원에게 할당할 역할을 선택"
          label="역할 선택"
          placeholder="역할 선택"
          variant="filled"
          data={userRoleData.filter((role) => role.value !== UserRole.OWNER)}
          defaultValue={UserRole.MEMBER}
          allowDeselect={false}
          checkIconPosition="right"
          onChange={setRole}
        />

        <MultiGroupSelect
          mt="sm"
          description="초대된 구성원은 그룹이 접근할 수 있는 공간에 액세스 권한이 부여됩니다."
          label={"그룹에 추가"}
          onChange={handleGroupSelect}
        />

        <Group justify="flex-end" mt="md">
          <Button
            onClick={handleSubmit}
            loading={createInvitationMutation.isPending}
          >
            초대 보내기
          </Button>
        </Group>
      </Box>
    </>
  );
}
