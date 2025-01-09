import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Body from '../components/Body'

const Dashboard = () => {
  return (
    <div className=''>
      <Header/>
      <section className='flex'>
        <SideBar/>
        <Body/>
      </section>
    </div>
  )
}

export default Dashboard
