'use client'

import { type Player, TM_COLORS } from '@/lib/randomPicker'

interface PlayerCardProps {
  player: Player
  flipped: boolean
  isWinner: boolean
}

export function PlayerCard({ player, flipped, isWinner }: PlayerCardProps) {
  return (
    <div
      className="card-scene"
      style={{ '--player-color': TM_COLORS[player.color] } as React.CSSProperties}
    >
      <div className={`card-inner${flipped ? ' card-flipped' : ''}`}>
        {/* Card Back */}
        <div className="card-face card-back">
          <div className="absolute inset-2 rounded-lg border border-amber-800 opacity-50 pointer-events-none" />
          <div className="absolute inset-3 rounded-lg border border-amber-900 opacity-30 pointer-events-none" />
          <span className="card-tm-text">TM</span>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="mt-2 opacity-60"
            aria-hidden="true"
          >
            <circle cx="20" cy="20" r="18" fill="#c0392b" />
            <circle cx="14" cy="15" r="3" fill="#a93226" opacity="0.7" />
            <circle cx="26" cy="24" r="2" fill="#a93226" opacity="0.6" />
            <circle cx="20" cy="28" r="2.5" fill="#a93226" opacity="0.5" />
          </svg>
        </div>

        {/* Card Front */}
        <div className={`card-face card-front${isWinner ? ' card-winner' : ''}`}>
          <div className="absolute inset-2 rounded-lg border border-white opacity-20 pointer-events-none" />
          <span className="card-player-name">{player.name}</span>
          {isWinner && (
            <span className="mt-2 text-white text-xs opacity-80 select-none">
              Starting Player
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
