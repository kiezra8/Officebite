import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Phone, History, Save, CheckCircle, Award } from 'lucide-react'

export interface UserProfile {
  name: string
  phone: string
  building: string
  floor: string
  officeNumber: string
  instructions: string
}

interface AccountPageProps {
  onNavigate: (view: 'home' | 'breakfast' | 'lunch' | 'meals' | 'account') => void
}

export default function AccountPage({ onNavigate: _onNavigate }: AccountPageProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    phone: '',
    building: '',
    floor: '',
    officeNumber: '',
    instructions: ''
  })
  const [isSaved, setIsSaved] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('officebite_profile')
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile))
      } catch (e) {
        console.error('Failed to parse profile', e)
      }
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('officebite_profile', JSON.stringify(profile))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  // Mock order history
  const pastOrders = [
    {
      id: 'OB-9821',
      date: 'Today, 1:15 PM',
      items: '1x Pilau Beef, 1x African Tea',
      total: 7500,
      status: 'Delivered',
      color: '#2ecc71'
    },
    {
      id: 'OB-9514',
      date: '15th May 2026',
      items: '2x Rolex, 2x Mandazi',
      total: 8000,
      status: 'Delivered',
      color: '#2ecc71'
    },
    {
      id: 'OB-9201',
      date: '12th May 2026',
      items: '1x Stew with Meat, 1x Samosas',
      total: 5000,
      status: 'Delivered',
      color: '#2ecc71'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      padding: '0 20px 40px',
      position: 'relative',
      background: '#0d1117',
      backgroundImage: 'linear-gradient(rgba(13,17,23,0.82), rgba(13,17,23,0.94)), url(https://i.pinimg.com/736x/b2/86/84/b28684319e013b4b20b7d194fbbf345f.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="container" style={{ maxWidth: '800px', paddingTop: '28px' }}>
        
        {/* Profile Header */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          borderRadius: '30px',
          padding: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 20px rgba(255, 94, 58, 0.3)'
          }}>
            <User size={36} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '4px' }}>
              {profile.name || 'Office Feeder'}
            </h2>
            <p style={{ color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} />
              Officebite Gold Member
            </p>
          </div>
          
          <div style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.07)',
            padding: '10px 20px',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', textTransform: 'uppercase' }}>Points Earned</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent)' }}>450 pts</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {/* Delivery Details Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              borderRadius: '28px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              height: 'fit-content'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={22} style={{ color: 'var(--primary)' }} />
              Delivery Office Info
            </h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--accent)', opacity: 0.8 }}>Your Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  placeholder="e.g. Jolly Mukasa" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: 'rgba(255,255,255,0.8)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--accent)', opacity: 0.8 }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '14px', top: '15px', opacity: 0.4 }} />
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={e => setProfile({...profile, phone: e.target.value})}
                    placeholder="e.g. +256 702 370441" 
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      background: 'rgba(255,255,255,0.8)',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--accent)', opacity: 0.8 }}>Building Name</label>
                  <input 
                    type="text" 
                    value={profile.building}
                    onChange={e => setProfile({...profile, building: e.target.value})}
                    placeholder="e.g. Mapeera House" 
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      background: 'rgba(255,255,255,0.8)',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--accent)', opacity: 0.8 }}>Floor Level</label>
                  <input 
                    type="text" 
                    value={profile.floor}
                    onChange={e => setProfile({...profile, floor: e.target.value})}
                    placeholder="e.g. 3rd Floor" 
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      background: 'rgba(255,255,255,0.8)',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--accent)', opacity: 0.8 }}>Office / Shop / Corridor Number</label>
                <input 
                  type="text" 
                  value={profile.officeNumber}
                  onChange={e => setProfile({...profile, officeNumber: e.target.value})}
                  placeholder="e.g. Room 4B / Shop 12" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: 'rgba(255,255,255,0.8)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--accent)', opacity: 0.8 }}>Delivery Notes</label>
                <textarea 
                  value={profile.instructions}
                  onChange={e => setProfile({...profile, instructions: e.target.value})}
                  placeholder="e.g. Call upon arrival or leave at front desk" 
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: 'rgba(255,255,255,0.8)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    resize: 'none'
                  }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  background: isSaved ? '#2ecc71' : 'var(--primary)',
                  color: 'white',
                  padding: '14px',
                  borderRadius: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 15px rgba(255, 94, 58, 0.2)',
                  transition: 'var(--transition)',
                  marginTop: '10px'
                }}
              >
                {isSaved ? (
                  <>
                    <CheckCircle size={20} />
                    Details Saved Flawlessly!
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Delivery Details
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              borderRadius: '28px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <History size={22} style={{ color: 'var(--primary)' }} />
              Recent Orders
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pastOrders.map(order => (
                <div 
                  key={order.id}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: 'var(--accent)', fontSize: '0.95rem' }}>{order.id}</span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      background: 'rgba(46, 204, 113, 0.15)', 
                      color: order.color, 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontWeight: '800' 
                    }}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, color: 'var(--accent)' }}>
                    {order.items}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{order.date}</span>
                    <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{order.total.toLocaleString()} UGX</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(255, 94, 58, 0.05), rgba(255, 180, 0, 0.05))',
              borderRadius: '16px',
              textAlign: 'center',
              border: '1px dashed rgba(255, 94, 58, 0.2)'
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600' }}>
                Need help with an order?
              </p>
              <button 
                onClick={() => window.open('https://wa.me/256702370441', '_blank')}
                style={{
                  marginTop: '8px',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  textDecoration: 'underline'
                }}
              >
                Chat with Kampala Support
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
