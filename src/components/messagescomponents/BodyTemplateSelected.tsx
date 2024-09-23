import React from 'react'
import { BodyTemplateReceived } from '../interfaces';

interface selectedTemplate {
    // Define the properties you expect in the SelectedTemplate interface
    selectedTemplate: BodyTemplateReceived
  }

const BodyTemplateSelected: React.FC<BodyTemplateReceived> = ({selectedTemplate}) => {
  console.log("desde el componente BodyTemplateSelected");
 console.log( selectedTemplate.name);
    // Access the props inside the component
    return (
      <>
        <h1>con body</h1>
        {/* You can use props here to render dynamic content */}
        <h1>{selectedTemplate.components[0].text}</h1>
      </>
    );
  };

export default BodyTemplateSelected