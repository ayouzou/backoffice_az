import { Toaster } from "@/components/ui/toaster"
import { LoginForm } from "@/components/forms/auth"
import Link from "next/link"
const URL_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlnaXRhbHxlbnwwfHwwfHx8MA%3D%3D'

export default function LoginPage() {
    return (
        <>
            <Toaster />
            <div className="container relative sm:pt-0 pt-20 h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/register"
                    className={"absolute hover:underline right-4 top-4 md:right-8 md:top-8"}>
                    Register
                </Link>
                <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900 rounded-r-3xl" />
                    <Link href={'/'} className="relative z-20 flex items-center text-lg font-medium">
                        AZ
                    </Link>
                    <div className="relative z-20 mt-60 justify-center flex items-center text-lg font-medium">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                                Empower Your Business with Our AZ Platform
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Streamline your online operations, boost sales, and provide an exceptional customer experience with
                                our comprehensive platform.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="lg:p-8 ">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login to your seller account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your credentials
                            </p>
                        </div>
                        <LoginForm />
                        <p className="px-8 text-center text-sm text-muted-foreground"> Forgot your password?{" "}
                            <a href="#"
                                className="underline underline-offset-4 hover:text-primary">
                                Click here
                            </a>{" "}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}