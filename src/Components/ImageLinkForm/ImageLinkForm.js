import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange , onButtonSubmit})=>{
    return(
        <div >
           <p className = 'f3 white'>
               {'This Magic Brain will detect faces in your pictures, paste a link to the image in the input box. Give It A Try'}
           </p>
           <div className = 'center '>
               <div className = 'center form pa4 br3 shadow-5'>
                  <input className = 'f4 pa2 pv1 w-70 center' type = 'text' onChange = {onInputChange}/>
                  <button className = 'w-30 grow br2 f4 link ph3 pv1 dib white bg-light-blue' onClick = {onButtonSubmit}>Detect</button>
               </div>
           </div>
        </div>
    )
}

export default ImageLinkForm;