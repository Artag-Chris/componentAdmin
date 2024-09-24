import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { getVariableCount } from "../functions";

interface ExcelPreviewProps {
  // En el futuro, esto se reemplazará con los datos reales pasados como prop
  // data: any[][]
  selectedTemplate: any;
}

const ExcelPreview: React.FC<ExcelPreviewProps> = ({ selectedTemplate }) => {
  const [variables, setVariables] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const rowsPerPage = 10;

  // Datos dummy para simular el contenido del Excel
  const dummyData = [
    ["Nombre", "edad", "Ciudad", "Ocupación", "Salario", "telefono"],
    ["John Doe", "30", "New York", "Engineer", "$80,000", "3152005752"],
    ["Jane Smith", "28", "Los Angeles", "Designer", "$75,000", "3152005752"],
    ["Mike Johnson", "35", "Chicago", "Manager", "$90,000", "3152005752"],
    ["David Lee", "32", "Boston", "Analyst", "$70,000", "3152005752"],
    ["Sarah Davis", "29", "Seattle", "Marketing", "$72,000", "3152005752"],
    ["Tom Wilson", "38", "Miami", "Sales", "$78,000", "3152005752"],
    ["Lisa Taylor", "31", "Denver", "HR", "$68,000", "3152005752"],
    [
      "Chris Martin",
      "33",
      "Austin",
      "Product Manager",
      "$88,000",
      "3152005752",
    ],
    ["Anna White", "27", "Portland", "UX Designer", "$76,000", "3152005752"],
    [
      "Kevin Brown",
      "36",
      "Philadelphia",
      "Data Scientist",
      "$92,000",
      "3152005752",
    ],
    ["Rachel Green", "30", "San Diego", "Teacher", "$65,000", "3152005752"],
    ["Mark Thompson", "34", "Dallas", "Accountant", "$71,000", "3152005752"],
    ["Olivia Johnson", "29", "Houston", "Lawyer", "$95,000", "3152005752"],
    ["Daniel Kim", "31", "Atlanta", "Architect", "$82,000", "3152005752"],
    ["Sophie Chen", "28", "Phoenix", "Nurse", "$69,000", "3152005752"],
    ["Ryan Patel", "33", "Detroit", "Consultant", "$86,000", "3152005752"],
    ["Emma Watson", "27", "Minneapolis", "Journalist", "$67,000", "3152005752"],
    ["Alex Rodriguez", "35", "Las Vegas", "Chef", "$73,000", "3152005752"],
  ];

  const totalPages = Math.ceil((dummyData.length - 1) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, dummyData.length - 1);

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
          {selectedTemplate.components[0].type === "HEADER" && (
            <>
              <h3>Con Imagen</h3>
              <p className="text-gray-600">
                {selectedTemplate.components[1].text}
              </p>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  URL de la Imagen
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Sube la imagen desde internet"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300">
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
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
                  {dummyData[0].map((header, index) => (
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
                {dummyData
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
