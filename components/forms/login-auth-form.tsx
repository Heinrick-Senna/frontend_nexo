'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GoogleSignInButton from '../github-auth-button';
import Link from 'next/link';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Este campo deve ser preenchido.' })
    .email('Esse não é um email válido.'),

  password: z.string().min(8, { message: 'Digite a sua senha completa.' })
});

export default function UserAuthForm() {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
    } catch (error) {
      //@ts-ignore
      setErrorMessage(error);
    }
    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Digite seu email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha aqui..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  <Link href="/forgot-password">Esqueci minha senha</Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && <p>Email ou senhas incorretas.</p>}
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Entrar na minha conta
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <Link href="/register">
            <span className="bg-background px-2 text-muted-foreground">
              Criar uma conta
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
