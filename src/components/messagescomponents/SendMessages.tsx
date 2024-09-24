
import ImageTemplateSeleted from './ImageTemplateSeleted';
import BodyTemplateSelected from './BodyTemplateSelected';
import ExcelPreview from '../excelcomponents/ExcelPreviewComponent';

type SendMessagesTemplateProps = {
  selectedTemplate: any; // Ajusta el tipo según corresponda
  isExcelFileLoaded: boolean; // Estado que indica si se ha cargado un documento de Excel
  messages: any[][];
  setImageUrl: (imageUrl: string) => void;
  imageUrl: string;
};

export const SendMessagesTemplate: React.FC<SendMessagesTemplateProps> = ({ selectedTemplate,
   isExcelFileLoaded, messages,setImageUrl,  imageUrl}) => {
 

  if (isExcelFileLoaded) {
    // Si se ha cargado un documento de Excel, no se puede acceder a los componentes
    return <div>
      <ExcelPreview selectedTemplate={selectedTemplate} messages={messages} setImageUrl={setImageUrl}  imageUrl={imageUrl} />
    </div>;
  }

  return (
    <div>
      {selectedTemplate.components[0].type === 'HEADER' && (
        <ImageTemplateSeleted selectedTemplate={selectedTemplate} />
      )}
      {selectedTemplate.components[0].type === 'BODY' && (
        <BodyTemplateSelected selectedTemplate={selectedTemplate} />
      )}
    </div>
  );
};

export default SendMessagesTemplate;