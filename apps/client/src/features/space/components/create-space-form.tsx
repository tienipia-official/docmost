import { Group, Box, Button, TextInput, Stack, Textarea } from "@mantine/core";
import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useCreateSpaceMutation } from "@/features/space/queries/space-query.ts";
import { computeSpaceSlug } from "@/lib";
import { getSpaceUrl } from "@/lib/config.ts";

const formSchema = z.object({
  name: z.string().trim().min(2).max(50),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Space slug must be alphanumeric. No special characters",
    ),
  description: z.string().max(500),
});
type FormValues = z.infer<typeof formSchema>;

export function CreateSpaceForm() {
  const createSpaceMutation = useCreateSpaceMutation();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    validate: zodResolver(formSchema),
    validateInputOnChange: ["slug"],
    initialValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  useEffect(() => {
    const name = form.values.name;
    const words = name.trim().split(/\s+/);

    // Check if the last character is a space or if the last word is a single character (indicating it's in progress)
    const lastChar = name[name.length - 1];
    const lastWordIsIncomplete =
      words.length > 1 && words[words.length - 1].length === 1;

    if (lastChar !== " " || lastWordIsIncomplete) {
      const slug = computeSpaceSlug(name);
      form.setFieldValue("slug", slug);
    }
  }, [form.values.name]);

  const handleSubmit = async (data: {
    name?: string;
    slug?: string;
    description?: string;
  }) => {
    const spaceData = {
      name: data.name,
      slug: data.slug,
      description: data.description,
    };

    const createdSpace = await createSpaceMutation.mutateAsync(spaceData);
    navigate(getSpaceUrl(createdSpace.slug));
  };

  return (
    <>
      <Box maw="500" mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <TextInput
              withAsterisk
              id="name"
              label="스페이스 이름"
              placeholder="예시) 제품팀"
              variant="filled"
              {...form.getInputProps("name")}
            />

            <TextInput
              withAsterisk
              id="slug"
              label="스페이스 슬러그(Slug)"
              placeholder="예시) product"
              variant="filled"
              {...form.getInputProps("slug")}
            />

            <Textarea
              id="description"
              label="스페이스 설명"
              placeholder="예시) 제품 관련 작업을 위한 스페이스입니다."
              variant="filled"
              autosize
              minRows={2}
              maxRows={8}
              {...form.getInputProps("description")}
            />
          </Stack>

          <Group justify="flex-end" mt="md">
            <Button type="submit">생성</Button>
          </Group>
        </form>
      </Box>
    </>
  );
}
