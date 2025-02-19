import { IRoleData, UserRole } from "@/lib/types.ts";

export const userRoleData: IRoleData[] = [
  {
    label: "소유자",
    value: UserRole.OWNER,
    description: "워크스페이스 소유자",
  },
  {
    label: "관리자",
    value: UserRole.ADMIN,
    description: "워크스페이스를 관리할 수 있습니다.",
  },
  {
    label: "구성원",
    value: UserRole.MEMBER,
    description: "워크스페이스 구성원",
  },
];

export function getUserRoleLabel(value: string) {
  const role = userRoleData.find((item) => item.value === value);
  return role ? role.label : undefined;
}
