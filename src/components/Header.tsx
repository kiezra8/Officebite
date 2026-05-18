import { useState } from 'react'
import { UtensilsCrossed, ChevronDown, User, Coffee, Utensils } from 'lucide-react'

interface HeaderProps {
  currentView: 'home' | 'breakfast' | 'lunch' | 'meals' | 'account'
  onNavigate: (view: 'home' | 'breakfast' | 'lunch' | 'meals' | 'account') => void
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      padding: '14px 0',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* LOGO */}
        <div 
          onClick={() => {
            onNavigate('home')
            setDropdownOpen(false)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1.4rem',
            fontWeight: '800',
            color: 'var(--primary)',
            cursor: 'pointer'
          }}
        >
          <UtensilsCrossed size={26} style={{ strokeWidth: 2.5 }} />
          <span style={{ letterSpacing: '-0.5px' }}>Office<span style={{ color: 'var(--accent)' }}>bite</span></span>
        </div>
        
        {/* DESKTOP NAVIGATION BAR (Hidden on small screens via standard CSS if needed, styled beautifully here) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }} className="desktop-nav">
          
          {/* HOME LINK */}
          <button 
            onClick={() => {
              onNavigate('home')
              setDropdownOpen(false)
            }}
            style={{
              fontSize: '0.95rem',
              fontWeight: currentView === 'home' ? '700' : '500',
              color: currentView === 'home' ? 'var(--primary)' : 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: currentView === 'home' ? 'rgba(255, 94, 58, 0.05)' : 'transparent',
              transition: 'var(--transition)'
            }}
          >
            Home
          </button>

          {/* CATEGORIES DROPDOWN */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                fontSize: '0.95rem',
                fontWeight: (currentView === 'breakfast' || currentView === 'lunch') ? '700' : '500',
                color: (currentView === 'breakfast' || currentView === 'lunch') ? 'var(--primary)' : 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: (currentView === 'breakfast' || currentView === 'lunch') ? 'rgba(255, 94, 58, 0.05)' : 'transparent',
                transition: 'var(--transition)'
              }}
            >
              Categories
              <ChevronDown size={14} style={{ 
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </button>

            {/* Dropdown Menu List */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.05)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '170px',
                zIndex: 10000,
                marginTop: '6px'
              }}>
                <button
                  onClick={() => {
                    onNavigate('breakfast')
                    setDropdownOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: currentView === 'breakfast' ? '700' : '500',
                    color: currentView === 'breakfast' ? 'var(--primary)' : 'var(--accent)',
                    background: currentView === 'breakfast' ? 'rgba(255, 94, 58, 0.05)' : 'transparent',
                    transition: 'var(--transition)'
                  }}
                >
                  <Coffee size={16} />
                  Breakfast Menu
                </button>
                <button
                  onClick={() => {
                    onNavigate('lunch')
                    setDropdownOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: currentView === 'lunch' ? '700' : '500',
                    color: currentView === 'lunch' ? 'var(--primary)' : 'var(--accent)',
                    background: currentView === 'lunch' ? 'rgba(255, 94, 58, 0.05)' : 'transparent',
                    transition: 'var(--transition)'
                  }}
                >
                  <Utensils size={16} />
                  Lunch Menu
                </button>
              </div>
            )}
          </div>

          {/* MEALS LINK */}
          <button 
            onClick={() => {
              onNavigate('meals')
              setDropdownOpen(false)
            }}
            style={{
              fontSize: '0.95rem',
              fontWeight: currentView === 'meals' ? '700' : '500',
              color: currentView === 'meals' ? 'var(--primary)' : 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: currentView === 'meals' ? 'rgba(255, 94, 58, 0.05)' : 'transparent',
              transition: 'var(--transition)'
            }}
          >
            All Meals
          </button>

          {/* ACCOUNT LINK */}
          <button 
            onClick={() => {
              onNavigate('account')
              setDropdownOpen(false)
            }}
            style={{
              fontSize: '0.95rem',
              fontWeight: currentView === 'account' ? '700' : '500',
              color: currentView === 'account' ? 'var(--primary)' : 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: currentView === 'account' ? 'rgba(255, 94, 58, 0.05)' : 'transparent',
              transition: 'var(--transition)'
            }}
          >
            <User size={16} />
            Account
          </button>
          
          {/* QUICK ORDER BUTTON */}
          <button 
            onClick={() => {
              onNavigate('meals')
              setDropdownOpen(false)
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.9rem',
              boxShadow: '0 6px 15px rgba(255, 94, 58, 0.25)',
              transition: 'var(--transition)'
            }}
          >
            Order Now
          </button>
        </nav>
      </div>
    </header>
  )
}
