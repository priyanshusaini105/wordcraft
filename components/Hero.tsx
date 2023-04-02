import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-accent flex gap-2 flex-col-reverse lg:flex-row lg:py-8">
      <section className="lg:w-5/12 p-5 flex flex-col items-center">
        <h1 className='text-5xl text-center m-4 font-nunito text-black font-bold'>Write, Connect, and Grow</h1>
        <div className="m-5"><span className="text-2xl font-nunito">Wordcraft</span>
          <span className='text-2xl font-nunito'> - where writers and readers come together </span>
        </div>
        <span className='m-2 font-poppins p-2'>&nbsp; At Wordcraft, we believe that great writing is all about connection. That's why we've built a platform that brings writers and readers together, making it easy to share your work and engage with your audience. Join our community today and start making meaningful connections.</span>
        <Link href="/login" className='text-white bg-primary rounded-xl m-2 p-2 w-32 mr-5 items-center justify-center flex text-center'>Get Started</Link>
      </section>
      <section className='py-10'>
        <Image alt='WordCraft' src='/img/hero.svg' width={700} height={600} className='h-[20rem] w-70' />
      </section>
    </section>
  )
}

export default Hero