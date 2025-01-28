import React from 'react';
import { Interest } from '../types';

interface InterestCardProps extends Interest {
  isActive: boolean;
  onToggle: () => void;
}

const InterestCard: React.FC<InterestCardProps> = ({
  title,
  subfields,
  isActive,
  onToggle,
}) => {
  return (
    <div
      className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={onToggle}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/30 rounded-lg p-4 mt-4">
          <ul className="space-y-2">
            {subfields.map((subfield, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-sm">{subfield}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterestCard;