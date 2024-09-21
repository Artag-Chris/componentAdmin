import { useState } from 'react';
import SelectTemplateMessages from '../components/messagescomponents/SelectTemplate';
import { SendMessagesTemplate } from '../components/messagescomponents/SendMessages';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  return (
    <div className="flex flex-wrap justify-around p-4">
      <div className="flex-1 min-w-[200px] m-2">
        <SelectTemplateMessages setSelectedTemplate={setSelectedTemplate} selectedTemplate={selectedTemplate} />
      </div>
      <div className="flex-1 min-w-[200px] m-2">
      {selectedTemplate && <SendMessagesTemplate selectedTemplate={selectedTemplate} />}
      </div>
      </div>
 
  );
}