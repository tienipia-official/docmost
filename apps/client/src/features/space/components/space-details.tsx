import React from "react";
import { useSpaceQuery } from "@/features/space/queries/space-query.ts";
import { EditSpaceForm } from "@/features/space/components/edit-space-form.tsx";
import { Divider, Group, Text } from "@mantine/core";
import DeleteSpaceModal from "./delete-space-modal";

interface SpaceDetailsProps {
  spaceId: string;
  readOnly?: boolean;
}
export default function SpaceDetails({ spaceId, readOnly }: SpaceDetailsProps) {
  const { data: space, isLoading } = useSpaceQuery(spaceId);

  return (
    <>
      {space && (
        <div>
          <Text my="md" fw={600}>
            세부정보
          </Text>
          <EditSpaceForm space={space} readOnly={readOnly} />

          {!readOnly && (
            <>
              <Divider my="lg" />

              <Group justify="space-between" wrap="nowrap" gap="xl">
                <div>
                  <Text size="md">스페이스 삭제</Text>
                  <Text size="sm" c="dimmed">
                    이 스페이스와 모든 페이지 및 데이터를 삭제합니다.
                  </Text>
                </div>

                <DeleteSpaceModal space={space} />
              </Group>
            </>
          )}
        </div>
      )}
    </>
  );
}
