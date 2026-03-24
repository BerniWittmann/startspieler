'use client'

import { type TmColor, TM_COLORS, TM_COLOR_KEYS } from '@/lib/randomPicker'

interface TmColorPickerProps {
  value: TmColor
  onChange: (color: TmColor) => void
}

export function TmColorPicker({ value, onChange }: TmColorPickerProps) {
  return (
    <div className="flex gap-2 items-center">
      {TM_COLOR_KEYS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          title={color}
          className="w-7 h-7 rounded-full transition-all duration-150 hover:scale-110 focus:outline-none"
          style={{
            backgroundColor: TM_COLORS[color],
            boxShadow:
              value === color
                ? '0 0 0 2px #fff, 0 0 0 4px ' + TM_COLORS[color]
                : '0 1px 3px rgba(0,0,0,0.4)',
          }}
          aria-pressed={value === color ? 'true' : 'false'}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  )
}
