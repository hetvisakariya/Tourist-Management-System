import { FeaturedDestinations } from '@/components/featured-destinations'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import React from 'react'

export default function Destination() {
    return (
        <>
        <Navbar />
        <FeaturedDestinations />
        <Footer />
        </>
    )
}
