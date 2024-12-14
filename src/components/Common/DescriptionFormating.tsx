import React, { useEffect, useState } from "react";

interface DescriptionWithConditionalNumberingProps {
  description: string;
}

const DescriptionFormating: React.FC<
  DescriptionWithConditionalNumberingProps
> = ({ description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lines = description.split("\n").filter((line) => line.trim() !== "");
  let numberingEnabled = false;

  return (
    <div className="p-4">
      {isClient && (
        <ul className="list-decimal pl-5">
          {lines.map((line, index) => {
            if (line.includes("Syarat & ketentuan")) {
              numberingEnabled = true;
              return (
                <p key={index} className="font-bold mt-4">
                  {line}
                </p>
              );
            }

            if (numberingEnabled && /^\d/.test(line.trim())) {
              return (
                <li key={index} className="my-2">
                  {line}
                </li>
              );
            }

            return (
              <p key={index} className="my-2">
                {line}
              </p>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DescriptionFormating;
