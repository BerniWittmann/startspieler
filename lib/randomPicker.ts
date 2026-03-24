export type TmColor = 'red' | 'green' | 'blue' | 'yellow' | 'black'

export const TM_COLORS: Record<TmColor, string> = {
  red: '#c0392b',
  green: '#27ae60',
  blue: '#2980b9',
  yellow: '#f39c12',
  black: '#5a5a5a',
}

export const TM_COLOR_KEYS: TmColor[] = ['red', 'green', 'blue', 'yellow', 'black']

export type Player = {
  id: string
  name: string
  color: TmColor
  selected: boolean
}

export function pickRandom(players: Player[]): Player {
  if (players.length === 0) throw new Error('Cannot pick from empty array')
  return players[Math.floor(Math.random() * players.length)]
}
