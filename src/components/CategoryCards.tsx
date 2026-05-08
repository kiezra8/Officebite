import { motion } from 'framer-motion'
import { Coffee, Utensils } from 'lucide-react'
import { View } from '../App'

interface CategoryCardsProps {
  onSelect: (view: View) => void
}

export default function CategoryCards({ onSelect }: CategoryCardsProps) {
  return (
    <section className="container" style={{ padding: '60px 20px' }}>
      <h2 style={{ marginBottom: '40px', textAlign: 'center', fontSize: '2.2rem', fontWeight: '800' }}>Explore by Category</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Breakfast Card */}
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('breakfast')}
          style={{
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div style={{
            aspectRatio: '1/1',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.03)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src="https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg" 
              alt="Breakfast" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Breakfast</h3>
        </motion.div>

        {/* Lunch Card */}
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('lunch')}
          style={{
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div style={{
            aspectRatio: '1/1',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.03)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src="https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg" 
              alt="Lunch" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Lunch</h3>
        </motion.div>
      </div>
    </section>
  )
}
