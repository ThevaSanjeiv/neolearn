import { useState } from 'react'
import { RotateCcw, Heart, Trash2 } from 'lucide-react'

interface FlashcardData {
  id: string
  question: string
  answer: string
  saved?: boolean
}

interface FlashcardProps {
  card: FlashcardData
  onSave?: (cardId: string) => void
  onDelete?: (cardId: string) => void
  showActions?: boolean
}

export default function Flashcard({ card, onSave, onDelete, showActions = true }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="relative group">
      <div 
        className="relative w-full h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col justify-center items-center shadow-sm">
              <div className="text-sm text-muted-foreground mb-2">Question</div>
              <p className="text-center text-lg font-medium">{card.question}</p>
              <div className="absolute bottom-4 right-4">
                <RotateCcw size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 h-full flex flex-col justify-center items-center shadow-sm">
              <div className="text-sm text-muted-foreground mb-2">Answer</div>
              <p className="text-center text-lg font-medium">{card.answer}</p>
              <div className="absolute bottom-4 right-4">
                <RotateCcw size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onSave && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSave(card.id)
              }}
              className={`p-2 rounded-md transition-colors ${
                card.saved 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400' 
                  : 'bg-white/80 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Heart size={16} className={card.saved ? 'fill-current' : ''} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(card.id)
              }}
              className="p-2 rounded-md bg-white/80 text-muted-foreground hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}