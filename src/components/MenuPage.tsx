import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, ShoppingBag, MessageSquare, PhoneCall, Search, Coffee, Utensils } from 'lucide-react'
import { useState, useEffect } from 'react'
import { UserProfile } from './AccountPage'

interface MenuPageProps {
  type: 'breakfast' | 'lunch' | 'meals'
  onBack: () => void
  cart: Record<string, number>
  updateQuantity: (id: string, delta: number) => void
  onNavigate: (view: 'home' | 'breakfast' | 'lunch' | 'meals' | 'account') => void
}

export interface MenuItem {
  id: string
  name: string
  price: number
  unit?: string
  description?: string
  image: string
  category: 'breakfast' | 'lunch'
}

export const breakfastItems: MenuItem[] = [
  { id: '1', name: 'Black Tea', price: 1500, description: 'Classic brewed black tea.', image: 'https://i.pinimg.com/736x/7b/fd/a2/7bfda2a39398c93e8e96b04d361222e3.jpg', category: 'breakfast' },
  { id: '2', name: 'African Tea', price: 2500, description: 'Brewed with milk and ginger/spices.', image: 'https://i.pinimg.com/736x/fc/3e/3d/fc3e3d3d6060dd2647c8fcce985368df.jpg', category: 'breakfast' },
  { id: '3', name: 'Samosas', price: 1000, unit: 'per pair', description: 'Beef or Vegetable options available.', image: 'https://i.pinimg.com/736x/94/6d/73/946d73dda845f94a3ba7337637f23764.jpg', category: 'breakfast' },
  { id: '4', name: 'Mandazi', price: 500, unit: 'each', description: 'Freshly fried fluffy mandazi.', image: 'https://i.pinimg.com/736x/4a/09/dc/4a09dcd1157d1fad7ecec7eb8aeb54d4.jpg', category: 'breakfast' },
  { id: '5', name: 'Rolex', price: 3500, description: '2 eggs, 1 chapati, tomatoes & cabbage.', image: 'https://i.pinimg.com/1200x/f9/7c/d2/f97cd249a967627bf90b981a8a8315fb.jpg', category: 'breakfast' },
]

