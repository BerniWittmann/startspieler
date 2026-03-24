'use client'

import { type Player, TM_COLORS } from '@/lib/randomPicker'

interface PlayerCardProps {
  player: Player
  flipped: boolean
  isWinner: boolean
}

export function PlayerCard({ player, flipped, isWinner }: PlayerCardProps) {
  const colorName = player.color.toUpperCase()

  return (
    <div className="card-scene">
      <div className={`card-inner${flipped ? ' card-flipped' : ''}`}>
        {/* Back — classified */}
        <div className="card-face card-back">
          <div className="absolute inset-0 card-texture opacity-20" />
          {/* Corner decorators */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-primary/50" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-primary/50" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-primary/50" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-primary/50" />
          {/* TOP SECRET diagonal banner */}
          <div className="absolute top-8 -right-12 bg-error text-on-error font-label text-[8px] px-14 py-0.5 rotate-45 font-bold z-10 tracking-widest">
            TOP SECRET
          </div>
          {/* Content */}
          <div className="z-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center bg-background/50">
              <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}
                >
                  rocket_launch
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant mb-1">
                Status
              </p>
              <p className="font-headline text-lg font-bold text-on-surface tracking-wider">
                CLASSIFIED
              </p>
            </div>
          </div>
        </div>

        {/* Front — winner */}
        <div className={`card-face card-front${isWinner ? ' card-winner' : ''}`}>
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #48dcc3 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          {/* Corner decorators */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-secondary" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-secondary" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-secondary" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-secondary" />

          <div className="z-10 flex flex-col items-center w-full gap-3">
            {/* Avatar — ring sits inside a sized container so it doesn't collapse layout */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-secondary p-1">
                <div className="w-full h-full rounded-full bg-secondary/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1", color: TM_COLORS[player.color] }}
                  >
                    person
                  </span>
                </div>
              </div>
              {/* Rotating ring fills the w-20 h-20 container */}
              <div
                className="absolute inset-0 border border-secondary/40 border-dashed rounded-full animate-spin"
                style={{ animationDuration: '10s' }}
              />
            </div>

            {/* Name */}
            <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight text-center leading-tight">
              {player.name}
            </h2>

            {/* Color badge */}
            <div className="flex items-center gap-2 bg-secondary/10 px-4 py-1.5 border border-secondary/30">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: TM_COLORS[player.color],
                  boxShadow: `0 0 8px ${TM_COLORS[player.color]}`,
                }}
              />
              <span className="font-label text-[9px] font-bold text-secondary tracking-widest">
                COLOR: {colorName}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-0.5 bg-surface-container-highest">
              <div className="h-full bg-secondary w-full" />
            </div>
            <p className="font-label text-[8px] opacity-40 uppercase tracking-[0.2em] text-center">
              Identity Verified // Priority Alpha
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
