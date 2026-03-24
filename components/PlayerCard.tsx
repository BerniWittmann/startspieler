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
      className="relative"
      style={{ width: '120px', height: '180px', perspective: '600px' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: '#d4a96a',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            border: '2px solid #b8894a',
          }}
        >
          {/* Decorative corner borders */}
          <div className="absolute inset-2 rounded-lg border border-amber-800 opacity-50 pointer-events-none" />
          <div className="absolute inset-3 rounded-lg border border-amber-900 opacity-30 pointer-events-none" />
          {/* TM text */}
          <span
            className="font-bold text-2xl tracking-widest select-none"
            style={{
              color: '#7a4a1a',
              fontFamily: 'var(--font-cinzel), serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            TM
          </span>
          {/* Mars icon (simple SVG circle with craters) */}
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
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center px-2"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: TM_COLORS[player.color],
            boxShadow: isWinner
              ? `0 0 24px 6px ${TM_COLORS[player.color]}, 0 4px 16px rgba(0,0,0,0.5)`
              : '0 4px 16px rgba(0,0,0,0.5)',
            border: isWinner ? '2px solid rgba(255,255,255,0.6)' : '2px solid rgba(255,255,255,0.2)',
          }}
        >
          <div className="absolute inset-2 rounded-lg border border-white opacity-20 pointer-events-none" />
          <span
            className="text-white font-bold text-center text-sm leading-tight break-words w-full text-center select-none"
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {player.name}
          </span>
          {isWinner && (
            <span className="mt-2 text-white text-xs opacity-80 select-none">Starting Player</span>
          )}
        </div>
      </div>
    </div>
  )
}
