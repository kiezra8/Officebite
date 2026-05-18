import { motion } from 'framer-motion'
import { Coffee, Utensils, ArrowRight } from 'lucide-react'

interface CategoryCardsProps {
  onSelect: (view: 'home' | 'breakfast' | 'lunch' | 'meals' | 'account') => void
}

export default function CategoryCards({ onSelect }: CategoryCardsProps) {
  return (
    <section className="container" style={{ padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <span style={{ 
          background: 'rgba(255, 94, 58, 0.08)', 
          color: 'var(--primary)', 
          padding: '6px 16px', 
          borderRadius: '20px', 
          fontSize: '0.85rem', 
          fontWeight: '800',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '12px'
        }}>
          Handcrafted Menus
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--accent)' }}>
          Explore Our Specialties
        </h2>
        <p style={{ opacity: 0.6, fontSize: '1rem', marginTop: '4px', maxWidth: '500px', margin: '0 auto' }}>
          Select a category to view freshly cooked meals delivered hot to your office location.
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Breakfast Card */}
        <motion.div
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('breakfast')}
          style={{
            cursor: 'pointer',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.4)',
            position: 'relative',
            height: '350px'
          }}
        >
          {/* Card Image Wrapper with overflow hidden */}
          <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            <motion.img 
              src="https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg" 
              alt="Breakfast" 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Soft gradient overlay on image */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.4))'
            }} />
          </div>

          {/* HIGHLY HIGHLIGHTED GLASSMORPHIC OVERLAY BADGE */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            padding: '18px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.5)',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'background 0.3s ease'
          }}>
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '0.8rem', 
                fontWeight: '800', 
                color: 'var(--primary)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                marginBottom: '4px'
              }}>
                <Coffee size={14} />
                Morning Fuel
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent)' }}>
                Breakfast
              </h3>
            </div>
            
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(255, 94, 58, 0.25)'
            }}>
              <ArrowRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* Lunch Card */}
        <motion.div
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('lunch')}
          style={{
            cursor: 'pointer',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.4)',
            position: 'relative',
            height: '350px'
          }}
        >
          {/* Card Image Wrapper with overflow hidden */}
          <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            <motion.img 
              src="https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg" 
              alt="Lunch" 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Soft gradient overlay on image */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.4))'
            }} />
          </div>

          {/* HIGHLY HIGHLIGHTED GLASSMORPHIC OVERLAY BADGE */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            padding: '18px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.5)',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'background 0.3s ease'
          }}>
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '0.8rem', 
                fontWeight: '800', 
                color: 'var(--secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                marginBottom: '4px'
              }}>
                <Utensils size={14} />
                Midday Feast
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent)' }}>
                Lunch
              </h3>
            </div>
            
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(255, 180, 0, 0.25)'
            }}>
              <ArrowRight size={18} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
