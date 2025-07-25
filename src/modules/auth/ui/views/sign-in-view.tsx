"use client";

import { OctagonAlertIcon } from "lucide-react";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import {FaGithub, FaGoogle, FaLinkedin, FaTwitter} from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export const SignInView = () => {

    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        try {
            setError(null);
            setPending(true);
            authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: "/"
            },{
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },onError: ({error}) => {
                    setError(error.message);
                    setPending(false);
                }
            })
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    }

    const onSocial = (provider: "github" | "google" | "linkedin" | "twitter") => {
        setError(null);
        setPending(true);
    
        authClient.signIn.social(
        {
            provider: provider,
            callbackURL: "/"
        },{
            onSuccess: () => {
                setPending(false);
            },
            onError: ({error}) => {
                setPending(false);
                setError(error.message);
            }
        })
    }

    return ( 
       <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your account to continue
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                    <AlertTitle>{error}</AlertTitle>
                                    {/* <AlertDescription>
                                        Please check your credentials and try again.
                                    </AlertDescription>  */}
                                </Alert>
                            )}

                            {/* <Button type="submit" className="w-full hover:cursor-pointer" disabled={form.formState.isSubmitting}> */}

                            {/*//Try using disabled=form.formState.isSubmitting instead of pending
                            //to handle the button state*/}

                            <Button type="submit" className="w-full hover:bg-green-600 hover:cursor-pointer bg-green-700 text-white font-bold"  disabled = {pending}>
                                Sign In
                            </Button>

                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" type="button" className="w-full hover:cursor-pointer"
                                onClick={() => onSocial("google")}
                                >
                                    <FaGoogle/>
                                </Button>
                                 <Button variant="outline" type="button" className="w-full hover:cursor-pointer"
                                 onClick={() => onSocial("github")}
                                 >
                                    <FaGithub/>
                                </Button>
                                 <Button variant="outline" type="button" className="w-full hover:cursor-pointer"
                                onClick={() => onSocial("linkedin")}
                                >
                                    <FaLinkedin/>
                                </Button>
                                 <Button variant="outline" type="button" className="w-full hover:cursor-pointer"
                                onClick={() => onSocial("twitter")}
                                >
                                    <FaTwitter/>
                                </Button>
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                Don&apos;t have an account? {" "}
                                <Link href="/sign-up" className="underline underline-offset-4 text-primary hover:underline hover:text-blue-700">
                                Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </Form>

                <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                    <img src="/logo.svg" alt="Meet Ai" className="h-[92px] w-[92px]" />
                    <p className="text-2xl font-semibold text-white">
                        Lakshay Ai
                    </p>
                </div>
            </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#"> Terms of service</a> and <a href="#"> Privacy Policy</a>
        </div>
       </div>
    )
}

