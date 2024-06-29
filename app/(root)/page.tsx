import DoughnutChart from '@/components/ui/DoughnutChart'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalance from '@/components/ui/TotalBalance'
import React from 'react'

const Home = () => {
    const loggedIn = {firstName: 'John'}
  return (
    <section className='home'>
        <div className="home-content">
            <header className='home-header'>
               
                <HeaderBox
                type="greeting"
                title="Welcome"
                user={loggedIn?.firstName || "Guest"}
                subtext="Access and manage your account and transactions efficiently"
                />
                <TotalBalance accounts={[]} totalBanks={1} totalCurrentBalance={1250.35}/>
            </header>
        </div>
        
    </section>
  )
}

export default Home