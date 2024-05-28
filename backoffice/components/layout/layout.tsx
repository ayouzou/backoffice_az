import React from 'react'
import Link from 'next/link'
import Sidebar from './sidebar'

export default function LayoutDash({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="ml-auto flex items-center space-x-4">
                        {/* <UserNav /> */}
                    </div>
                </div>

            </div>
            <div className="flex p-4">
                <Sidebar />
                {children}
            </div>
        </>
    )
}




