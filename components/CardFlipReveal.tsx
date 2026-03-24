'use client'

import { useState, useEffect } from 'react'
import { type Player } from '@/lib/randomPicker'
import { PlayerCard } from './PlayerCard'

// A placeholder player for the face-down state (data is never shown)
const PLACEHOLDER: Player = { id: '__placeholder__', name: '', color: 'red', selected: true }

interface CardFlipRevealProps {
  players: Player[]
  winner: Player | null
}

export function CardFlipReveal({ winner }: CardFlipRevealProps) {
  const [flipped, setFlipped] = useState(false)
  const [displayedWinner, setDisplayedWinner] = useState<Player | null>(null)

  useEffect(() => {
    if (winner === null) {
      setFlipped(false)
      setDisplayedWinner(null)
      return
    }
    // Put the winner's data on the card before flipping so it's ready on the front face
    setDisplayedWinner(winner)
    const timer = setTimeout(() => setFlipped(true), 300)
    return () => clearTimeout(timer)
  }, [winner])

  return (
    <div className="flex justify-center items-center py-8">
      <PlayerCard
        player={displayedWinner ?? PLACEHOLDER}
        flipped={flipped}
        isWinner={flipped}
      />
    </div>
  )
}
