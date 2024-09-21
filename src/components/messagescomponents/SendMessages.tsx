import React from 'react';

type SendMessagesTemplateProps = {
  selectedTemplate: any; // Ajusta el tipo según corresponda
};

export const SendMessagesTemplate: React.FC<SendMessagesTemplateProps> = ({ selectedTemplate }) => {
  console.log('desde el componente SendMessages');
  console.log(selectedTemplate);

  return (
    <div>
      <h1>{selectedTemplate.name}</h1>
      {selectedTemplate.components[0].type === 'HEADER' && (
        <>
          <h2>Tiene imagen</h2>
          <h3>Deberás colocar una imagen desde internet</h3>
          <h4>Aquí irá un input para la imagen</h4>
        </>
      )}
      {selectedTemplate.components[1].type === 'BODY' && (
        <>
          <h2>{selectedTemplate.components[1].text}</h2>
        </>
      )}
      {selectedTemplate.components[2].type === 'FOOTER' && (
        <>
          <h2>{selectedTemplate.components[2].text}</h2>
        </>
      )}
      {selectedTemplate.components[3].type === 'BUTTONS' && (
        <>
          <h2>Tiene Botones {selectedTemplate.components[3].buttons.length}</h2>
          <h2></h2>
        </>
      )}
      {selectedTemplate.components[0].type === 'BODY' && (
        <>
          <h2>{selectedTemplate.components[0].text}</h2>
        </>
      )}
      {selectedTemplate.components[1].type === 'FOOTER' && (
        <>
          <h2>{selectedTemplate.components[1].text}</h2>
        </>
      )}
     
    </div>
  );
};