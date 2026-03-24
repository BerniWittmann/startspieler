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
    setWinner(null)
    setTimeout(() => {
      setWinner(pickRandom(selectedPlayers))
    }, 50)
  }

  function handleReset() {
    setWinner(null)
  }

  const canPick = selectedPlayers.length >= 2

  return (
    <div className="relative flex flex-col min-h-dvh bg-background overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 hud-scanline pointer-events-none opacity-50" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Fixed header */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 h-16">
          <button
            className="text-primary-container hover:bg-primary-container/10 transition-colors p-2 active:scale-95 duration-150"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <h1 className="font-headline text-xl font-bold text-primary-container tracking-[0.2em] uppercase">
            STARTSPIELER
          </h1>
          <Link
            href="/settings"
            aria-label="Settings"
            className="text-primary-container hover:bg-primary-container/10 transition-colors p-2 active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
        <div className="bg-outline-variant h-px opacity-20" />
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-10 relative">
        {/* Status HUD */}
        <div className="w-full max-w-sm mb-8 flex justify-between items-end border-l-2 border-secondary/30 pl-4">
          <div>
            <p className="font-label text-[10px] tracking-widest text-secondary uppercase opacity-70">
              Selection Protocol
            </p>
            <p className="font-headline text-lg font-bold text-on-surface">
              {winner ? 'PROTOCOL COMPLETE' : 'STAND BY'}
            </p>
          </div>
          {winner && (
            <div className="text-right">
              <p className="font-label text-[10px] tracking-widest text-primary uppercase opacity-70">
                Starting Player
              </p>
              <p className="font-headline text-xs text-primary/80 uppercase tracking-wide">
                {winner.name}
              </p>
            </div>
          )}
        </div>

        {/* Card area */}
        {selectedPlayers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border border-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-secondary/50 text-3xl">group</span>
            </div>
            <p className="text-on-surface-variant text-sm font-label tracking-widest uppercase opacity-60 mb-2">
              No players configured
            </p>
            <Link href="/settings" className="text-secondary text-sm underline">
              Configure players
            </Link>
          </div>
        ) : (
          <CardFlipReveal players={selectedPlayers} winner={winner} />
        )}

        {/* CTA button */}
        <div className="w-full max-w-sm mt-8">
          {winner ? (
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-surface-container-high text-on-surface font-headline font-bold text-base py-4 rounded-sm tracking-widest uppercase transition-all active:scale-[0.98] border border-outline-variant/30 flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-xl">refresh</span>
              RESET PROTOCOL
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePick}
              disabled={!canPick}
              className="w-full bg-primary-container hover:bg-primary text-on-primary-container font-headline font-bold text-base py-5 rounded-sm transition-all duration-300 active:scale-[0.98] shadow-[0_0_20px_rgba(206,131,57,0.3)] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none tracking-widest uppercase"
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              PICK STARTING PLAYER
            </button>
          )}
          <p className="text-center mt-3 font-label text-[10px] text-on-surface-variant tracking-widest uppercase opacity-50">
            {winner
              ? 'Terminating session'
              : selectedPlayers.length === 1
                ? 'Need at least 2 selected players'
                : 'System Ready for Allocation'}
          </p>
        </div>
      </main>

    </div>
  )
}
