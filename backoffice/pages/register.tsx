import { Register } from '@/components/forms/auth/Register'
import { Toaster } from '@/components/ui/toaster'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <>
    <Toaster />
    <div className="container relative sm:pt-0 pt-20 h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
            href="/login"
            className={"absolute hover:underline right-4 top-4 md:right-8 md:top-8"}>
            Login
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
                        Create account 
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials
                    </p>
                </div>

                <Register/>
            </div>
        </div>
    </div>
</>  )
}

export default index