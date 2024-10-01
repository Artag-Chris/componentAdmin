import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { getVariableCount } from "../functions";

interface ExcelPreviewProps {

  selectedTemplate: any;
  messages: any[][];
  imageUrl: string
  setImageUrl: (imageUrl: string) => void;
  documentUrl: string
  setDocumentUrl: (documentUrl: string) => void
}

const ExcelPreview: React.FC<ExcelPreviewProps> = ({ selectedTemplate, messages, imageUrl, setImageUrl }) => {
  const [variables, setVariables] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((messages.length - 1) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, messages.length - 1);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (selectedTemplate.components[0].type === "HEADER") {
    console.log(variables);
  }
  useEffect(() => {
    setVariables(getVariableCount(selectedTemplate.name));
  }, [selectedTemplate]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">Excel Preview</h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ejemplo del texto de la plantilla
          </h3>
          {selectedTemplate.components[0].type === 'HEADER' && (
            selectedTemplate.components[0].format === 'IMAGE' ? (
              <div className="space-y-4">
                <h3>Con Imagen</h3>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Sube la URL de la imagen"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : selectedTemplate.components[0].format === 'VIDEO' ? (
              <div className="space-y-4">
                <h3>Con Video</h3>
                <input
                  type="text"
                  // value={videoUrl}
                  // onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Sube la URL del video"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : selectedTemplate.components[0].format === 'DOCUMENT' ? (
              <div className="space-y-4">
                <h3>Con Documento</h3>
                <input
                  type="text"
                  // value={documentUrl}
                  // onChange={(e) => setDocumentUrl(e.target.value)}
                  placeholder="Sube la URL del documento"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : null
          )}
          {selectedTemplate.components[0].type === "BODY" && (
            <>
              <p className="text-gray-600">
                {selectedTemplate.components[0].text}
              </p>
            </>
          )}
        </div>
        <div className="p-6 space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {messages[0].map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages
                  .slice(startIndex, endIndex + 1)
                  .map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelPreview;