export const lunchItems: MenuItem[] = [
  { id: 'l1', name: 'Stew with Beans', price: 3000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/736x/cf/fd/d3/cffdd33cf76155f9ff59433c8ae54e3d.jpg', category: 'lunch' },
  { id: 'l2', name: 'Stew with Meat (Beef)', price: 4000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg', category: 'lunch' },
  { id: 'l3', name: 'Stew with Chicken', price: 6000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg', category: 'lunch' },
  { id: 'l4', name: 'Stew with G-nuts', price: 3500, description: 'Traditional Baganda style groundnut sauce.', image: 'https://i.pinimg.com/1200x/e7/27/94/e72794c5f1ced34ea2e47169490c3e88.jpg', category: 'lunch' },
  { id: 'l5', name: 'Pilau Beef', price: 5000, description: 'Spiced rice with tender beef chunks.', image: 'https://i.pinimg.com/736x/b8/ae/c0/b8aec06af74bd9b2b5317ca44b3f07c7.jpg', category: 'lunch' },
]

const allItems = [...breakfastItems, ...lunchItems]

export default function MenuPage({ type, onBack, cart, updateQuantity, onNavigate }: MenuPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'breakfast' | 'lunch'>(
    type === 'meals' ? 'all' : type
  )
  const [isCheckoutOpen] = useState(false) // unused, kept to avoid breaking deliveryProfile effect below
  const [deliveryProfile, setDeliveryProfile] = useState<UserProfile>({
    name: '',
    phone: '',
    building: '',
    floor: '',
    officeNumber: '',
    instructions: ''
  })

  // Load profile from local storage for fast ordering
  useEffect(() => {
    const saved = localStorage.getItem('officebite_profile')
    if (saved) {
      try {
        setDeliveryProfile(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [isCheckoutOpen])

  // Filter items based on activeTab and searchTerm
  const filteredItems = allItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const total = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = allItems.find(i => i.id === id)
    return acc + (item?.price || 0) * qty
  }, 0)

  const itemsInCart = allItems.filter(item => cart[item.id] > 0)

  // WhatsApp Order Generation
  const handleWhatsAppOrder = () => {
    if (!deliveryProfile.name || !deliveryProfile.building || !deliveryProfile.officeNumber) {
      alert('Please fill in your Delivery Info in the checkout modal so we know where to bring your food!')
      return
    }

    let message = `*Officebite Kampala Order* 🍱\n`
    message += `=========================\n`
    message += `*Name:* ${deliveryProfile.name}\n`
    message += `*Phone:* ${deliveryProfile.phone || 'N/A'}\n`
    message += `*Office Address:* ${deliveryProfile.building}, Floor ${deliveryProfile.floor}, ${deliveryProfile.officeNumber}\n`
    if (deliveryProfile.instructions) {
      message += `*Instructions:* ${deliveryProfile.instructions}\n`
    }
    message += `=========================\n`
    message += `*Items Ordered:*\n`

    itemsInCart.forEach(item => {
      const qty = cart[item.id]
      message += `• ${item.name} x${qty} - ${(item.price * qty).toLocaleString()} UGX\n`
    })

    message += `=========================\n`
    message += `*Total Order:* *${total.toLocaleString()} UGX*\n\n`
    message += `Please deliver my order. Thank you! 🙏`

    const url = `https://wa.me/256702370441?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handleCallOrder = () => {
    window.open('tel:+256702370441', '_self')
  }

  // Set background based on tab or type
  const getBackgroundUrl = () => {
    if (activeTab === 'breakfast') {
      return 'https://i.pinimg.com/736x/b2/86/84/b28684319e013b4b20b7d194fbbf345f.jpg'
    } else if (activeTab === 'lunch') {
      return 'https://i.pinimg.com/736x/b8/ae/c0/b8aec06af74bd9b2b5317ca44b3f07c7.jpg'
    }
    return 'https://i.pinimg.com/736x/cf/fd/d3/cffdd33cf76155f9ff59433c8ae54e3d.jpg'
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      position: 'relative',
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.92)), url(${getBackgroundUrl()})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      transition: 'background-image 0.5s ease-in-out'
    }}>
      {/* We animate only the inner content so the screen background never blinks black */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="container"
      >
        {/* Back and Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <button 
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: 'var(--primary)',
              background: 'rgba(255,255,255,0.9)',
              padding: '10px 20px',
              borderRadius: '14px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
              transition: 'var(--transition)'
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          {/* Unified search and tab selector for full Meals page */}
          {type === 'meals' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '14px',
              padding: '4px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.02)'
            }}>
              {(['all', 'breakfast', 'lunch'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textTransform: 'capitalize',
                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                    color: activeTab === tab ? 'white' : 'var(--accent)',
                    transition: 'var(--transition)'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Page Title & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              textTransform: 'capitalize', 
              marginBottom: '6px',
              color: 'var(--accent)',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {type === 'meals' ? 'Our Delicious Menu' : `${type} selection`}
            </h2>
            <p style={{ 
              fontSize: '1rem',
              opacity: 0.8, 
              fontWeight: '500',
              color: 'var(--accent)'
            }}>
              Freshly prepared local dishes delivered directly to your building in Kampala.
            </p>
          </div>

          {/* Dynamic Search Bar */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '300px'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '13px', opacity: 0.4 }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search dishes, drinks..."
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(255,255,255,0.9)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                outline: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
              }}
            />
          </div>
        </div>

        {/* Category Header Hero Section */}
        {type !== 'meals' && (
          <div style={{
            height: '200px',
            borderRadius: '24px',
            marginBottom: '40px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.65)), url(${type === 'breakfast' ? 'https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg' : 'https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
            <div style={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px 30px',
              color: 'white'
            }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: '800', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {type === 'breakfast' ? <Coffee size={14} /> : <Utensils size={14} />} Kampala's Finest {type}
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.1 }}>{type === 'breakfast' ? 'Morning Fuel' : 'Tasty Midday Feast'}</h1>
            </div>
          </div>
        )}

        {/* Menu Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '100px'
        }}>
          {filteredItems.map(item => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              style={{
                borderRadius: '24px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '3/4',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease'
              }}
            >
              {/* Full-bleed food image — fills the entire card */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />

              {/* Category badge — top-right corner */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: item.category === 'breakfast'
                  ? 'rgba(255, 94, 58, 0.85)'
                  : 'rgba(255, 180, 0, 0.85)',
                backdropFilter: 'blur(6px)',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '0.65rem',
                fontWeight: '800',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {item.category}
              </div>

              {/* Dark gradient overlay at the bottom — name, price & controls live here */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)',
                padding: '40px 14px 14px'
              }}>
                {/* Name & Price row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '8px', marginBottom: '10px' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'white',
                    lineHeight: '1.2',
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)'
                  }}>
                    {item.name}
                    {item.unit && (
                      <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: '500', opacity: 0.8, marginTop: '2px' }}>({item.unit})</span>
                    )}
                  </h3>

                  {/* Price pill */}
                  <span style={{
                    fontWeight: '800',
                    color: 'white',
                    fontSize: '0.85rem',
                    background: 'var(--primary)',
                    padding: '3px 9px',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(255,94,58,0.4)',
                    flexShrink: 0
                  }}>
                    {item.price.toLocaleString()} UGX
                  </span>
                </div>

                {/* Quantity controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                  {cart[item.id] > 0 && (
                    <>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          padding: '5px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'white', minWidth: '18px', textAlign: 'center' }}>
                        {cart[item.id]}
                      </span>
                    </>
                  )}
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 3px 10px rgba(255,94,58,0.35)'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── DIRECT ORDER BAR ── slides up when cart has items, no modal ── */}
        <AnimatePresence>
          {total > 0 && (
            <motion.div
              key="order-bar"
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 110, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 210 }}
              style={{
                position: 'fixed',
                bottom: '20px',
                left: '16px',
                right: '16px',
                maxWidth: '580px',
                margin: '0 auto',
                zIndex: 200,
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.28)'
              }}
            >
              {/* Top summary strip */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.97)',
                backdropFilter: 'blur(16px)',
                padding: '11px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={15} style={{ color: 'var(--primary)' }} />
                  <span style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {Object.values(cart).reduce((s, q) => s + q, 0)} item{Object.values(cart).reduce((s, q) => s + q, 0) !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <span style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem' }}>
                  {total.toLocaleString()}
                  <span style={{ fontSize: '0.7rem', opacity: 0.6, marginLeft: '4px' }}>UGX</span>
                </span>
              </div>

              {/* Two direct action buttons side by side */}
              <div style={{ display: 'flex' }}>
                <button
                  onClick={handleWhatsAppOrder}
                  style={{
                    flex: 1,
                    background: '#25D366',
                    color: 'white',
                    padding: '15px 10px',
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'filter 0.2s ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                  <MessageSquare size={17} />
                  Order on WhatsApp
                </button>

                <button
                  onClick={handleCallOrder}
                  style={{
                    flex: 1,
                    background: '#1e293b',
                    color: 'white',
                    padding: '15px 10px',
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    border: 'none',
                    borderLeft: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    transition: 'filter 0.2s ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.3)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                  <PhoneCall size={17} />
                  Call to Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
