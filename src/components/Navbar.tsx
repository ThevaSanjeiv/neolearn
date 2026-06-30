import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, User, Menu, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'StudyBuddy', path: '/chatbot' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Flashcards', path: '/flashcards' },
    { name: 'Progress', path: '/progress' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NeoLearn
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent/10 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link
              to="/profile"
              className="p-2 rounded-md hover:bg-accent/10 transition-colors"
              aria-label="Profile"
            >
              <User size={20} />
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent/10 transition-colors"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
