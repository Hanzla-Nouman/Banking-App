import DoughnutChart from '@/components/ui/DoughnutChart'
import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar'
import TotalBalance from '@/components/ui/TotalBalance'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {
    const loggedIn =await  getLoggedInUser()
  return (
    <section className='home'>
        <div className="home-content">
            <header className='home-header'>
               
                <HeaderBox
                type="greeting"
                title="Welcome"
                user={loggedIn?.name || "Guest"}
                subtext="Access and manage your account and transactions efficiently"
                />
                <TotalBalance accounts={[]} totalBanks={1} totalCurrentBalance={1250.35}/>
            </header>
            RECENT TRANSACTIONS
        </div>
        <RightSidebar user={loggedIn} banks={[{currentBalance:148.34},{currentBalance:148.34}]} transactions={[]}/>
    </section>
  )
}

export default Home