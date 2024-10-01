
import ImageTemplateSeleted from './ImageTemplateSeleted';
import BodyTemplateSelected from './BodyTemplateSelected';
import ExcelPreview from '../excelcomponents/ExcelPreviewComponent';
import VideoTemplateSelected from './VideoTemplateSelected';

import DocumentTemplateSelected from './DocumentTemplateSeleted';

type SendMessagesTemplateProps = {
  selectedTemplate: any; // Ajusta el tipo según corresponda
  isExcelFileLoaded: boolean; // Estado que indica si se ha cargado un documento de Excel
  messages: any[][];
  setImageUrl: (imageUrl: string) => void;
  imageUrl: string;
  documentUrl: string;
  setDocumentUrl: (documentUrl: string) => void;
};

export const SendMessagesTemplate: React.FC<SendMessagesTemplateProps> = ({ selectedTemplate,
   isExcelFileLoaded, messages,setImageUrl,  imageUrl, documentUrl, setDocumentUrl}) => {
 

  if (isExcelFileLoaded) {
    // Si se ha cargado un documento de Excel, no se puede acceder a los componentes
    return <div>
      <ExcelPreview selectedTemplate={selectedTemplate} messages={messages} setImageUrl={setImageUrl}  imageUrl={imageUrl}
      setDocumentUrl={setDocumentUrl} documentUrl={documentUrl} />
    </div>;
  }
 
//en header se debera hacer otra comprobacion para ver si es imagen,pdf,o video
//se debera crear un componente para cada uno de estos
//se mandaran a distintas urls dependiendo el numero de variables que contenga
  return (
    <div>
      {selectedTemplate.components[0].type === 'HEADER' && (
  selectedTemplate.components[0].format === 'IMAGE' ? (
    <ImageTemplateSeleted selectedTemplate={selectedTemplate} />
  ) : selectedTemplate.components[0].format === 'VIDEO' ? (
    <VideoTemplateSelected selectedTemplate={selectedTemplate} />
  ) : selectedTemplate.components[0].format === 'DOCUMENT' ? (
    <DocumentTemplateSelected selectedTemplate={selectedTemplate} />
  ) : null
)}
      {selectedTemplate.components[0].type === 'BODY' && (
        <BodyTemplateSelected selectedTemplate={selectedTemplate} />
      )}
    </div>
  );
};

export default SendMessagesTemplate;