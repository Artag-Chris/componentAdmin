"use client";

import React, { useEffect, useState } from "react";
import { BodyTemplateReceived } from "../interfaces";
import { getVariableCount } from "../functions";
import { Send } from "lucide-react";

const BodyTemplateSelected: React.FC<BodyTemplateReceived> = ({
  selectedTemplate,
}) => {
  const [variables, setVariables] = useState<any>();

  useEffect(() => {
    setVariables(getVariableCount(selectedTemplate.name));
  }, [selectedTemplate]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h2 className="text-2xl font-bold text-white">
            Plantilla con Texto
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ejemplo del texto de la plantilla
            </h3>
            <p className="text-gray-600">
              {selectedTemplate.components[0].text}
            </p>
          </div>

          {variables && variables.variableCount > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Variables de plantilla
              </h3>
              {Array(variables.variableCount)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 w-24">
                      Variable {index + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={`Ingresa el valor de la Variable ${index + 1}`}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
            </div>
          )}

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Footer
            </h3>
            <p className="text-gray-600">
              {selectedTemplate.components[1].text}
            </p>
          </div>

          {selectedTemplate.components[2] &&
            selectedTemplate.components[2].type === "BUTTONS" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Template Buttons
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.components[2]?.buttons?.map(
                    (button, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
                      >
                        {button.text}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

          <div className="pt-4">
            <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center">
              <Send className="mr-2 h-5 w-5" />
              Envio de plantilla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyTemplateSelected;
