import React from 'react'
import './UploadImage.scoped.css'
export default function UploadImage() {

    function handleit(){
        
    }
  return (
    <>
    
          <script className="jsbin" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
          <div className="file-upload">
              <button className="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button>

              <div className="image-upload-wrap">
                  <input className="file-upload-input" type='file' onchange="readURL(this);" accept="image/*" />
                  <div className="drag-text">
                      <h3>Drag and drop a file or select add Image</h3>
                  </div>
              </div>
              <div className="file-upload-content">
                  <img className="file-upload-image" src="#" alt="your s" />
                  <div className="image-title-wrap">
                      <button type="button" onclick="removeUpload()" className="remove-image">Remove <span className="image-title">Uploaded Image</span></button>
                  </div>
              </div>
          </div>
    
    
    
    
    
    </>
  )
}
