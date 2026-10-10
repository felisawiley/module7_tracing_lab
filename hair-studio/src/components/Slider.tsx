import { useCallback, useRef, useState, useEffect } from 'react'
import './Slider.css'

interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  leftLabel?: string
  rightLabel?: string
  showValue?: boolean
  valueSuffix?: string
  gradient?: string
}

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  leftLabel,
  rightLabel,
  showValue = false,
  valueSuffix = '',
  gradient,
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((value - min) / (max - min)) * 100

  const handleInteraction = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      const newValue = Math.round((min + percentage * (max - min)) / step) * step
      onChange(Math.max(min, Math.min(max, newValue)))
    },
    [min, max, step, onChange]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      handleInteraction(e.clientX)
    },
    [handleInteraction]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true)
      handleInteraction(e.touches[0].clientX)
    },
    [handleInteraction]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      handleInteraction(e.touches[0].clientX)
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleInteraction])

  return (
    <div className={`slider-container ${isDragging ? 'dragging' : ''}`}>
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        {showValue && (
          <span className="slider-value">
            {Math.round(value)}{valueSuffix}
          </span>
        )}
      </div>
      
      <div
        ref={sliderRef}
        className="slider-track-wrapper"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className="slider-track"
          style={gradient ? { background: gradient } : undefined}
        >
          <div
            className="slider-fill"
            style={{ 
              width: `${percentage}%`,
              display: gradient ? 'none' : 'block'
            }}
          />
        </div>
        
        <div
          className="slider-thumb"
          style={{ left: `${percentage}%` }}
        >
          <div className="thumb-inner" />
        </div>
      </div>

      {(leftLabel || rightLabel) && (
        <div className="slider-labels">
          {leftLabel && <span className="edge-label">{leftLabel}</span>}
          {rightLabel && <span className="edge-label">{rightLabel}</span>}
        </div>
      )}
    </div>
  )
}
