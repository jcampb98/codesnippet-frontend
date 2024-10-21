import { useState } from "react";

interface CheckboxOption {
    label: string;
    value: string;
}

interface CheckboxGroupProps {
    options: CheckboxOption[];
    onChange: (selectedValues: string[]) => void;
}

export default function CheckboxGroup({ options, onChange }: CheckboxGroupProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    const handleCheckboxChange = (value: string) => {
        let updatedValues: string[];

        if(selectedValues.includes(value)) {
            updatedValues = selectedValues.filter((selectedValue) => selectedValue !== value);
        }
        else {
            updatedValues = [...selectedValues, value];
        }

        setSelectedValues(updatedValues);
        onChange(updatedValues);
    };

    return(
        <div className="ml-4">
            {options.map((option, index) => 
                <div key={index} className="flex items-center mb-2">
                    <input 
                        type="checkbox"
                        id={`checkbox-${index}`}
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        htmlFor={`checkbox-${index}`}
                        className="ml-2 text-gray-700"
                    >
                        {option.label}
                    </label>
                </div>
            )}
        </div>
    );
}