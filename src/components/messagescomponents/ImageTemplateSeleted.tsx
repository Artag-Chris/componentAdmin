import React from 'react';
import { ImageTemplateReceived } from '../interfaces';


interface SelectedTemplate {
  // Define the properties you expect in the SelectedTemplate interface
  selectedTemplate: ImageTemplateReceived , 
}

const ImageTemplateSeleted: React.FC<ImageTemplateReceived> = ({selectedTemplate}) => {

    console.log("desde el componente ImageTemplateSeleted");
    console.log( selectedTemplate);
  return (
    <>
      <h1>con header</h1>
      {/* You can use props here to render dynamic content */}
      <h1>{selectedTemplate.components[1].text}</h1>

      
    </> 
  );
};

export default ImageTemplateSeleted;