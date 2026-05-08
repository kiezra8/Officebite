import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryCards from './components/CategoryCards'
import MenuPage from './components/MenuPage'
import { AnimatePresence } from 'framer-motion'

export type View = 'home' | 'breakfast' | 'lunch'

function App() {
  const [currentView, setCurrentView] = useState<View>('home')

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Header onHome={() => setCurrentView('home')} />
      <main>
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <div key="home">
              <Hero />
              <CategoryCards onSelect={handleNavigate} />
            </div>
          ) : (
            <MenuPage 
              key={currentView} 
              type={currentView} 
              onBack={() => setCurrentView('home')} 
            />
          )}
        </AnimatePresence>
      </main>
      
      <footer style={{ padding: '40px 20px', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
        <p>&copy; 2026 Officebite Kampala. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
