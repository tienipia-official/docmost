import { Section, Text, Button } from '@react-email/components';
import * as React from 'react';
import { button, content, paragraph } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  inviteLink: string;
}

export const InvitationEmail = ({ inviteLink }: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={paragraph}>안녕하세요.</Text>
        <Text style={paragraph}>
          귀하는 워크스페이스 멤버로 초대 되었습니다.
        </Text>
        <Text style={paragraph}>
          아래 수락 버튼을 클릭하여 초대를 수락하고 워크스페이스에 참여하세요.
        </Text>
      </Section>
      <Section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '15px',
          paddingBottom: '15px',
        }}
      >
        <Button href={inviteLink} style={button}>
          수락하기
        </Button>
      </Section>
    </MailBody>
  );
};

export default InvitationEmail;
