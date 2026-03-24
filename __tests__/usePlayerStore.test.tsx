import { renderHook, act } from '@testing-library/react'
import { usePlayerStore } from '@/hooks/usePlayerStore'

// In-memory localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
})

describe('usePlayerStore', () => {
  it('starts with an empty players array', () => {
    const { result } = renderHook(() => usePlayerStore())
    expect(result.current.players).toEqual([])
  })

  it('addPlayer adds a player to the list', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
    })
    expect(result.current.players).toHaveLength(1)
    expect(result.current.players[0].name).toBe('Player 1')
  })

  it('addPlayer twice creates two players', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
      result.current.addPlayer()
    })
    expect(result.current.players).toHaveLength(2)
  })

  it('deletePlayer removes the correct player', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
      result.current.addPlayer()
    })
    const idToRemove = result.current.players[0].id
    act(() => {
      result.current.deletePlayer(idToRemove)
    })
    expect(result.current.players).toHaveLength(1)
    expect(result.current.players[0].id).not.toBe(idToRemove)
  })

  it('renamePlayer updates the player name', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
    })
    const id = result.current.players[0].id
    act(() => {
      result.current.renamePlayer(id, 'Alice')
    })
    expect(result.current.players[0].name).toBe('Alice')
  })

  it('updateColor updates the player color', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
    })
    const id = result.current.players[0].id
    act(() => {
      result.current.updateColor(id, 'blue')
    })
    expect(result.current.players[0].color).toBe('blue')
  })

  it('toggleSelected flips the selected state', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
    })
    const id = result.current.players[0].id
    const initialSelected = result.current.players[0].selected
    act(() => {
      result.current.toggleSelected(id)
    })
    expect(result.current.players[0].selected).toBe(!initialSelected)
  })

  it('selectedPlayers returns only selected players', () => {
    const { result } = renderHook(() => usePlayerStore())
    act(() => {
      result.current.addPlayer()
      result.current.addPlayer()
    })
    const id = result.current.players[0].id
    // Deselect first player
    act(() => {
      result.current.toggleSelected(id)
    })
    expect(result.current.selectedPlayers).toHaveLength(1)
    expect(result.current.selectedPlayers[0].id).not.toBe(id)
  })

  it('restores state from localStorage on remount', async () => {
    const { result: first, unmount } = renderHook(() => usePlayerStore())
    act(() => {
      first.current.addPlayer()
    })
    // Wait for hydration effect to write to localStorage
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    unmount()

    // New hook instance reads from localStorage
    const { result: second } = renderHook(() => usePlayerStore())
    // Wait for hydration
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    expect(second.current.players).toHaveLength(1)
    expect(second.current.players[0].name).toBe('Player 1')
  })
})
