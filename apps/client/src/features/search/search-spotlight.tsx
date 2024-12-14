import { Group, Center, Text } from "@mantine/core";
import { Spotlight } from "@mantine/spotlight";
import { IconFileDescription, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { usePageSearchQuery } from "@/features/search/queries/search-query";
import { buildPageUrl } from "@/features/page/page.utils.ts";

interface SearchSpotlightProps {
  spaceId?: string;
}
export function SearchSpotlight({ spaceId }: SearchSpotlightProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(query, 300);

  const {
    data: searchResults,
    isLoading,
    error,
  } = usePageSearchQuery({ query: debouncedSearchQuery, spaceId });

  const pages = (
    searchResults && searchResults.length > 0 ? searchResults : []
  ).map((page) => (
    <Spotlight.Action
      key={page.id}
      onClick={() =>
        navigate(buildPageUrl(page.space.slug, page.slugId, page.title))
      }
    >
      <Group wrap="nowrap" w="100%">
        <Center>
          {page?.icon ? (
            <span style={{ fontSize: "20px" }}>{page.icon}</span>
          ) : (
            <IconFileDescription size={20} />
          )}
        </Center>

        <div style={{ flex: 1 }}>
          <Text>{page.title}</Text>

          {page?.highlight && (
            <Text
              opacity={0.6}
              size="xs"
              dangerouslySetInnerHTML={{ __html: page.highlight }}
            />
          )}
        </div>
      </Group>
    </Spotlight.Action>
  ));

  return (
    <>
      <Spotlight.Root
        query={query}
        onQueryChange={setQuery}
        scrollable
        overlayProps={{
          backgroundOpacity: 0.55,
        }}
      >
        <Spotlight.Search
          placeholder="검색"
          leftSection={<IconSearch size={20} stroke={1.5} />}
        />
        <Spotlight.ActionsList>
          {query.length === 0 && pages.length === 0 && (
            <Spotlight.Empty>검색어를 입력해주세요.</Spotlight.Empty>
          )}

          {query.length > 0 && pages.length === 0 && (
            <Spotlight.Empty>
              검색 결과가 없습니다. 다른 검색어를 시도해주세요.
            </Spotlight.Empty>
          )}

          {pages.length > 0 && pages}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
