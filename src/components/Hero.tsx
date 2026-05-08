import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    title: 'Energize Your Morning',
    description: 'Authentic Ugandan breakfast delivered to your desk.',
    image: 'https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg',
    color: '#ff5e3a'
  },
  {
    id: 2,
    title: 'Lunch That Hits Different',
    description: 'Freshly cooked local dishes to keep you going.',
    image: 'https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg',
    color: '#ffb400'
  },
  {
    id: 3,
    title: 'We Deliver Everywhere',
    description: 'To your office, your shop, or even the corridor.',
    image: 'https://i.pinimg.com/1200x/e7/27/94/e72794c5f1ced34ea2e47169490c3e88.jpg',
    color: '#2d3436'
  }
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section style={{
      height: '500px',
      position: 'relative',
      overflow: 'hidden',
      background: '#000'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${slides[index].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 20px'
          }}
        >
          <div style={{ maxWidth: '800px', color: 'white' }}>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '3.5rem', marginBottom: '16px' }}
            >
              {slides[index].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ fontSize: '1.2rem', opacity: 0.9 }}
            >
              {slides[index].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        {slides.map((_, i) => (
          <div 
            key={i}
            style={{
              width: i === index ? '30px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: 'white',
              opacity: i === index ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  )
}
