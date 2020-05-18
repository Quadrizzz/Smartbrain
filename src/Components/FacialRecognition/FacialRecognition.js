import React from 'react';
import './FacialRecognition.css'

const FacialRecognition = ( {imageUrl, box} )=> {
    return(
        <div className = "center ma">
            <div className = 'absolute mt2'>
                <img id = 'inputImage' src = { imageUrl } alt = "Faces" width = '500px' height = 'auto'/> 
                <div className = 'boundingBox' style = {{top:box.topRow, bottom:box.bottomRow, left:box.leftCol , right:box.rightCol}}>
                    
                </div>
           </div>
        </div>
    )
}

export default FacialRecognition;