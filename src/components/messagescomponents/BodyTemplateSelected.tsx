import React, { useEffect } from "react";
import { BodyTemplateReceived } from "../interfaces";
import { getVariableCount } from "../functions";

const BodyTemplateSelected: React.FC<BodyTemplateReceived> = ({
  selectedTemplate,
}) => {
  const [variables, setVariables] = React.useState<any>();

  useEffect(() => {
    setVariables(getVariableCount(selectedTemplate.name));
  }, [selectedTemplate]);
  //console.log(variables);
  // Access the props inside the component
  console.log(selectedTemplate);
  return (
    <>
      <h1>con body</h1>
      {/* You can use props here to render dynamic content */}
      <h1>{selectedTemplate.components[0].text}</h1>
      {variables && variables.variableCount > 0 && (
        <div>
          {Array(variables.variableCount)
            .fill(null)
            .map((_, index) => (
              <div key={index}>
                <label>Variable {index + 1}</label>
                <input type="text" />
              </div>
            ))}

          <h1>{selectedTemplate.components[1].text}</h1>
          {selectedTemplate.components[2] &&
          selectedTemplate.components[2].type === "BUTTONS" ? (
            selectedTemplate.components[2].buttons &&
            selectedTemplate.components[2].buttons.map((button, index) => (
              <button key={index}>{button.text}</button>
            ))
          ) : (
            <h1>no buttons</h1>
          )}
        </div>
      )}
    </>
  );
};

export default BodyTemplateSelected;
