import { useCallback, useRef } from 'react'
import './ImageUpload.css'

interface ImageUploadProps {
  onImageUpload: (imageData: string | null) => void
  currentImage: string | null
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        onImageUpload(result)
      }
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        onImageUpload(result)
      }
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleRemove = useCallback(() => {
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onImageUpload])

  return (
    <div className="image-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      
      {currentImage ? (
        <div className="image-preview-container">
          <div className="preview-header">
            <span className="preview-label">Your Photo Reference</span>
            <button 
              className="remove-btn"
              onClick={handleRemove}
              title="Remove image"
            >
              ✕
            </button>
          </div>
          <div className="image-preview">
            <img src={currentImage} alt="Uploaded preview" />
          </div>
          <p className="preview-hint">
            Your photo is shown faded behind the visualization. 
            Adjust the sliders to see different hairstyles!
          </p>
        </div>
      ) : (
        <div 
          className="upload-zone"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="upload-icon">📷</div>
          <h4 className="upload-title">Upload Your Photo</h4>
          <p className="upload-subtitle">
            Drop an image here or click to browse
          </p>
          <p className="upload-hint">
            See how different hairstyles look with your face!
          </p>
        </div>
      )}
    </div>
  )
}
