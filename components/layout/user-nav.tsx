'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
export function UserNav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                //@ts-ignore
                src={session?.data?.data?.login?.user?.image ?? ''}
                //@ts-ignore
                alt={session?.data?.data?.login?.user?.firstname ?? ''}
              />
              <AvatarFallback>
                {
                  //@ts-ignore
                  session?.data?.data?.login?.user?.firstname?.[0]
                }
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {
                  //@ts-ignore
                  session?.data?.data?.login?.user?.firstname
                }
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {
                  //@ts-ignore
                  session?.data?.data?.login?.user?.email
                }
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Perfil
              <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Configurações
              <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sair
            <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
