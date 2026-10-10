import type { HairSettings } from '../App'
import Slider from './Slider'
import './ControlPanel.css'

interface ControlPanelProps {
  settings: HairSettings
  onUpdateSetting: <K extends keyof HairSettings>(key: K, value: HairSettings[K]) => void
  onUpdateHairColor: (key: keyof HairSettings['hairColor'], value: number) => void
}

const hairTypeLabels = ['Straight (1)', 'Wavy (2)', 'Curly (3)', 'Coily (4)']

const getSubTypeLabel = (hairType: number, tightness: number): string => {
  if (hairType === 1) return '1'
  const subType = tightness < 33 ? 'A' : tightness < 66 ? 'B' : 'C'
  return `${hairType}${subType}`
}

const getLengthLabel = (length: number): string => {
  if (length < 15) return 'Buzz/Pixie'
  if (length < 30) return 'Short'
  if (length < 50) return 'Chin-Length'
  if (length < 70) return 'Shoulder'
  if (length < 85) return 'Long'
  return 'Extra Long'
}

export default function ControlPanel({ 
  settings, 
  onUpdateSetting, 
  onUpdateHairColor 
}: ControlPanelProps) {
  
  const hairColorPresets = [
    { name: 'Black', hue: 0, saturation: 0, lightness: 8 },
    { name: 'Dark Brown', hue: 25, saturation: 50, lightness: 18 },
    { name: 'Brown', hue: 30, saturation: 60, lightness: 28 },
    { name: 'Auburn', hue: 15, saturation: 70, lightness: 32 },
    { name: 'Red', hue: 5, saturation: 75, lightness: 38 },
    { name: 'Blonde', hue: 42, saturation: 65, lightness: 55 },
    { name: 'Platinum', hue: 50, saturation: 30, lightness: 75 },
    { name: 'Gray', hue: 0, saturation: 0, lightness: 55 },
    { name: 'Purple', hue: 280, saturation: 60, lightness: 35 },
    { name: 'Blue', hue: 220, saturation: 65, lightness: 40 },
    { name: 'Pink', hue: 340, saturation: 60, lightness: 55 },
    { name: 'Teal', hue: 180, saturation: 55, lightness: 35 },
  ]

  const currentHairColor = `hsl(${settings.hairColor.hue}, ${settings.hairColor.saturation}%, ${settings.hairColor.lightness}%)`

  return (
    <div className="control-panel">
      <div className="control-section">
        <h3 className="section-title">
          <span className="section-icon">✨</span>
          Hair Texture
        </h3>
        
        <div className="hair-type-selector">
          <label className="control-label">Hair Type</label>
          <div className="hair-type-buttons">
            {[1, 2, 3, 4].map((type) => (
              <button
                key={type}
                className={`hair-type-btn ${settings.hairType === type ? 'active' : ''}`}
                onClick={() => onUpdateSetting('hairType', type)}
              >
                <span className="type-visual">
                  {type === 1 && '—'}
                  {type === 2 && '∿'}
                  {type === 3 && 'ꙅ'}
                  {type === 4 && 'ఠ'}
                </span>
                <span className="type-label">{hairTypeLabels[type - 1]}</span>
              </button>
            ))}
          </div>
        </div>

        <Slider
          label={`Coil/Curl Tightness (${getSubTypeLabel(settings.hairType, settings.coilTightness)})`}
          value={settings.coilTightness}
          onChange={(v) => onUpdateSetting('coilTightness', v)}
          min={0}
          max={100}
          leftLabel="Loose (A)"
          rightLabel="Tight (C)"
        />

        <Slider
          label={`Hair Length (${getLengthLabel(settings.coilLength)})`}
          value={settings.coilLength}
          onChange={(v) => onUpdateSetting('coilLength', v)}
          min={0}
          max={100}
          leftLabel="Buzz"
          rightLabel="Extra Long"
        />
      </div>

      <div className="control-section">
        <h3 className="section-title">
          <span className="section-icon">🎨</span>
          Hair Color
        </h3>

        <div className="color-presets">
          <label className="control-label">Color Presets</label>
          <div className="preset-grid">
            {hairColorPresets.map((preset) => (
              <button
                key={preset.name}
                className="color-preset-btn"
                style={{ 
                  backgroundColor: `hsl(${preset.hue}, ${preset.saturation}%, ${preset.lightness}%)` 
                }}
                onClick={() => {
                  onUpdateHairColor('hue', preset.hue)
                  onUpdateHairColor('saturation', preset.saturation)
                  onUpdateHairColor('lightness', preset.lightness)
                }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        <div className="color-preview">
          <div 
            className="color-swatch" 
            style={{ backgroundColor: currentHairColor }}
          />
          <span className="color-label">Current Color</span>
        </div>

        <Slider
          label="Hue"
          value={settings.hairColor.hue}
          onChange={(v) => onUpdateHairColor('hue', v)}
          min={0}
          max={360}
          gradient={`linear-gradient(to right, 
            hsl(0, 70%, 40%), 
            hsl(60, 70%, 40%), 
            hsl(120, 70%, 40%), 
            hsl(180, 70%, 40%), 
            hsl(240, 70%, 40%), 
            hsl(300, 70%, 40%), 
            hsl(360, 70%, 40%)
          )`}
        />

        <Slider
          label="Saturation"
          value={settings.hairColor.saturation}
          onChange={(v) => onUpdateHairColor('saturation', v)}
          min={0}
          max={100}
          gradient={`linear-gradient(to right, 
            hsl(${settings.hairColor.hue}, 0%, ${settings.hairColor.lightness}%), 
            hsl(${settings.hairColor.hue}, 100%, ${settings.hairColor.lightness}%)
          )`}
        />

        <Slider
          label="Lightness"
          value={settings.hairColor.lightness}
          onChange={(v) => onUpdateHairColor('lightness', v)}
          min={5}
          max={85}
          gradient={`linear-gradient(to right, 
            hsl(${settings.hairColor.hue}, ${settings.hairColor.saturation}%, 5%), 
            hsl(${settings.hairColor.hue}, ${settings.hairColor.saturation}%, 50%),
            hsl(${settings.hairColor.hue}, ${settings.hairColor.saturation}%, 85%)
          )`}
        />
      </div>

      <div className="control-section">
        <h3 className="section-title">
          <span className="section-icon">👤</span>
          Appearance
        </h3>

        <Slider
          label="Skin Tone"
          value={settings.skinTone}
          onChange={(v) => onUpdateSetting('skinTone', v)}
          min={0}
          max={100}
          gradient="linear-gradient(to right, 
            hsl(25, 80%, 85%), 
            hsl(25, 70%, 70%), 
            hsl(25, 60%, 55%), 
            hsl(25, 50%, 40%), 
            hsl(25, 40%, 25%), 
            hsl(25, 35%, 15%)
          )"
        />

        <Slider
          label="Age Appearance"
          value={settings.age}
          onChange={(v) => onUpdateSetting('age', v)}
          min={18}
          max={80}
          showValue
          valueSuffix=" years"
        />
      </div>

      <div className="tips-section">
        <h4>Hair Type Guide (Andre Walker System)</h4>
        <ul className="tips-list">
          <li><strong>Type 1:</strong> Straight - lies flat, reflects light</li>
          <li><strong>Type 2A-C:</strong> Wavy - S-shaped, beachy to deep waves</li>
          <li><strong>Type 3A-C:</strong> Curly - springy ringlets to corkscrews</li>
          <li><strong>Type 4A-C:</strong> Coily - S-coils to tight Z-pattern coils</li>
        </ul>
        <p className="tip-note">
          <strong>How settings interact:</strong> Tighter coils cause more 
          "shrinkage" - 4C hair at full length may appear shorter than 2A at the 
          same setting. Each style is uniquely shaped by ALL sliders working together!
        </p>
      </div>
    </div>
  )
}
