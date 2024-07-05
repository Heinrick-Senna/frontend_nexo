import { gql } from '@apollo/client';

export const BOT_CHECKER = gql`
  query findOneQrCode($where: qrcodeWhereUniqueInput!) {
    findOneQrCode(where: $where) {
      qrcode
    }
  }
`;
