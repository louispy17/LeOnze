import { useState } from 'react'

export default function Stars({ value, onChange, disabled, size = 18 }) {
  const [hovered, setHovered] = useState(null)
  const display = hovered ?? value ?? 0
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          onMouseEnter={() => !disabled && setHovered(n)}
          onMouseLeave={() => !disabled && setHovered(null)}
          onClick={() => !disabled && onChange?.(n)}
          style={{
            cursor: disabled ? 'default' : 'pointer',
            fontSize: size,
            lineHeight: 1,
            color: n <= display ? '#f59e0b' : '#374151',
            userSelect: 'none'
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
