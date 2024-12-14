import { Button, Divider, Group, Modal, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteSpaceMutation } from '../queries/space-query';
import { useField } from '@mantine/form';
import { ISpace } from '../types/space.types';
import { useNavigate } from 'react-router-dom';
import APP_ROUTE from '@/lib/app-route';

interface DeleteSpaceModalProps {
  space: ISpace;
}

export default function DeleteSpaceModal({ space }: DeleteSpaceModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const deleteSpaceMutation = useDeleteSpaceMutation();
  const navigate = useNavigate();

  const confirmNameField = useField({
    initialValue: '',
    validateOnChange: true,
    validate: (value) =>
      value.trim().toLowerCase() === space.name.trim().toLocaleLowerCase()
        ? null
        : 'Names do not match',
  });

  const handleDelete = async () => {
    if (
      confirmNameField.getValue().trim().toLowerCase() !==
      space.name.trim().toLowerCase()
    ) {
      confirmNameField.validate();
      return;
    }

    try {
      // pass slug too so we can clear the local cache
      await deleteSpaceMutation.mutateAsync({ id: space.id, slug: space.slug });
      navigate(APP_ROUTE.HOME);
    } catch (error) {
      console.error('Failed to delete space', error);
    }
  };

  return (
    <>
      <Button onClick={open} variant="light" color="red">
        Delete
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="이 스페이스를 삭제하시겠습니까?"
      >
        <Divider size="xs" mb="xs" />
        <Text>
          이 스페이스의 모든 페이지, 댓글, 첨부 파일 및 권한이 영구적으로
          삭제됩니다. 이 작업은 되돌릴 수 없습니다.
        </Text>
        <Text mt="sm">
          삭제 하시려면{' '}
          <Text span fw={500}>
            '{space.name}'
          </Text>{' '}
          을(를) 입력하세요.
        </Text>
        <TextInput
          {...confirmNameField.getInputProps()}
          variant="filled"
          placeholder="스페이스 이름 입력"
          py="sm"
          data-autofocus
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={close} variant="default">
            취소
          </Button>
          <Button onClick={handleDelete} color="red">
            삭제
          </Button>
        </Group>
      </Modal>
    </>
  );
}
