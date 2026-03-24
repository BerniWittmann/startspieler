'use client'

import { useState, useEffect } from 'react'
import { type Player, type TmColor, TM_COLOR_KEYS } from '@/lib/randomPicker'

const STORAGE_KEY = 'startspieler_players'

function getUsedColors(players: Player[]): TmColor[] {
  return players.map((p) => p.color)
}

function getFirstAvailableColor(players: Player[]): TmColor {
  const used = getUsedColors(players)
  return TM_COLOR_KEYS.find((c) => !used.includes(c)) ?? TM_COLOR_KEYS[players.length % TM_COLOR_KEYS.length]
}

export function usePlayerStore() {
  const [players, setPlayers] = useState<Player[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPlayers(JSON.parse(stored) as Player[])
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true)
  }, [])

  // Persist to localStorage whenever players change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
    } catch {
      // ignore storage errors
    }
  }, [players, hydrated])

  function addPlayer() {
    setPlayers((prev) => {
      const n = prev.length + 1
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: `Player ${n}`,
        color: getFirstAvailableColor(prev),
        selected: true,
      }
      return [...prev, newPlayer]
    })
  }

  function deletePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
  }

  function renamePlayer(id: string, name: string) {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  function updateColor(id: string, color: TmColor) {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, color } : p)))
  }

  function toggleSelected(id: string) {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)))
  }

  const selectedPlayers = players.filter((p) => p.selected)

  return {
    players,
    addPlayer,
    deletePlayer,
    renamePlayer,
    updateColor,
    toggleSelected,
    selectedPlayers,
  }
}
