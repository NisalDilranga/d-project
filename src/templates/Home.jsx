import React from 'react'
import SwipeCarousel from '../Components/SwipeCarousel'
import HeroSection from '../Components/HeroSection'
import SubSection from '../Components/SubSection'
import Slider1 from '../Components/SliderOne'
import Slikslider from '../Components/Slikslider'
import ShuffleHero from '../Components/ShuffleHero'
import { TextParallaxContentExample } from '../Components/TextParallaxContentExample'
import AppFooter from '../Components/AppFooter'


const Home = () => {
  return (
    <div >
        <SwipeCarousel/>
        <HeroSection/>
        <SubSection/>
         <Slikslider/>
         <ShuffleHero/>
         <TextParallaxContentExample/>
         <AppFooter/>
    </div>
  )
}

export default Home