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

  // Pre-load the next slide's image as a hidden layer so cross-fade is seamless
  const prevIndex = (index - 1 + slides.length) % slides.length

  return (
    <section style={{
      height: '500px',
      position: 'relative',
      overflow: 'hidden',
      // Use the first slide's image as the always-visible base so there is
      // never any black/dark body colour showing through during transitions.
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.72)), url(${slides[prevIndex].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Cross-fade: incoming slide fades IN on top of the base — no gap, no black */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.22), rgba(0,0,0,0.70)), url(${slides[index].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 20px'
          }}
        >
          <div style={{ maxWidth: '820px', color: 'white' }}>
            <motion.span
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '5px 18px',
                borderRadius: '30px',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '18px',
                color: 'rgba(255,255,255,0.9)'
              }}
            >
              Kampala Office Delivery
            </motion.span>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                marginBottom: '14px',
                fontWeight: '900',
                lineHeight: 1.1,
                color: 'white'
              }}
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ fontSize: '1.1rem', opacity: 0.88, maxWidth: '500px', margin: '0 auto' }}
            >
              {slides[index].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot navigation */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: 'white',
              opacity: i === index ? 1 : 0.45,
              transition: 'all 0.35s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          />
        ))}
      </div>
    </section>
  )
}
