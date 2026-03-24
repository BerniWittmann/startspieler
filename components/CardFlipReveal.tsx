'use client'

import { useState, useEffect } from 'react'
import { type Player } from '@/lib/randomPicker'
import { PlayerCard } from './PlayerCard'

interface CardFlipRevealProps {
  players: Player[]
  winner: Player | null
}

export function CardFlipReveal({ players, winner }: CardFlipRevealProps) {
  const [flippedId, setFlippedId] = useState<string | null>(null)

  useEffect(() => {
    if (winner === null) {
      setFlippedId(null)
      return
    }
    const timer = setTimeout(() => {
      setFlippedId(winner.id)
    }, 300)
    return () => clearTimeout(timer)
  }, [winner])

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center py-4">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          flipped={flippedId === player.id}
          isWinner={player.id === winner?.id}
        />
      ))}
    </div>
  )
}
