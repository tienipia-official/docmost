import {
  Group,
  Text,
  useMantineColorScheme,
  Select,
  MantineColorScheme,
} from "@mantine/core";

export default function AccountTheme() {
  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">테마</Text>
        <Text size="sm" c="dimmed">
          선호하는 색상 테마를 선택하세요.
        </Text>
      </div>

      <ThemeSwitcher />
    </Group>
  );
}

function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleChange = (value: MantineColorScheme) => {
    setColorScheme(value);
  };

  return (
    <Select
      label="테마 선택"
      data={[
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "auto", label: "System settings" },
      ]}
      value={colorScheme}
      onChange={handleChange}
      allowDeselect={false}
      checkIconPosition="right"
    />
  );
}
