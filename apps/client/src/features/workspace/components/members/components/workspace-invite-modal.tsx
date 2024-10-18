import { WorkspaceInviteForm } from "@/features/workspace/components/members/components/workspace-invite-form.tsx";
import { Button, Divider, Modal, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function WorkspaceInviteModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>구성원 초대</Button>

      <Modal
        size="550"
        opened={opened}
        onClose={close}
        title="새로운 구성원 초대"
        centered
      >
        <Divider size="xs" mb="xs" />

        <ScrollArea h="80%">
          <WorkspaceInviteForm onClose={close} />
        </ScrollArea>
      </Modal>
    </>
  );
}
