import { pickRandom } from '@/lib/randomPicker'
import type { Player } from '@/lib/randomPicker'

function makePlayer(id: string): Player {
  return { id, name: `Player ${id}`, color: 'red', selected: true }
}

describe('pickRandom', () => {
  it('returns a member of the input array', () => {
    const players = [makePlayer('1'), makePlayer('2'), makePlayer('3')]
    const result = pickRandom(players)
    expect(players).toContain(result)
  })

  it('returns the only player when array has one element', () => {
    const player = makePlayer('solo')
    expect(pickRandom([player])).toBe(player)
  })

  it('throws when given an empty array', () => {
    expect(() => pickRandom([])).toThrow('Cannot pick from empty array')
  })

  it('always returns a member when run 100 times with multiple players', () => {
    const players = [makePlayer('a'), makePlayer('b'), makePlayer('c')]
    for (let i = 0; i < 100; i++) {
      const result = pickRandom(players)
      expect(players).toContain(result)
    }
  })
})
