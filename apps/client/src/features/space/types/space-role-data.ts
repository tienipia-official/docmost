import { IRoleData, SpaceRole } from "@/lib/types.ts";

export const spaceRoleData: IRoleData[] = [
  {
    label: "관리자",
    value: SpaceRole.ADMIN,
    description: "스페이스의 모든 페이지를 생성하고 편집할 수 있습니다.",
  },
  {
    label: "편집자",
    value: SpaceRole.WRITER,
    description: "스페이스에서 페이지를 생성하고 편집할 수 있습니다.",
  },
  {
    label: "읽기 전용",
    value: SpaceRole.READER,
    description: "스페이스의 페이지를 볼 수 있지만 편집할 수는 없습니다.",
  },
];

export function getSpaceRoleLabel(value: string) {
  const role = spaceRoleData.find((item) => item.value === value);
  return role ? role.label : undefined;
}
