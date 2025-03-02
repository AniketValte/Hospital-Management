import React from 'react'
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";



const Home = () => {
  return (
    <>
      <Hero title={"Welcome to Valte Medical Institute | Your Trusted Healthcare Services Provider"}
            imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"}/>
      <Department/>
      <MessageForm/>
      
    </>
  )
}

export default Home
