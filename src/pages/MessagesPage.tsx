import { useState } from 'react';
import SelectTemplateMessages from '../components/messagescomponents/SelectTemplate';
import { SendMessagesTemplate } from '../components/messagescomponents/SendMessages';


export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isExcelFileLoaded, setIsExcelFileLoaded] = useState(false);
  const [messages, setMessages] = useState<any[][]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SelectTemplateMessages 
              setIsExcelFileLoaded={setIsExcelFileLoaded}
              setSelectedTemplate={setSelectedTemplate} 
              selectedTemplate={selectedTemplate} 
              setMessages={setMessages}
              messages={messages}
              imageUrl={imageUrl}
              documentUrl={documentUrl}
              videoUrl={videoUrl}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          {selectedTemplate ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SendMessagesTemplate selectedTemplate={selectedTemplate} isExcelFileLoaded={isExcelFileLoaded} 
               setImageUrl={setImageUrl} messages={messages}  imageUrl={imageUrl}
               setDocumentUrl={setDocumentUrl} documentUrl={documentUrl}
               setVideoUrl={setVideoUrl} videoUrl={videoUrl}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Selecciona una plantilla para previsualizar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}