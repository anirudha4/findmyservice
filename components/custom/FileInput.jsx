import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import { BsImages } from 'react-icons/bs'
import { MediaField } from '.'

function FileInput({
  name,
  label,
  value,
  onChange,
}) {
  const handleFileUpload = e => {
    const file = e.target.files[0];
    onChange({ target: { name, value: file } });
  }
  const handleClearFile = () => onChange({ target: { name, value: '' } });
  return (
    <MediaField>
      {value && (
        <div className="clear-icon" onClick={handleClearFile}><IoMdTrash size={20} /></div>
      )}
      <label htmlFor={name}>{value ? (
        <span className='filename'>{value.name}</span>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <BsImages size={20} />
          <div style={{ marginTop: 15 }}>{label}</div>
        </div>
      )}</label>
      <input type="file" name={name} id={name} onChange={handleFileUpload} />
    </MediaField>
  )
}

export default FileInput