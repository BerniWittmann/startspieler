'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePlayerStore } from '@/hooks/usePlayerStore'
import { pickRandom } from '@/lib/randomPicker'
import { CardFlipReveal } from '@/components/CardFlipReveal'
import type { Player } from '@/lib/randomPicker'

export default function HomePage() {
  const { selectedPlayers } = usePlayerStore()
  const [winner, setWinner] = useState<Player | null>(null)

  function handlePick() {
    // Reset first so animation replays if already showing a winner
    setWinner(null)
    // Use setTimeout to allow state reset to propagate before setting new winner
    setTimeout(() => {
      setWinner(pickRandom(selectedPlayers))
    }, 50)
  }

  const canPick = selectedPlayers.length >= 2

  return (
    <main className="flex flex-col items-center min-h-dvh px-4 py-8 relative">
      {/* Settings link */}
      <div className="absolute top-4 right-4">
        <Link
          href="/settings"
          aria-label="Settings"
          className="text-amber-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </Link>
      </div>

      {/* Title */}
      <h1
        className="font-cinzel text-4xl md:text-5xl font-bold text-amber-200 tracking-widest mt-8 mb-2 text-center"
        style={{ textShadow: '0 2px 12px rgba(196, 81, 10, 0.6)' }}
      >
        Startspieler
      </h1>
      <p className="text-amber-400/70 text-sm tracking-widest mb-8 text-center uppercase">
        Terraforming Mars
      </p>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        {selectedPlayers.length === 0 ? (
          <div className="text-center py-16 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="mx-auto opacity-40 mb-4"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="30" fill="#c0392b" />
              <circle cx="22" cy="24" r="5" fill="#a93226" opacity="0.7" />
              <circle cx="42" cy="38" r="4" fill="#a93226" opacity="0.6" />
              <circle cx="32" cy="44" r="4" fill="#a93226" opacity="0.5" />
            </svg>
            <p className="text-amber-200/60 text-lg">
              Add players in{' '}
              <Link href="/settings" className="text-amber-400 underline hover:text-amber-200">
                Settings
              </Link>{' '}
              to begin
            </p>
          </div>
        ) : (
          <CardFlipReveal players={selectedPlayers} winner={winner} />
        )}
      </div>

      {/* Pick button */}
      <div className="w-full max-w-sm px-4 pb-8">
        <button
          onClick={handlePick}
          disabled={!canPick}
          className="w-full py-4 rounded-xl font-semibold text-lg tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: canPick ? '#c4510a' : '#7a3d1a',
            color: '#fff',
            boxShadow: canPick ? '0 4px 20px rgba(196, 81, 10, 0.5)' : 'none',
          }}
        >
          Pick Starting Player
        </button>
        {selectedPlayers.length === 1 && (
          <p className="text-amber-400/60 text-sm text-center mt-2">
            Need at least 2 selected players
          </p>
        )}
      </div>
    </main>
  )
}
