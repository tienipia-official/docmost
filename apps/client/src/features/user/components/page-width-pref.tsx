import { Group, Text, Switch, MantineSize } from "@mantine/core";
import { useAtom } from "jotai/index";
import { userAtom } from "@/features/user/atoms/current-user-atom.ts";
import { updateUser } from "@/features/user/services/user-service.ts";
import React, { useState } from "react";

export default function PageWidthPref() {
  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">폭 맞춤</Text>
        <Text size="sm" c="dimmed">
          폭 맞춤으로 사용하거나, 고정 크기를 사용합니다.
        </Text>
      </div>

      <PageWidthToggle />
    </Group>
  );
}

interface PageWidthToggleProps {
  size?: MantineSize;
  label?: string;
}
export function PageWidthToggle({ size, label }: PageWidthToggleProps) {
  const [user, setUser] = useAtom(userAtom);
  const [checked, setChecked] = useState(
    user.settings?.preferences?.fullPageWidth
  );

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked;
    const updatedUser = await updateUser({ fullPageWidth: value });
    setChecked(value);
    setUser(updatedUser);
  };

  return (
    <Switch
      size={size}
      label={label}
      labelPosition="left"
      defaultChecked={checked}
      onChange={handleChange}
      aria-label="Toggle full page width"
    />
  );
}
