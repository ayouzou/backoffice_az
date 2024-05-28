import { Toaster } from "@/components/ui/toaster"
import { LoginForm } from "@/components/forms/auth"

export default function LoginPage() {
    return (
        <>
            <Toaster />
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <a
                    href="/examples/authentication"
                    className={"absolute right-4 top-4 md:right-8 md:top-8"}>
                    Login
                </a>
                <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        AZ
                    </div>
                </div>
                <div className="lg:p-8">
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