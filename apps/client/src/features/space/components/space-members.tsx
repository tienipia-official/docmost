import {Group, Table, Text, Menu, ActionIcon} from "@mantine/core";
import React from "react";
import {IconDots} from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import {CustomAvatar} from "@/components/ui/custom-avatar.tsx";
import {
  useChangeSpaceMemberRoleMutation,
  useRemoveSpaceMemberMutation,
  useSpaceMembersQuery,
} from "@/features/space/queries/space-query.ts";
import {IconGroupCircle} from "@/components/icons/icon-people-circle.tsx";
import {IRemoveSpaceMember} from "@/features/space/types/space.types.ts";
import RoleSelectMenu from "@/components/ui/role-select-menu.tsx";
import {
  getSpaceRoleLabel,
  spaceRoleData,
} from "@/features/space/types/space-role-data.ts";
import {formatMemberCount} from "@/lib";

type MemberType = "user" | "group";

interface SpaceMembersProps {
  spaceId: string;
  readOnly?: boolean;
}

export default function SpaceMembersList({
                                           spaceId,
                                           readOnly,
                                         }: SpaceMembersProps) {
  const {data, isLoading} = useSpaceMembersQuery(spaceId);
  const removeSpaceMember = useRemoveSpaceMemberMutation();
  const changeSpaceMemberRoleMutation = useChangeSpaceMemberRoleMutation();

  const handleRoleChange = async (
    memberId: string,
    type: MemberType,
    newRole: string,
    currentRole: string,
  ) => {
    if (newRole === currentRole) {
      return;
    }

    const memberRoleUpdate: {
      spaceId: string;
      role: string;
      userId?: string;
      groupId?: string;
    } = {
      spaceId: spaceId,
      role: newRole,
    };

    if (type === "user") {
      memberRoleUpdate.userId = memberId;
    }
    if (type === "group") {
      memberRoleUpdate.groupId = memberId;
    }

    await changeSpaceMemberRoleMutation.mutateAsync(memberRoleUpdate);
  };

  const onRemove = async (memberId: string, type: MemberType) => {
    const memberToRemove: IRemoveSpaceMember = {
      spaceId: spaceId,
    };

    if (type === "user") {
      memberToRemove.userId = memberId;
    }
    if (type === "group") {
      memberToRemove.groupId = memberId;
    }

    await removeSpaceMember.mutateAsync(memberToRemove);
  };

  const openRemoveModal = (memberId: string, type: MemberType) =>
    modals.openConfirmModal({
      title: "스페이스 구성원 삭제",
      children: (
        <Text size="sm">
          이 사용자를 스페이스에서 삭제하시겠습니까? 사용자는 이 스페이스의 모든
          접근 권한을 잃게 됩니다.
        </Text>
      ),
      centered: true,
      labels: {confirm: "Remove", cancel: "Cancel"},
      confirmProps: {color: "red"},
      onConfirm: () => onRemove(memberId, type),
    });

  return (
    <>
      {data && (
        <Table.ScrollContainer minWidth={500}>
          <Table verticalSpacing={8}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Member</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {data?.items.map((member, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Group gap="sm">
                      {member.type === "user" && (
                        <CustomAvatar
                          avatarUrl={member?.avatarUrl}
                          name={member.name}
                        />
                      )}

                      {member.type === "group" && <IconGroupCircle/>}

                      <div>
                        <Text fz="sm" fw={500}>
                          {member?.name}
                        </Text>
                        <Text fz="xs" c="dimmed">
                          {member.type == "user" && member?.email}

                          {member.type == "group" &&
                            `Group - ${formatMemberCount(member?.memberCount)}`}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <RoleSelectMenu
                      roles={spaceRoleData}
                      roleName={getSpaceRoleLabel(member.role)}
                      onChange={(newRole) =>
                        handleRoleChange(
                          member.id,
                          member.type,
                          newRole,
                          member.role,
                        )
                      }
                      disabled={readOnly}
                    />
                  </Table.Td>

                  <Table.Td>
                    {!readOnly && (
                      <Menu
                        shadow="xl"
                        position="bottom-end"
                        offset={20}
                        width={200}
                        withArrow
                        arrowPosition="center"
                      >
                        <Menu.Target>
                          <ActionIcon variant="subtle" c="gray">
                            <IconDots size={20} stroke={2}/>
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            onClick={() =>
                              openRemoveModal(member.id, member.type)
                            }
                          >
                            스페이스 구성원 삭제
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  );
}
