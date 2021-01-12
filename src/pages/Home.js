import React from 'react'
import IssuesList from '../components/IssuesList'
import Navbar from '../components/Navbar'
import { MainRouter } from '../router/MainRouter';

const Home = () => {
    return (
        <>
         <Navbar />
         <MainRouter />
        </>
    )
}

export default Home
