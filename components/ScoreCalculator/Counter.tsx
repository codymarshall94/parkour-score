import { Minus, Plus } from "lucide-react";

interface CounterProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const Counter: React.FC<CounterProps> = ({ value, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={onDecrease}
        className="flex items-center space-x-2 border border-gray-200 rounded-md px-2 py-1"
      >
        <Minus />
      </div>
      <h2 className="font-bold mx-2">{value}</h2>
      <div
        onClick={onIncrease}
        className="flex items-center space-x-2 border border-gray-200 rounded-md px-2 py-1"
      >
        <Plus />
      </div>
    </div>
  );
};

export default Counter;
