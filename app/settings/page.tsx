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

  return (
    <main className="flex flex-col min-h-dvh px-4 py-6 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          aria-label="Back to main screen"
          className="text-amber-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>
        <h1 className="font-cinzel text-2xl font-bold text-amber-200 tracking-widest subtitle-shadow">
          Players
        </h1>
      </div>

      {/* Player list */}
      <div className="flex flex-col gap-3 flex-1">
        {players.length === 0 && (
          <p className="text-amber-400/50 text-sm text-center py-8">
            No players yet. Add one below to get started.
          </p>
        )}

        {players.map((player) => (
          <div key={player.id} className="player-row flex flex-col gap-3 rounded-xl p-4">
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => toggleSelected(player.id)}
                aria-label={player.selected ? `Deselect ${player.name}` : `Select ${player.name}`}
                aria-pressed={player.selected ? 'true' : 'false'}
                className={`checkbox-btn${player.selected ? ' checkbox-checked' : ''} flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors`}
              >
                {player.selected && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {/* Name (editable) */}
              <div className="flex-1 min-w-0">
                {editingId === player.id ? (
                  <label className="sr-only" htmlFor={`player-name-${player.id}`}>
                    Player name
                  </label>
                ) : null}
                {editingId === player.id ? (
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
                    placeholder="Player name"
                    autoFocus
                    className="w-full bg-transparent border-b border-amber-400/60 text-amber-100 focus:outline-none focus:border-amber-400 pb-0.5"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(player.id, player.name)}
                    className="text-amber-100 font-medium text-left w-full hover:text-white transition-colors truncate"
                    title="Click to rename"
                  >
                    {player.name}
                  </button>
                )}
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => deletePlayer(player.id)}
                aria-label={`Delete ${player.name}`}
                className="flex-shrink-0 text-amber-400/50 hover:text-red-400 transition-colors p-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>

            {/* Color picker */}
            <TmColorPicker
              value={player.color}
              onChange={(color: TmColor) => updateColor(player.id, color)}
            />
          </div>
        ))}
      </div>

      {/* Add player button */}
      <div className="mt-6 pb-4">
        <button
          type="button"
          onClick={addPlayer}
          className="add-player-btn w-full py-3 rounded-xl font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Player
        </button>
      </div>
    </main>
  )
}
