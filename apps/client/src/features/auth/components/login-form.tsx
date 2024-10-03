import * as z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import useAuth from "@/features/auth/hooks/use-auth";
import { ILogin } from "@/features/auth/types/auth.types";
import {
  Container,
  Title,
  TextInput,
  Button,
  PasswordInput,
  Box,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./auth.module.css";
import { useRedirectIfAuthenticated } from "@/features/auth/hooks/use-redirect-if-authenticated.ts";
import { Link, useNavigate } from "react-router-dom";
import APP_ROUTE from "@/lib/app-route.ts";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// parse querystring of url
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");

export function LoginForm() {
  const { signIn, isLoading } = useAuth();
  useRedirectIfAuthenticated();

  const form = useForm<ILogin>({
    validate: zodResolver(formSchema),
    initialValues: {
      email: email ?? "",
      password: "",
    },
  });

  async function onSubmit(data: ILogin) {
    await signIn(data);
  }

  return (
    <Container size={420} my={40} className={classes.container}>
      <Box p="xl" mt={200}>
        <Title order={2} ta="center" fw={500} mb="md">
          스페이스
        </Title>
        <Text size="sm" my={8}>
          스페이스는 초대장을 받은 사용자만 이용할 수 있습니다.
        </Text>{" "}
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            id="email"
            type="email"
            label="이메일"
            placeholder="email@example.com"
            variant="filled"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            variant="filled"
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button type="submit" fullWidth mt="xl" loading={isLoading}>
            스페이스 입장
          </Button>
        </form>
        <Anchor
          to={APP_ROUTE.AUTH.FORGOT_PASSWORD}
          component={Link}
          underline="never"
          size="sm"
        >
          패스워드를 잊으셨나요?
        </Anchor>
      </Box>
    </Container>
  );
}
