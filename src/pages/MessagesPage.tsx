import { useState } from 'react';
import SelectTemplateMessages from '../components/messagescomponents/SelectTemplate';
import { SendMessagesTemplate } from '../components/messagescomponents/SendMessages';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SelectTemplateMessages 
              setSelectedTemplate={setSelectedTemplate} 
              selectedTemplate={selectedTemplate} 
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          {selectedTemplate ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SendMessagesTemplate selectedTemplate={selectedTemplate} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Select a template to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}