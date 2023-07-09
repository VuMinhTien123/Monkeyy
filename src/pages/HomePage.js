import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase-apps/firebase-config'
import styled from 'styled-components'
import Header from '../conponents/layout/Header'
import HomeBanner from '../module/home/HomeBanner'
import Layout from '../conponents/layout/Layout'
import HomeFeature from '../module/home/HomeFeature'
import HomeNewest from '../module/home/HomeNewest'

const HomePage = () => {
   
  return (
    <HomePageStyles>
      <Layout>
     <HomeBanner></HomeBanner> 
     <HomeFeature></HomeFeature>
     <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  )
}

export default HomePage

const HomePageStyles = styled.div `

`;