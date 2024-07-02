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
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.email, values.password);
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (result?.error) {
        //@ts-ignore
        setErrorMessage(result?.error);
      } else {
        setErrorMessage(undefined);
        window.location.href = '/';
      }
    } catch (error) {
      //@ts-ignore
      setErrorMessage(error);
    }
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
                    placeholder="Enter your email..."
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
                    placeholder="Digite sua senha"
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
