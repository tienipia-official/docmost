import { Section, Text } from '@react-email/components';
import * as React from 'react';
import { content, paragraph } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  invitedUserName: string;
  invitedUserEmail: string;
}

export const InvitationAcceptedEmail = ({
  invitedUserName,
  invitedUserEmail,
}: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={paragraph}>안녕하세요.</Text>
        <Text style={paragraph}>
          {invitedUserName} ({invitedUserEmail}) 님이 워크스페이스 초대를
          수락하였습니다.
        </Text>
      </Section>
    </MailBody>
  );
};

export default InvitationAcceptedEmail;
