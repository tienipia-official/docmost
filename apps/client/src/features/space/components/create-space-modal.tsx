import { Button, Divider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateSpaceForm } from "@/features/space/components/create-space-form.tsx";

export default function CreateSpaceModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>스페이스 생성</Button>

      <Modal opened={opened} onClose={close} title="스페이스 생성">
        <Divider size="xs" mb="xs" />
        <CreateSpaceForm />
      </Modal>
    </>
  );
}
