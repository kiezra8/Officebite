import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryCards from './components/CategoryCards'
import MenuPage from './components/MenuPage'
import AccountPage from './components/AccountPage'
import { AnimatePresence } from 'framer-motion'
import { Home, Coffee, Utensils, Search, User } from 'lucide-react'

export type View = 'home' | 'breakfast' | 'lunch' | 'meals' | 'account'

function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  
  // Hoisted global cart state so items persist across tab navigation
  const [cart, setCart] = useState<Record<string, number>>({})

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      return { ...prev, [id]: next }
    })
  }

  const clearCart = () => {
    setCart({})
  }

  // Calculate cart counts for badges in the navigation bars
  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Premium Desktop Header Nav */}
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      {/* Main content body with smooth conditional rendering */}
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <div key="home">
              <Hero />
              <CategoryCards onSelect={handleNavigate} />
            </div>
          )}

          {currentView === 'breakfast' && (
            <MenuPage 
              key="breakfast" 
              type="breakfast" 
              onBack={() => handleNavigate('home')} 
              cart={cart}
              updateQuantity={updateQuantity}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'lunch' && (
            <MenuPage 
              key="lunch" 
              type="lunch" 
              onBack={() => handleNavigate('home')} 
              cart={cart}
              updateQuantity={updateQuantity}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'meals' && (
            <MenuPage 
              key="meals" 
              type="meals" 
              onBack={() => handleNavigate('home')} 
              cart={cart}
              updateQuantity={updateQuantity}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'account' && (
            <AccountPage 
              key="account" 
              onNavigate={handleNavigate} 
            />
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer style={{ 
        padding: '30px 20px 80px 20px', 
        textAlign: 'center', 
        opacity: 0.5, 
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(0,0,0,0.03)' 
      }}>
        <p>&copy; 2026 Officebite Kampala. All rights reserved.</p>
        <p style={{ marginTop: '4px', fontSize: '0.75rem' }}>Kampala's premier corridor & shop food delivery network.</p>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* Styled to display only on mobile viewports via index.css */}
      <div 
        className="mobile-bottom-nav" 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '68px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          display: 'none', // Overridden by media query in index.css
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          padding: '4px 8px',
          boxShadow: '0 -5px 25px rgba(0,0,0,0.04)'
        }}
      >
        {/* Home Tab */}
        <button 
          onClick={() => handleNavigate('home')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: currentView === 'home' ? 'var(--primary)' : 'var(--accent)',
            opacity: currentView === 'home' ? 1 : 0.6,
            transition: 'var(--transition)'
          }}
        >
          <Home size={20} style={{ strokeWidth: currentView === 'home' ? 2.5 : 2 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: currentView === 'home' ? '800' : '500' }}>Home</span>
        </button>

        {/* Breakfast Tab */}
        <button 
          onClick={() => handleNavigate('breakfast')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: currentView === 'breakfast' ? 'var(--primary)' : 'var(--accent)',
            opacity: currentView === 'breakfast' ? 1 : 0.6,
            transition: 'var(--transition)'
          }}
        >
          <Coffee size={20} style={{ strokeWidth: currentView === 'breakfast' ? 2.5 : 2 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: currentView === 'breakfast' ? '800' : '500' }}>Breakfast</span>
        </button>

        {/* Lunch Tab */}
        <button 
          onClick={() => handleNavigate('lunch')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: currentView === 'lunch' ? 'var(--primary)' : 'var(--accent)',
            opacity: currentView === 'lunch' ? 1 : 0.6,
            transition: 'var(--transition)'
          }}
        >
          <Utensils size={20} style={{ strokeWidth: currentView === 'lunch' ? 2.5 : 2 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: currentView === 'lunch' ? '800' : '500' }}>Lunch</span>
        </button>

        {/* Meals (Menu Search) Tab */}
        <button 
          onClick={() => handleNavigate('meals')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: currentView === 'meals' ? 'var(--primary)' : 'var(--accent)',
            opacity: currentView === 'meals' ? 1 : 0.6,
            position: 'relative',
            transition: 'var(--transition)'
          }}
        >
          <Search size={20} style={{ strokeWidth: currentView === 'meals' ? 2.5 : 2 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: currentView === 'meals' ? '800' : '500' }}>Meals</span>
          
          {totalCartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '2px',
              background: 'var(--primary)',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: '800',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(255, 94, 58, 0.3)'
            }}>
              {totalCartCount}
            </span>
          )}
        </button>

        {/* Account Tab */}
        <button 
          onClick={() => handleNavigate('account')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: currentView === 'account' ? 'var(--primary)' : 'var(--accent)',
            opacity: currentView === 'account' ? 1 : 0.6,
            transition: 'var(--transition)'
          }}
        >
          <User size={20} style={{ strokeWidth: currentView === 'account' ? 2.5 : 2 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: currentView === 'account' ? '800' : '500' }}>Account</span>
        </button>

      </div>
    </div>
  )
}

export default App
