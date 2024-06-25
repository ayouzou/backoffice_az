import { jwtDecode } from "jwt-decode";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { loginFormSchema } from "./schema"
import { Button } from "@/components/form-element/button"
import {   Form, FormControl, FormDescription,    FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/form-element/input"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { storeCookie } from "@/lib/auth";
export function LoginForm() {
    const { toast } = useToast()
    const { auth } = useAuth()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const [isLoading, setIsLoading] = useState(false)
    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoading(true);
        const { email, password } = values;
        const API = `${process.env.NEXT_PUBLIC_API_URL}`

        try {
            const response = await fetch(`${API}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json() as { token: string, message: string };

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Your credentials are not valid.",
                })
                setIsLoading(false);
                return;
            }

            if (data.token) {
                storeCookie('token', data.token);
                toast({
                    variant: "default",
                    title: "Login success",
                })
            }

            window.location.href = '/stores'
            setIsLoading(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Your credentials are not valid.",
            })
        }

    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            window.location.href = '/stores'
        }
    }, [auth])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
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
                                <Input placeholder="password" {...field} type="password" />
                            </FormControl>
                            <FormDescription>
                                Forgot your password?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} isLoading={isLoading} className="px-10">Login</Button>
            </form>
        </Form>
    )
}