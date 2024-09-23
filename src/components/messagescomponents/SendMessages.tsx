import React from 'react';
import ImageTemplateSeleted from './ImageTemplateSeleted';
import BodyTemplateSelected from './BodyTemplateSelected';

type SendMessagesTemplateProps = {
  selectedTemplate: any; // Ajusta el tipo según corresponda
};

export const SendMessagesTemplate: React.FC<SendMessagesTemplateProps> = ({ selectedTemplate }) => {

 

  return (
    <div>
       {selectedTemplate.components[0].type === 'HEADER' && (
        <ImageTemplateSeleted selectedTemplate={selectedTemplate} />
      )}
        {selectedTemplate.components[0].type === 'BODY' && (
        <BodyTemplateSelected  selectedTemplate={selectedTemplate}/>
      )}

     
    </div>
  );
};

export default SendMessagesTemplate;