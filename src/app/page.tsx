'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import heroImage from '/public/hero.jpg'

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-gray-50">
        <div className="relative w-full h-[450px]">
          <Image
            src={heroImage}
            alt="Hero"
            layout="fill"
            objectFit="cover"
            className="brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <motion.h1
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to Our Platform
            </motion.h1>

            <motion.p
              className="text-lg max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Empowering users with secure sign-up, sign-in, and OTP verification.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section... */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Secure Authentication',
                description: 'We provide OTP-based secure login and registration flow.',
              },
              {
                title: 'Modern UI/UX',
                description: 'Sleek, responsive, and user-friendly design powered by Tailwind.',
              },
              {
                title: 'Fast & Scalable',
                description: 'Built with Next.js 15 for high performance and scalability.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-100 rounded-lg p-6 text-center shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
