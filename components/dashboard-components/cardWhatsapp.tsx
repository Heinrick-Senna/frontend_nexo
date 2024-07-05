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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Status do WhatsApp
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
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

        {/* <p className="text-xs text-muted-foreground">
            Reconectar ou configurar novamente.
        </p> */}
      </CardContent>
    </Card>
  );
}
