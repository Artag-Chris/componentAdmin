import { useState, useEffect } from 'react'
import { Loader2, Send, FileSpreadsheet, ChevronDown } from 'lucide-react'
import * as XLSX from 'xlsx'
import usePhoneNumbers from '../components/hook/usePhoneNumberToSend'
//import useTemplates from '../components/hook/useTemplates'

// Simulated API calls
const fetchTemplates = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, name: "Template 1" },
    { id: 2, name: "Template 2" },
    { id: 3, name: "Template 3" },
  ]
}

const fetchPhoneNumbers = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, number: "+1234567890" },
    { id: 2, number: "+0987654321" }, 
    { id: 3, number: "+1122334455" }, 
  ]  
}

const sendMessages = async (messages:any, templateId:any, phoneNumber:any, additionalInfo:any) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log("Messages sent:", messages, "Template ID:", templateId, "From:", phoneNumber, "Additional Info:", additionalInfo)
  return { success: true, messagesSent: messages.length }
} 
 export default function SendMessages() { 
  const [templates, setTemplates] = useState<{ id: number; name: string; }[]>([]);
  //const { templates, error, loading } = useTemplates(); 
 const {phoneNumbers}=usePhoneNumbers()
  //const [phoneNumbers, setPhoneNumbers] = useState<{ id: number; number: string; }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("")
  const [file, setFile] = useState<any>(null)
  const [messages, setMessages] = useState<any[][]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; messagesSent: any; error?: string } | null>(null);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false)
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false)
  


//console.log(phoneNumbers) 

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target) {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setMessages(data as any[][]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (!selectedTemplate || !selectedPhoneNumber || messages.length === 0) return
    setIsLoading(true)
    try {
      const result = await sendMessages(messages, selectedTemplate, selectedPhoneNumber, additionalInfo)
      setResult(result)
    } catch (error) {
      console.error("Error sending messages:", error)
      setResult({ success: false, messagesSent: null, error: 'some error message' });
    }
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">Envio de plantillas</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Seleciona un numero del cual enviar</label>
            <div className="relative">
              <button
                onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {selectedPhoneNumber || "Selecciona un numero de telefono"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isPhoneDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {phoneNumbers?.map((phone) => (
                    <button 
                      key={phone.id}    
                      onClick={() => {   
                        setSelectedPhoneNumber(phone.number)
                        setIsPhoneDropdownOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      {phone.number}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="template" className="block text-sm font-medium text-gray-700">Seleciona una plantilla</label>
            <div className="relative">
              <button
                onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                { templates.find(t => t.id.toString() === selectedTemplate)?.name || "Choose a template"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isTemplateDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id.toString())
                        setIsTemplateDropdownOpen(false)
                      } }
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      {template.name}
                    </button>
                  )) }
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Adjunta un archivo excel</label>
            <div className="relative">
              <button
                onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 flex items-center"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                {file ? file.name : "Sube un excel"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isFileDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <label htmlFor="file-upload" className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer">
                    Upload New File
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <button
                      onClick={() => {
                        setFile(null)
                        setIsFileDropdownOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Clear File
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {file && (
            <p className="text-sm text-gray-600">
              File loaded: {file.name} ({messages.length} messages)
            </p>
          )}

          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Informacion adicional </label>
            <textarea
              id="additionalInfo"
              placeholder="Enter any additional information here..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 min-h-[100px]"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedTemplate || !selectedPhoneNumber || messages.length === 0 || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 flex items-center justify-center ${
              !selectedTemplate || !selectedPhoneNumber || messages.length === 0 || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Envio de mensajes
              </>
            )}
          </button>

          {result && (
            <div className={`text-center p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {result.success
                ? `Successfully sent ${result.messagesSent} messages!`
                : `Error: ${result.error}`}
            </div>
          )} 
        </div>
      </div> 
    </div> 
  )
} 
 
/*
<div className="container mx-auto p-4 max-w-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">Envio de plantillas</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Seleciona un numero del cual enviar</label>
            <div className="relative">
              <button
                onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {selectedPhoneNumber || "Choose a phone number"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isPhoneDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {phoneNumbers.map((phone) => (
                    <button
                      key={phone.id}
                      onClick={() => {
                        setSelectedPhoneNumber(phone.number)
                        setIsPhoneDropdownOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      {phone.number}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="template" className="block text-sm font-medium text-gray-700">Seleciona una plantilla</label>
            <div className="relative">
              <button
                onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                { templates.find(t => t.id.toString() === selectedTemplate)?.name || "Choose a template"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isTemplateDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id.toString())
                        setIsTemplateDropdownOpen(false)
                      } }
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      {template.name}
                    </button>
                  )) }
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Adjunta un archivo excel</label>
            <div className="relative">
              <button
                onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 flex items-center"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                {file ? file.name : "Sube un excel"}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </button>
              {isFileDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <label htmlFor="file-upload" className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer">
                    Upload New File
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <button
                      onClick={() => {
                        setFile(null)
                        setIsFileDropdownOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Clear File
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {file && (
            <p className="text-sm text-gray-600">
              File loaded: {file.name} ({messages.length} messages)
            </p>
          )}

          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Informacion adicional </label>
            <textarea
              id="additionalInfo"
              placeholder="Enter any additional information here..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 min-h-[100px]"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedTemplate || !selectedPhoneNumber || messages.length === 0 || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 flex items-center justify-center ${
              !selectedTemplate || !selectedPhoneNumber || messages.length === 0 || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Envio de mensajes
              </>
            )}
          </button>

          {result && (
            <div className={`text-center p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {result.success
                ? `Successfully sent ${result.messagesSent} messages!`
                : `Error: ${result.error}`}
            </div>
          )}
        </div>
      </div>
    </div> */