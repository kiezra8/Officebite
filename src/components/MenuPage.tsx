import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface MenuPageProps {
  type: 'breakfast' | 'lunch'
  onBack: () => void
}

interface MenuItem {
  id: string
  name: string
  price: number
  unit?: string
  description?: string
  image: string
}

const breakfastItems: MenuItem[] = [
  { id: '1', name: 'Black Tea', price: 1500, description: 'Classic brewed black tea.', image: 'https://i.pinimg.com/736x/7b/fd/a2/7bfda2a39398c93e8e96b04d361222e3.jpg' },
  { id: '2', name: 'African Tea', price: 2500, description: 'Brewed with milk and ginger/spices.', image: 'https://i.pinimg.com/736x/fc/3e/3d/fc3e3d3d6060dd2647c8fcce985368df.jpg' },
  { id: '3', name: 'Samosas', price: 1000, unit: 'per pair', description: 'Beef or Vegetable options available.', image: 'https://i.pinimg.com/736x/94/6d/73/946d73dda845f94a3ba7337637f23764.jpg' },
  { id: '4', name: 'Mandazi', price: 500, unit: 'each', description: 'Freshly fried fluffy mandazi.', image: 'https://i.pinimg.com/736x/4a/09/dc/4a09dcd1157d1fad7ecec7eb8aeb54d4.jpg' },
  { id: '5', name: 'Rolex', price: 3500, description: '2 eggs, 1 chapati, tomatoes & cabbage.', image: 'https://i.pinimg.com/1200x/f9/7c/d2/f97cd249a967627bf90b981a8a8315fb.jpg' },
]

const lunchItems: MenuItem[] = [
  { id: 'l1', name: 'Stew with Beans', price: 3000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/736x/cf/fd/d3/cffdd33cf76155f9ff59433c8ae54e3d.jpg' },
  { id: 'l2', name: 'Stew with Meat (Beef)', price: 4000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg' },
  { id: 'l3', name: 'Stew with Chicken', price: 6000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg' },
  { id: 'l4', name: 'Stew with G-nuts', price: 3500, description: 'Traditional Baganda style groundnut sauce.', image: 'https://i.pinimg.com/1200x/e7/27/94/e72794c5f1ced34ea2e47169490c3e88.jpg' },
  { id: 'l5', name: 'Pilau Beef', price: 5000, description: 'Spiced rice with tender beef chunks.', image: 'https://i.pinimg.com/736x/b8/ae/c0/b8aec06af74bd9b2b5317ca44b3f07c7.jpg' },
]

export default function MenuPage({ type, onBack }: MenuPageProps) {
  const items = type === 'breakfast' ? breakfastItems : lunchItems
  const [cart, setCart] = useState<Record<string, number>>({})

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      return { ...prev, [id]: next }
    })
  }

  const total = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = items.find(i => i.id === id)
    return acc + (item?.price || 0) * qty
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ 
        minHeight: '100vh',
        padding: '40px 20px',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.85)), url(${type === 'breakfast' ? 'https://i.pinimg.com/736x/b2/86/84/b28684319e013b4b20b7d194fbbf345f.jpg' : 'https://i.pinimg.com/736x/b8/ae/c0/b8aec06af74bd9b2b5317ca44b3f07c7.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container">
        <button 
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--primary)',
            background: 'rgba(255,255,255,0.9)',
            padding: '10px 20px',
            borderRadius: '14px',
            width: 'fit-content',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'var(--transition)'
          }}
        >
          <ArrowLeft size={20} />
          Back to Categories
        </button>

        <h2 style={{ 
          fontSize: '3rem', 
          textTransform: 'capitalize', 
          marginBottom: '8px',
          color: 'var(--accent)',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {type} Menu
        </h2>
        <p style={{ 
          fontSize: '1.2rem',
          opacity: 0.8, 
          marginBottom: '40px',
          fontWeight: '500',
          color: 'var(--accent)'
        }}>
          Freshly prepared and delivered to your office.
        </p>

        {/* Menu Hero Section */}
        <div style={{
          height: '250px',
          borderRadius: '32px',
          marginBottom: '50px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.7)), url(${type === 'breakfast' ? 'https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg' : 'https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '40px',
            color: 'white'
          }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: '800', opacity: 0.9 }}>Kampala's Finest</span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>{type === 'breakfast' ? 'Morning Delights' : 'Mid-Day Feast'}</h1>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '100px'
        }}>
          {items.map(item => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div style={{
                height: '180px',
                width: '100%',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--accent)' }}>{item.name}</h3>
                    <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>
                      {item.price.toLocaleString()} UGX
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '20px', lineHeight: '1.5' }}>
                    {item.description}
                    {item.unit && <span style={{ display: 'block', fontWeight: '700', marginTop: '6px', color: 'var(--primary)', fontSize: '0.85rem' }}>({item.unit})</span>}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
                  {cart[item.id] > 0 && (
                    <>
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ 
                          background: 'rgba(0,0,0,0.05)', 
                          padding: '8px', 
                          borderRadius: '12px',
                          transition: 'var(--transition)'
                        }}
                      >
                        <Minus size={20} />
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '1.2rem', minWidth: '24px', textAlign: 'center' }}>
                        {cart[item.id]}
                      </span>
                    </>
                  )}
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{ 
                      background: 'var(--primary)', 
                      color: 'white', 
                      padding: '8px', 
                      borderRadius: '12px',
                      boxShadow: '0 6px 15px rgba(255, 94, 58, 0.4)',
                      transition: 'var(--transition)'
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {total > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '20px',
              right: '20px',
              maxWidth: '550px',
              margin: '0 auto',
              background: 'var(--accent)',
              color: 'white',
              padding: '24px',
              borderRadius: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
              zIndex: 1000,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div>
              <span style={{ opacity: 0.8, fontSize: '0.9rem', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Total</span>
              <span style={{ fontSize: '1.8rem', fontWeight: '800' }}>{total.toLocaleString()} UGX</span>
            </div>
            <button style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '18px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.1rem',
              boxShadow: '0 8px 20px rgba(255, 94, 58, 0.3)'
            }}>
              <ShoppingBag size={22} />
              Checkout Now
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
