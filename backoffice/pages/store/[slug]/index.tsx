import React from 'react'
import LayoutDash from '@/components/layout/layout'
import CardProfileStore from '@/components/widgets/stores/cards/CardProfileStore'
import AnalyticOverview from '@/components/widgets2/overview/AnalyticOverview'

const index = () => {
    return (
        <LayoutDash>
            <div className="grid min-h-screen w-full overflow-hidden ">
                <div className="flex flex-col">
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-2 md:p-3 ">
                        {/* <div > */}
                            <CardProfileStore />
                        {/* </div> */}
                            <AnalyticOverview/>   
                    </main>
                </div>
            </div>
        </LayoutDash>
    )
}

export default index


