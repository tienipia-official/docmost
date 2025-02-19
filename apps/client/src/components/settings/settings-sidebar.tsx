import React, { useEffect, useState } from "react";
import { Group, Text, ScrollArea, ActionIcon, rem } from "@mantine/core";
import {
  IconUser,
  IconSettings,
  IconUsers,
  IconArrowLeft,
  IconUsersGroup,
  IconSpaces,
  IconBrush,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./settings.module.css";
import { useTranslation } from "react-i18next";

interface DataItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface DataGroup {
  heading: string;
  items: DataItem[];
}

const groupedData: DataGroup[] = [
  {
    heading: "계정",
    items: [
      { label: "프로필", icon: IconUser, path: "/settings/account/profile" },
      {
        label: "환경설정",
        icon: IconBrush,
        path: "/settings/account/preferences",
      },
    ],
  },
  {
    heading: "워크스페이스",
    items: [
      { label: "일반", icon: IconSettings, path: "/settings/workspace" },
      {
        label: "구성원",
        icon: IconUsers,
        path: "/settings/members",
      },
      { label: "그룹", icon: IconUsersGroup, path: "/settings/groups" },
      { label: "스페이스", icon: IconSpaces, path: "/settings/spaces" },
    ],
  },
];

export default function SettingsSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const menuItems = groupedData.map((group) => (
    <div key={group.heading}>
      <Text c="dimmed" className={classes.linkHeader}>
        {t(group.heading)}
      </Text>
      {group.items.map((item) => (
        <Link
          className={classes.link}
          data-active={active.startsWith(item.path) || undefined}
          key={item.label}
          to={item.path}
        >
          <item.icon className={classes.linkIcon} stroke={2} />
          <span>{t(item.label)}</span>
        </Link>
      ))}
    </div>
  ));

  return (
    <div className={classes.navbar}>
      <Group className={classes.title} justify="flex-start">
        <ActionIcon
          onClick={() => navigate(-1)}
          variant="transparent"
          c="gray"
          aria-label="Back"
        >
          <IconArrowLeft stroke={2} />
        </ActionIcon>
        <Text fw={500}>{t("Settings")}</Text>
      </Group>

      <ScrollArea w="100%">{menuItems}</ScrollArea>
      <div className={classes.version}>
        <Text
          className={classes.version}
          size="sm"
          c="dimmed"
          component="a"
          href="https://github.com/docmost/docmost/releases"
          target="_blank"
        >
          v{APP_VERSION}
        </Text>
      </div>
    </div>
  );
}
