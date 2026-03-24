'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePlayerStore } from '@/hooks/usePlayerStore'
import { TmColorPicker } from '@/components/TmColorPicker'
import type { TmColor } from '@/lib/randomPicker'

export default function SettingsPage() {
  const { players, addPlayer, deletePlayer, renamePlayer, updateColor, toggleSelected } =
    usePlayerStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  function startEdit(id: string, currentName: string) {
    setEditingId(id)
    setEditingName(currentName)
  }

  function commitEdit() {
    if (editingId && editingName.trim()) {
      renamePlayer(editingId, editingName.trim())
    }
    setEditingId(null)
    setEditingName('')
  }

  const selectedCount = players.filter((p) => p.selected).length

  return (
    <div className="relative flex flex-col min-h-dvh bg-background overflow-hidden">
      {/* Ambient background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Fixed header */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl">
        <div className="flex items-center gap-4 px-6 h-16">
          <Link
            href="/"
            aria-label="Back"
            className="text-primary-container hover:bg-primary-container/10 transition-colors p-2 active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline text-xl font-bold text-primary-container tracking-[0.2em] uppercase">
            STARTSPIELER
          </h1>
        </div>
        <div className="bg-outline-variant h-px opacity-20" />
      </header>

      {/* Main content */}
      <main className="pt-24 px-6 pb-10 max-w-2xl mx-auto w-full relative">
        {/* Section header */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-label text-secondary text-[10px] tracking-widest uppercase">
                System Configuration
              </span>
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight uppercase">
                MISSION PARAMETERS
              </h2>
            </div>
            <div className="text-right">
              <span className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">
                Slots Occupied
              </span>
              <p className="font-headline text-xl text-secondary font-bold">
                {selectedCount}/{players.length}
              </p>
            </div>
          </div>
          <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300"
              style={{
                width: players.length > 0 ? `${(selectedCount / players.length) * 100}%` : '0%',
              }}
            />
          </div>
        </div>

        {/* Player list */}
        <div className="space-y-4">
          {players.length === 0 && (
            <p className="text-on-surface-variant text-sm text-center py-8 font-label tracking-widest uppercase opacity-50">
              No personnel. Add below to begin.
            </p>
          )}

          {players.map((player) => (
            <div
              key={player.id}
              className={`bg-surface-container p-4 flex flex-col gap-4 border-l-2 ${
                player.selected ? 'border-secondary' : 'border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleSelected(player.id)}
                    aria-label={player.selected ? `Deselect ${player.name}` : `Select ${player.name}`}
                    aria-pressed={player.selected ? 'true' : 'false'}
                    className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-colors border ${
                      player.selected
                        ? 'border-secondary bg-secondary/20'
                        : 'border-outline-variant'
                    }`}
                  >
                    {player.selected && (
                      <span
                        className="material-symbols-outlined text-secondary"
                        style={{ fontSize: '14px', fontVariationSettings: "'wght' 600" }}
                      >
                        check
                      </span>
                    )}
                  </button>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    {editingId === player.id ? (
                      <>
                        <label className="sr-only" htmlFor={`player-name-${player.id}`}>
                          Player name
                        </label>
                        <input
                          id={`player-name-${player.id}`}
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitEdit()
                            if (e.key === 'Escape') {
                              setEditingId(null)
                              setEditingName('')
                            }
                          }}
                          autoFocus
                          className="w-full bg-transparent border-b border-secondary/60 text-on-surface font-headline font-bold text-lg focus:outline-none pb-0.5"
                        />
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(player.id, player.name)}
                        className="font-headline font-bold text-lg text-on-surface text-left w-full hover:text-primary transition-colors truncate"
                        title="Click to rename"
                      >
                        {player.name}
                      </button>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => deletePlayer(player.id)}
                  aria-label={`Delete ${player.name}`}
                  className="flex-shrink-0 text-on-surface-variant hover:text-error transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>

              {/* Color picker */}
              <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest">
                <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase">
                  Color Assignment
                </span>
                <TmColorPicker
                  value={player.color}
                  onChange={(color: TmColor) => updateColor(player.id, color)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add personnel */}
        <button
          type="button"
          onClick={addPlayer}
          className="mt-8 w-full py-4 border-2 border-dashed border-outline-variant hover:border-primary flex items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-all active:scale-[0.98] font-headline font-bold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined">person_add</span>
          ADD PERSONNEL
        </button>

        {/* Decorative telemetry */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="p-4 bg-surface-container-lowest border border-outline-variant/10">
            <span className="font-label text-[9px] text-secondary tracking-widest uppercase block mb-1">
              Datalink Status
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#48dcc3]" />
              <span className="font-headline text-xs font-medium text-on-surface uppercase">
                Synchronized
              </span>
            </div>
          </div>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant/10">
            <span className="font-label text-[9px] text-primary tracking-widest uppercase block mb-1">
              Protocol Version
            </span>
            <span className="font-headline text-xs font-medium text-on-surface uppercase">
              TH-2024.v9
            </span>
          </div>
        </div>
      </main>

    </div>
  )
}
