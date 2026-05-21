import { motion } from 'framer-motion'
import { Coffee, Utensils, ArrowRight } from 'lucide-react'

interface CategoryCardsProps {
  onSelect: (view: 'home' | 'breakfast' | 'lunch' | 'meals' | 'account') => void
}

export default function CategoryCards({ onSelect }: CategoryCardsProps) {
  return (
    /* Zero top padding — sits flush against the hero with no gap */
    <section style={{ background: '#ffffff', padding: '0 0 40px' }}>

      {/* Section header */}
      <div style={{ textAlign: 'center', padding: '36px 20px 28px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a1a' }}>
          What are you having?
        </h2>
      </div>

      {/* Cards — always 2 columns side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',   /* forces two columns on every screen */
        gap: '14px',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {/* ── Breakfast Card ── */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect('breakfast')}
          style={{
            cursor: 'pointer',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            height: '260px'
          }}
        >
          {/* Image fills the card */}
          <motion.img
            src="https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg"
            alt="Breakfast"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Strong dark gradient so text is always readable */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)'
          }} />

          {/* Label — solid, fully visible, directly on image */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: '16px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: '700', color: '#ff9a7a',
                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px'
              }}>
                <Coffee size={12} /> Morning Fuel
              </div>
              {/* ✅ Fully opaque white — always clearly visible */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
                Breakfast
              </h3>
            </div>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'var(--primary)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255,94,58,0.4)', flexShrink: 0
            }}>
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.div>

        {/* ── Lunch Card ── */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect('lunch')}
          style={{
            cursor: 'pointer',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            height: '260px'
          }}
        >
          {/* Image fills the card */}
          <motion.img
            src="https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg"
            alt="Lunch"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Strong dark gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)'
          }} />

          {/* Label — solid, fully visible */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: '16px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: '700', color: '#ffd060',
                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px'
              }}>
                <Utensils size={12} /> Midday Feast
              </div>
              {/* ✅ Fully opaque white — always clearly visible */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
                Lunch
              </h3>
            </div>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'var(--secondary)', color: '#1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255,180,0,0.4)', flexShrink: 0
            }}>
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
