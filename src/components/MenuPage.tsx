import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, ShoppingBag, MessageSquare, PhoneCall, X, Search, Coffee, Utensils } from 'lucide-react'
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
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
              whileHover={{ y: -6, boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease'
              }}
            >
              {/* IMAGE IS THE BIGGER (Height increased to 240px) */}
              <div style={{
                height: '240px',
                width: '100%',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                {/* Category tag badge on the image */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  {item.category}
                </div>
              </div>
              
              {/* WORDS AND PRICE ARE SMALL (Paddings and fonts optimized) */}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: '700', 
                      color: 'var(--accent)', 
                      lineHeight: '1.2' 
                    }}>
                      {item.name}
                    </h3>
                    
                    {/* Compact elegant Price pill badge */}
                    <span style={{ 
                      fontWeight: '800', 
                      color: 'var(--primary)', 
                      fontSize: '0.9rem',
                      background: 'rgba(255, 94, 58, 0.08)',
                      padding: '4px 8px',
                      borderRadius: '10px',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.price.toLocaleString()} UGX
                    </span>
                  </div>
                  
                  <p style={{ 
                    fontSize: '0.85rem', 
                    opacity: 0.75, 
                    marginBottom: '16px', 
                    lineHeight: '1.4',
                    color: 'var(--accent)'
                  }}>
                    {item.description}
                    {item.unit && <span style={{ display: 'block', fontWeight: '700', marginTop: '4px', color: 'var(--primary)', fontSize: '0.75rem' }}>({item.unit})</span>}
                  </p>
                </div>

                {/* Plus / Minus Action button controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                  {cart[item.id] > 0 && (
                    <>
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ 
                          background: 'rgba(0,0,0,0.05)', 
                          padding: '6px', 
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition)'
                        }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '1rem', minWidth: '20px', textAlign: 'center' }}>
                        {cart[item.id]}
                      </span>
                    </>
                  )}
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{ 
                      background: 'var(--primary)', 
                      color: 'white', 
                      padding: '6px', 
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(255, 94, 58, 0.3)',
                      transition: 'var(--transition)'
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Cart bar at the bottom */}
        {total > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '20px',
              right: '20px',
              maxWidth: '550px',
              margin: '0 auto',
              background: 'var(--accent)',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 15px 50px rgba(0,0,0,0.4)',
              zIndex: 99,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div>
              <span style={{ opacity: 0.8, fontSize: '0.8rem', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{total.toLocaleString()} UGX</span>
            </div>
            
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                boxShadow: '0 6px 15px rgba(255, 94, 58, 0.25)',
                transition: 'var(--transition)'
              }}
            >
              <ShoppingBag size={18} />
              Checkout Now
            </button>
          </motion.div>
        )}

        {/* STATE-OF-THE-ART SLIDE-UP CHECKOUT MODAL DRAWER */}
        <AnimatePresence>
          {isCheckoutOpen && (
            <div style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}>
              {/* Dimmed backdrop click to exit */}
              <div 
                style={{ position: 'absolute', inset: 0 }} 
                onClick={() => setIsCheckoutOpen(false)}
              />
              
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '500px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderTopLeftRadius: '32px',
                  borderTopRightRadius: '32px',
                  padding: '30px 24px',
                  boxShadow: '0 -15px 40px rgba(0,0,0,0.15)',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  zIndex: 10000
                }}
              >
                {/* Header of Checkout */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)' }}>Checkout</h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Confirm details & select ordering option</p>
                  </div>
                  
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    style={{
                      background: 'rgba(0,0,0,0.05)',
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Items Summary list */}
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Order Items</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                    {itemsInCart.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                        <div style={{ color: 'var(--accent)' }}>
                          <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{cart[item.id]}x</span> {item.name}
                        </div>
                        <span style={{ fontWeight: '600' }}>{(item.price * cart[item.id]).toLocaleString()} UGX</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', borderTop: '1px dashed rgba(0,0,0,0.1)', paddingTop: '12px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Subtotal:</span>
                    <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>{total.toLocaleString()} UGX</span>
                  </div>
                </div>

                {/* Delivery Office Info */}
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: '28px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: '700', textTransform: 'uppercase' }}>Delivery Location</span>
                    <button 
                      onClick={() => {
                        setIsCheckoutOpen(false)
                        onNavigate('account')
                      }}
                      style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}
                    >
                      Edit Info
                    </button>
                  </div>

                  {deliveryProfile.name ? (
                    <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--accent)' }}>{deliveryProfile.name}</div>
                      <div style={{ opacity: 0.8 }}>{deliveryProfile.building}, Floor ${deliveryProfile.floor}, Room/Shop ${deliveryProfile.officeNumber}</div>
                      {deliveryProfile.phone && <div style={{ opacity: 0.6 }}>Phone: {deliveryProfile.phone}</div>}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                      <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '8px' }}>No address profile found</p>
                      <button 
                        onClick={() => {
                          setIsCheckoutOpen(false)
                          onNavigate('account')
                        }}
                        style={{
                          background: 'rgba(255, 94, 58, 0.1)',
                          color: 'var(--primary)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '700'
                        }}
                      >
                        Set Delivery Address Now
                      </button>
                    </div>
                  )}
                </div>

                {/* Double checkout WhatsApp and Call buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    onClick={handleWhatsAppOrder}
                    disabled={!deliveryProfile.name}
                    style={{
                      background: '#2ecc71',
                      color: 'white',
                      width: '100%',
                      padding: '16px',
                      borderRadius: '16px',
                      fontWeight: '800',
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 20px rgba(46, 204, 113, 0.25)',
                      opacity: deliveryProfile.name ? 1 : 0.6,
                      cursor: deliveryProfile.name ? 'pointer' : 'not-allowed',
                      transition: 'var(--transition)'
                    }}
                  >
                    <MessageSquare size={22} />
                    Order via WhatsApp
                  </button>

                  <button 
                    onClick={handleCallOrder}
                    style={{
                      background: 'var(--accent)',
                      color: 'white',
                      width: '100%',
                      padding: '16px',
                      borderRadius: '16px',
                      fontWeight: '800',
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      transition: 'var(--transition)'
                    }}
                  >
                    <PhoneCall size={22} />
                    Call +256702370441 to Order
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
