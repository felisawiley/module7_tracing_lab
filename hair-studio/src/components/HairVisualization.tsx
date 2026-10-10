import { useRef, useEffect, useMemo } from 'react'
import type { HairSettings } from '../App'
import './HairVisualization.css'

interface HairVisualizationProps {
  settings: HairSettings
  uploadedImage: string | null
}

interface HairStrand {
  startX: number
  startY: number
  baseLength: number
  thickness: number
  offset: number
  layer: number
}

export default function HairVisualization({ settings, uploadedImage }: HairVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const hairColor = useMemo(() => {
    const { hue, saturation, lightness } = settings.hairColor
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }, [settings.hairColor])

  const skinColor = useMemo(() => {
    const baseHue = 25
    const baseSaturation = 60 + (100 - settings.skinTone) * 0.3
    const baseLightness = 85 - settings.skinTone * 0.65
    const ageAdjust = (settings.age - 18) / 62 * 5
    return `hsl(${baseHue}, ${baseSaturation}%, ${Math.max(20, baseLightness - ageAdjust)}%)`
  }, [settings.skinTone, settings.age])

  const lengthMultiplier = useMemo(() => {
    const minLength = 0.15
    const maxLength = 2.5
    return minLength + (settings.coilLength / 100) * (maxLength - minLength)
  }, [settings.coilLength])

  const strands = useMemo((): HairStrand[] => {
    const baseStrandCount = 180
    const densityBonus = Math.floor(settings.coilTightness * 0.8)
    const strandCount = baseStrandCount + densityBonus
    const result: HairStrand[] = []
    
    for (let i = 0; i < strandCount; i++) {
      const angle = (i / strandCount) * Math.PI + Math.PI * 0.15
      const layer = Math.floor(Math.random() * 3)
      const radiusBase = 75 + layer * 8
      const radiusVariation = Math.random() * 25
      
      result.push({
        startX: Math.cos(angle) * (radiusBase + radiusVariation),
        startY: Math.sin(angle) * (radiusBase + radiusVariation) * 0.35 - 55 - layer * 5,
        baseLength: 100 + Math.random() * 50 + layer * 20,
        thickness: 1.2 + Math.random() * 1.3 + (settings.hairType >= 3 ? 0.5 : 0),
        offset: Math.random() * Math.PI * 2,
        layer,
      })
    }
    
    return result.sort((a, b) => a.layer - b.layer)
  }, [settings.coilTightness, settings.hairType])

  useEffect(() => {
    if (uploadedImage) {
      const img = new Image()
      img.onload = () => {
        imageRef.current = img
      }
      img.src = uploadedImage
    } else {
      imageRef.current = null
    }
  }, [uploadedImage])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2 + 20

    ctx.clearRect(0, 0, width, height)

    if (uploadedImage && imageRef.current) {
      const img = imageRef.current
      const scale = Math.min(width / img.width, height / img.height) * 0.7
      const imgW = img.width * scale
      const imgH = img.height * scale
      ctx.globalAlpha = 0.3
      ctx.drawImage(img, (width - imgW) / 2, (height - imgH) / 2, imgW, imgH)
      ctx.globalAlpha = 1
    }

    const { hairType, coilTightness, coilLength } = settings
    
    const baseFrequency = hairType === 1 ? 0.008 : 
                         hairType === 2 ? 0.04 : 
                         hairType === 3 ? 0.12 : 0.25
    
    const tightnessMultiplier = 0.5 + (coilTightness / 100) * 1.5
    const frequency = baseFrequency * tightnessMultiplier
    
    const baseAmplitude = hairType === 1 ? 3 : 
                         hairType === 2 ? 12 : 
                         hairType === 3 ? 22 : 35
    
    const coilAmplitude = baseAmplitude * (0.4 + coilTightness / 100 * 0.8)
    
    const shrinkageFactor = hairType === 4 ? (1 - coilTightness / 100 * 0.4) :
                           hairType === 3 ? (1 - coilTightness / 100 * 0.25) :
                           hairType === 2 ? (1 - coilTightness / 100 * 0.1) : 1

    const drawHead = () => {
      ctx.save()
      
      const headGradient = ctx.createRadialGradient(
        centerX - 20, centerY - 30, 0,
        centerX, centerY, 100
      )
      headGradient.addColorStop(0, adjustBrightness(skinColor, 12))
      headGradient.addColorStop(0.6, skinColor)
      headGradient.addColorStop(1, adjustBrightness(skinColor, -18))
      
      ctx.fillStyle = headGradient
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, 82, 100, 0, 0, Math.PI * 2)
      ctx.fill()
      
      const eyeY = centerY - 12
      const eyeSpacing = 26
      
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.ellipse(centerX - eyeSpacing, eyeY, 11, 7, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(centerX + eyeSpacing, eyeY, 11, 7, 0, 0, Math.PI * 2)
      ctx.fill()
      
      const irisHue = 30 + settings.skinTone * 0.8
      const irisSat = 50 + (100 - settings.skinTone) * 0.3
      const irisLight = 22 + settings.skinTone * 0.15
      const eyeColor = `hsl(${irisHue}, ${irisSat}%, ${irisLight}%)`
      
      ctx.fillStyle = eyeColor
      ctx.beginPath()
      ctx.arc(centerX - eyeSpacing, eyeY, 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + eyeSpacing, eyeY, 4.5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(centerX - eyeSpacing, eyeY, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + eyeSpacing, eyeY, 2, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.beginPath()
      ctx.arc(centerX - eyeSpacing - 1.5, eyeY - 1, 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + eyeSpacing - 1.5, eyeY - 1, 1.2, 0, Math.PI * 2)
      ctx.fill()
      
      const browColor = adjustBrightness(skinColor, -35)
      ctx.strokeStyle = browColor
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing - 12, eyeY - 11)
      ctx.quadraticCurveTo(centerX - eyeSpacing, eyeY - 16, centerX - eyeSpacing + 12, eyeY - 11)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(centerX + eyeSpacing - 12, eyeY - 11)
      ctx.quadraticCurveTo(centerX + eyeSpacing, eyeY - 16, centerX + eyeSpacing + 12, eyeY - 11)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(centerX - 4, centerY + 8)
      ctx.lineTo(centerX, centerY + 22)
      ctx.lineTo(centerX + 4, centerY + 8)
      ctx.strokeStyle = adjustBrightness(skinColor, -22)
      ctx.lineWidth = 1.5
      ctx.stroke()
      
      const lipHue = 355 + settings.skinTone * 0.15
      const lipSat = 45 + (100 - settings.skinTone) * 0.35
      const lipLight = 42 + settings.skinTone * 0.18
      const lipColor = `hsl(${lipHue}, ${lipSat}%, ${lipLight}%)`
      
      ctx.fillStyle = lipColor
      ctx.beginPath()
      ctx.moveTo(centerX - 16, centerY + 45)
      ctx.quadraticCurveTo(centerX, centerY + 36, centerX + 16, centerY + 45)
      ctx.quadraticCurveTo(centerX, centerY + 54, centerX - 16, centerY + 45)
      ctx.fill()
      
      ctx.restore()
    }

    const drawHairStrand = (strand: HairStrand, isOverlay: boolean = false) => {
      const actualLength = strand.baseLength * lengthMultiplier * shrinkageFactor
      
      if (actualLength < 10) return
      
      ctx.beginPath()
      ctx.lineWidth = isOverlay ? strand.thickness * 0.7 : strand.thickness
      ctx.lineCap = 'round'
      
      const gradientEnd = Math.min(centerY + strand.startY + actualLength, height)
      const strandGradient = ctx.createLinearGradient(
        centerX + strand.startX,
        centerY + strand.startY,
        centerX + strand.startX,
        gradientEnd
      )
      
      const highlightAmount = isOverlay ? 8 : 15
      const shadowAmount = isOverlay ? -15 : -25
      
      strandGradient.addColorStop(0, adjustBrightness(hairColor, highlightAmount))
      strandGradient.addColorStop(0.2, hairColor)
      strandGradient.addColorStop(0.7, adjustBrightness(hairColor, -8))
      strandGradient.addColorStop(1, adjustBrightness(hairColor, shadowAmount))
      ctx.strokeStyle = strandGradient
      
      const points: { x: number; y: number }[] = []
      const steps = Math.max(20, Math.floor(actualLength / 3))
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const yOffset = t * actualLength
        
        let xWave: number
        
        if (hairType === 4) {
          const progressiveRadius = coilAmplitude * (0.2 + t * 0.8)
          const spiralSpeed = frequency * (1.2 + t * 0.5)
          const spiralAngle = t * actualLength * spiralSpeed + strand.offset
          xWave = Math.sin(spiralAngle) * progressiveRadius
          
          if (coilTightness > 40) {
            const microCoil = Math.sin(spiralAngle * 2.5) * (coilTightness - 40) / 100 * 8
            const zigzag = Math.sin(spiralAngle * 4) * (coilTightness - 40) / 100 * 4
            xWave += microCoil + zigzag
          }
          
          xWave *= (1 + coilLength / 100 * 0.3)
          
        } else if (hairType === 3) {
          const curlRadius = coilAmplitude * (0.3 + t * 0.7)
          const curl = Math.sin(t * actualLength * frequency + strand.offset) * curlRadius
          const subCurl = Math.sin(t * actualLength * frequency * 2.2 + strand.offset) * curlRadius * 0.25
          xWave = curl + subCurl
          
          if (coilTightness > 60) {
            xWave += Math.sin(t * actualLength * frequency * 3 + strand.offset) * 5
          }
          
          xWave *= (1 + coilLength / 100 * 0.2)
          
        } else if (hairType === 2) {
          const waveSize = coilAmplitude * (0.5 + t * 0.5)
          xWave = Math.sin(t * actualLength * frequency + strand.offset) * waveSize
          
          if (coilTightness > 50) {
            xWave += Math.sin(t * actualLength * frequency * 1.8 + strand.offset) * 3
          }
          
          xWave *= (1 + coilLength / 100 * 0.15)
          
        } else {
          xWave = Math.sin(t * actualLength * 0.008 + strand.offset) * (2 + coilLength / 100 * 2)
          xWave += Math.sin(t * actualLength * 0.02 + strand.offset * 2) * 1.5
        }
        
        const gravity = t * t * (0.1 + coilLength / 100 * 0.15)
        const directionX = strand.startX / Math.abs(strand.startX || 1)
        const spread = directionX * yOffset * (0.15 + coilLength / 200)
        
        let finalX = strand.startX + xWave + spread
        let finalY = strand.startY + yOffset + gravity * 20
        
        if (coilLength < 30 && hairType <= 2) {
          const volumeBoost = (30 - coilLength) / 30
          finalX *= (1 + volumeBoost * 0.3)
        }
        
        points.push({
          x: centerX + finalX,
          y: centerY + finalY
        })
      }
      
      if (points.length < 2) return
      
      ctx.moveTo(points[0].x, points[0].y)
      
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      
      if (points.length >= 2) {
        const last = points.length - 1
        ctx.quadraticCurveTo(
          points[last - 1].x,
          points[last - 1].y,
          points[last].x,
          points[last].y
        )
      }
      
      ctx.stroke()
    }

    strands.forEach((strand) => {
      drawHairStrand(strand, false)
    })

    drawHead()
    
    const overlayStrands = strands.filter(s => Math.abs(s.startX) < 35 && s.layer >= 1)
    overlayStrands.forEach((strand) => {
      const modifiedStrand = {
        ...strand,
        startY: strand.startY + 5,
        baseLength: strand.baseLength * 0.45,
        startX: strand.startX * 0.6,
      }
      drawHairStrand(modifiedStrand, true)
    })

    if (coilLength > 20) {
      const sideStrands = strands.filter(s => Math.abs(s.startX) > 60)
      sideStrands.slice(0, Math.floor(sideStrands.length * 0.3)).forEach((strand) => {
        ctx.globalAlpha = 0.4
        drawHairStrand(strand, false)
        ctx.globalAlpha = 1
      })
    }

  }, [settings, hairColor, skinColor, strands, lengthMultiplier, uploadedImage])

  function adjustBrightness(color: string, amount: number): string {
    const match = color.match(/hsl\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/)
    if (match) {
      const h = parseFloat(match[1])
      const s = parseFloat(match[2])
      const l = Math.max(0, Math.min(100, parseFloat(match[3]) + amount))
      return `hsl(${h}, ${s}%, ${l}%)`
    }
    return color
  }

  const getHairTypeName = () => {
    const { hairType, coilTightness } = settings
    if (hairType === 4) {
      if (coilTightness < 33) return 'Coily (4A)'
      if (coilTightness < 66) return 'Coily (4B)'
      return 'Coily (4C)'
    }
    if (hairType === 3) {
      if (coilTightness < 33) return 'Curly (3A)'
      if (coilTightness < 66) return 'Curly (3B)'
      return 'Curly (3C)'
    }
    if (hairType === 2) {
      if (coilTightness < 33) return 'Wavy (2A)'
      if (coilTightness < 66) return 'Wavy (2B)'
      return 'Wavy (2C)'
    }
    return 'Straight (1)'
  }

  const getLengthName = () => {
    const { coilLength } = settings
    if (coilLength < 15) return 'Buzz/Pixie'
    if (coilLength < 30) return 'Short'
    if (coilLength < 50) return 'Chin-Length'
    if (coilLength < 70) return 'Shoulder-Length'
    if (coilLength < 85) return 'Long'
    return 'Extra Long'
  }

  return (
    <div className="visualization-container">
      <div className="canvas-wrapper">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={600}
          className="hair-canvas"
        />
      </div>
      <div className="visualization-info">
        <span className="hair-type-badge">{getHairTypeName()}</span>
        <span className="info-separator">•</span>
        <span className="info-text">
          {settings.coilTightness < 30 ? 'Loose' : settings.coilTightness < 70 ? 'Medium' : 'Tight'} Pattern
        </span>
        <span className="info-separator">•</span>
        <span className="info-text">{getLengthName()}</span>
      </div>
    </div>
  )
}
