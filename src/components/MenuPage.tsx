import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, ShoppingBag, MessageSquare, PhoneCall } from 'lucide-react'
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
  { id: '6', name: 'Katogo (Offals)', price: 4500, description: 'Matooke cooked with rich offal sauce.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80', category: 'breakfast' },
  { id: '7', name: 'Kikomando', price: 2500, description: 'Sliced chapati mixed with fried beans.', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&w=800&q=80', category: 'breakfast' },
  { id: '8', name: 'Plain Chapati', price: 1000, unit: 'each', description: 'Warm, soft and flaky flatbread.', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80', category: 'breakfast' },
  { id: '9', name: 'Millet Porridge', price: 2000, description: 'Hot and nutritious millet porridge.', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80', category: 'breakfast' },
  { id: '10', name: 'Spanish Omelette', price: 3000, description: '2 eggs fried with onions and tomatoes.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', category: 'breakfast' },
]

export const lunchItems: MenuItem[] = [
  { id: 'l1', name: 'Stew with Beans', price: 3000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/736x/cf/fd/d3/cffdd33cf76155f9ff59433c8ae54e3d.jpg', category: 'lunch' },
  { id: 'l2', name: 'Stew with Meat (Beef)', price: 4000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/1200x/76/64/e9/7664e97464a98242d6b6f13792567e35.jpg', category: 'lunch' },
  { id: 'l3', name: 'Stew with Chicken', price: 6000, description: 'Served with Matooke, Rice, or Posho.', image: 'https://i.pinimg.com/1200x/59/9e/b4/599eb43d743194b2d9987dce32db9a45.jpg', category: 'lunch' },
  { id: 'l4', name: 'Stew with G-nuts', price: 3500, description: 'Traditional Baganda style groundnut sauce.', image: 'https://i.pinimg.com/1200x/e7/27/94/e72794c5f1ced34ea2e47169490c3e88.jpg', category: 'lunch' },
  { id: 'l5', name: 'Pilau Beef', price: 5000, description: 'Spiced rice with tender beef chunks.', image: 'https://i.pinimg.com/736x/b8/ae/c0/b8aec06af74bd9b2b5317ca44b3f07c7.jpg', category: 'lunch' },
  { id: 'l6', name: 'Chicken Luwombo', price: 10000, description: 'Slow-cooked chicken in banana leaves.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80', category: 'lunch' },
  { id: 'l7', name: 'Beef Luwombo', price: 8000, description: 'Rich beef stew steamed in banana leaves.', image: 'https://images.unsplash.com/photo-1544025162-8315ea07525f?auto=format&fit=crop&w=800&q=80', category: 'lunch' },
  { id: 'l8', name: 'Fried Fish & Chips', price: 12000, description: 'Crispy whole tilapia served with fries.', image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80', category: 'lunch' },
  { id: 'l9', name: 'Muchomo (Pork)', price: 5000, unit: 'per stick', description: 'Charcoal-roasted pork skewers.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', category: 'lunch' },
  { id: 'l10', name: 'Rice and Peas', price: 3000, description: 'Steamed rice served with fresh peas.', image: 'https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&w=800&q=80', category: 'lunch' },
]

const allItems = [...breakfastItems, ...lunchItems]

export default function MenuPage({ type, onBack, cart, updateQuantity, onNavigate: _onNavigate }: MenuPageProps) {
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

  // Filter items based on activeTab
  const filteredItems = allItems.filter(item => activeTab === 'all' || item.category === activeTab)

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
      padding: '0 0 180px',          /* huge bottom gap so last items and buttons aren't hidden behind the floating bars */
      position: 'relative',
      background: '#0d1117',
      backgroundImage: `linear-gradient(rgba(13,17,23,0.88), rgba(13,17,23,0.94)), url(${getBackgroundUrl()})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
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

        {/* Search Bar Removed */}

        {/* Category Header Hero Section Removed */}

        {/* Menu Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
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
                  padding: '20px 10px 10px'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'white',
                    lineHeight: '1.2',
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)'
                  }}>
                    {item.name}
                    {item.unit && (
                      <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '500', opacity: 0.8, marginTop: '2px' }}>({item.unit})</span>
                    )}
                  </h3>

                  {/* Price pill */}
                  <span style={{
                    fontWeight: '800',
                    color: 'white',
                    fontSize: '0.75rem',
                    background: 'var(--primary)',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(255,94,58,0.4)',
                    flexShrink: 0
                  }}>
                    {item.price.toLocaleString()} UGX
                  </span>
                </div>

                {/* Quantity controls & Add to Order button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                  {(!cart[item.id] || cart[item.id] === 0) ? (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        background: 'linear-gradient(135deg, var(--primary), #ff8a65)',
                        color: 'white',
                        padding: '6px 10px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        gap: '6px',
                        boxShadow: '0 4px 15px rgba(255,94,58,0.4)',
                        transition: 'transform 0.2s, filter 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Plus size={14} /> Add
                    </button>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      padding: '4px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          padding: '6px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: '900', fontSize: '1rem', color: 'white', minWidth: '32px', textAlign: 'center' }}>
                        {cart[item.id]}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          background: 'var(--primary)',
                          color: 'white',
                          padding: '6px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(255,94,58,0.4)',
                          transition: 'filter 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  )}
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
                bottom: '88px', // raised above the 68px mobile bottom nav
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
              <div style={{ display: 'flex', padding: '8px', background: 'rgba(15, 23, 42, 0.97)', gap: '8px' }}>
                <button
                  onClick={handleWhatsAppOrder}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: 'white',
                    padding: '16px 10px',
                    borderRadius: '16px',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.25)',
                    transition: 'transform 0.2s, filter 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <MessageSquare size={20} style={{ marginBottom: '2px' }} />
                  <span>Order the Meal</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: '600', textTransform: 'uppercase' }}>(via WhatsApp)</span>
                </button>

                <button
                  onClick={handleCallOrder}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    color: 'white',
                    padding: '16px 10px',
                    borderRadius: '16px',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s, filter 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.3)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <PhoneCall size={20} style={{ marginBottom: '2px' }} />
                  <span>Order the Meal</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: '600', textTransform: 'uppercase' }}>(Direct Call)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
