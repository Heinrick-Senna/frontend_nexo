'use client';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import QRCode from 'react-qr-code';

import { BOT_CHECKER } from '@/lib/querys';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

export default function CardWhatsapp() {
  const { data: session } = useSession();
  const { loading, data, refetch } = useQuery(BOT_CHECKER, {
    variables: {
      where: {
        //@ts-ignore
        userId: session?.data?.data?.login?.user?.id
      }
    },
    pollInterval: 2000
  });

  console.log(data);

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Status do WhatsApp
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data?.findOneQrCode?.qrcode === 'connectado' ? (
            'Conectado 🟢'
          ) : data?.findOneQrCode?.qrcode ? (
            <QRCode value={data?.findOneQrCode?.qrcode} />
          ) : (
            'Buscando QRcode...'
          )}
        </div>
      </CardContent>
    </>
  );
}
