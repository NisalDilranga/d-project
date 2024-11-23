import React from 'react'
import SwipeCarousel from '../Components/SwipeCarousel'
import HeroSection from '../Components/HeroSection'
import SubSection from '../Components/SubSection'
import Slider1 from '../Components/SliderOne'
import Slikslider from '../Components/Slikslider'
import ShuffleHero from '../Components/ShuffleHero'
import { TextParallaxContentExample } from '../Components/TextParallaxContentExample'
import AppFooter from '../Components/AppFooter'
import SliderOne from '../Components/SliderOne'
import EcommerceNavbar from '../Components/EcommerceNavbar'


const Home = () => {
  return (
    <div >
      <EcommerceNavbar/>
        <SwipeCarousel/>
        <HeroSection/>
        <SubSection/>
         <Slikslider/>
         <ShuffleHero/>
         <SliderOne/>
         <TextParallaxContentExample/>
         <AppFooter/>
    </div>
  )
}

export default Home