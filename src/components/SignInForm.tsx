
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import useDebounce from "@/lib/hooks/useDebounce";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const result = await signIn('credentials', {
        redirect: false,
        identifier: values.identifier,
        password: values.password
    })
    if(result?.error) {
        toast({
            title: "Login Failed",
            description: "Incorrect username or password",
            variant:"destructive" 
        })
    }
    if(result?.url) {
        router.replace('/dashboard')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Start your Whisper-Box</CardTitle>
        <CardDescription>Signin to your anonymous messenger</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/username</FormLabel>
                    <FormControl>
                      <Input placeholder="Email/username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">SignIn</Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link className="underline pl-2" href={"/sign-in"}>
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
