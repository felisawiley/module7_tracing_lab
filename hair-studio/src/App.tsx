import { useState, useCallback } from 'react'
import HairVisualization from './components/HairVisualization'
import ControlPanel from './components/ControlPanel'
import ImageUpload from './components/ImageUpload'
import './App.css'

export interface HairSettings {
  hairType: number // 1-4 (1=straight, 2=wavy, 3=curly, 4=coily)
  coilTightness: number // 0-100 (loose to tight)
  coilLength: number // 0-100 (short to long)
  skinTone: number // 0-100 (light to dark)
  age: number // 18-80
  hairColor: {
    hue: number // 0-360
    saturation: number // 0-100
    lightness: number // 0-100
  }
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [settings, setSettings] = useState<HairSettings>({
    hairType: 3,
    coilTightness: 50,
    coilLength: 50,
    skinTone: 50,
    age: 30,
    hairColor: {
      hue: 30,
      saturation: 60,
      lightness: 25,
    },
  })

  const updateSetting = useCallback(<K extends keyof HairSettings>(
    key: K,
    value: HairSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateHairColor = useCallback((colorKey: keyof HairSettings['hairColor'], value: number) => {
    setSettings(prev => ({
      ...prev,
      hairColor: { ...prev.hairColor, [colorKey]: value }
    }))
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>CrownStudio</h1>
          <p className="tagline">Celebrate every texture, every crown</p>
        </div>
      </header>

      <main className="main-content">
        <div className="visualization-section">
          <HairVisualization 
            settings={settings} 
            uploadedImage={uploadedImage}
          />
          <ImageUpload 
            onImageUpload={setUploadedImage}
            currentImage={uploadedImage}
          />
        </div>

        <div className="controls-section">
          <ControlPanel 
            settings={settings}
            onUpdateSetting={updateSetting}
            onUpdateHairColor={updateHairColor}
          />
        </div>
      </main>

      <footer className="footer">
        <p>Built with love for all hair types and textures 💜</p>
      </footer>
    </div>
  )
}

export default App
