import { UtensilsCrossed } from 'lucide-react'

interface HeaderProps {
  onHome: () => void
}

export default function Header({ onHome }: HeaderProps) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '16px 0',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div 
          onClick={onHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--primary)',
            cursor: 'pointer'
          }}
        >
          <UtensilsCrossed size={28} />
          <span>Officebite</span>
        </div>
        
        <nav>
          <button style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'var(--primary)',
            color: 'white',
            fontWeight: '600'
          }}>
            Order Now
          </button>
        </nav>
      </div>
    </header>
  )
}
