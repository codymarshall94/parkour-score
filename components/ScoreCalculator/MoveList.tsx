import { useState } from "react";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

type Move = {
  name: string;
  difficulty: number;
  execution: number;
  onExecutionChange?: (execution: number) => void;
};

const MoveItem = ({
  move,
  onExecutionChange,
}: {
  move: Move;
  onExecutionChange: (execution: number) => void;
}) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [editedExecution, setEditedExecution] = useState<number>(
    move.execution
  );

  const handleExecutionChange = (value: string) => {
    const newExecution = Number(value);
    onExecutionChange(newExecution);
    setEditedExecution(newExecution);
    setEditable(false);
  };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-bold">{move.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <Badge>{move.difficulty}</Badge>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 last:border-b-0 flex items-center">
        {editable ? (
          <Select
            value={String(editedExecution)}
            onValueChange={(value) => handleExecutionChange(value)}
          >
            <SelectTrigger>
              <Badge>{editedExecution}</Badge>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Perfect</SelectItem>
              <SelectItem value="8">Stumble/ Hand Down</SelectItem>
              <SelectItem value="5">Bail</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge onClick={() => setEditable(true)}>{move.execution}</Badge>
        )}
      </td>
    </>
  );
};

const MoveList: React.FC<{
  moves: Move[];
  onExecutionChange: (name: string, execution: number) => void;
}> = ({ moves, onExecutionChange }) => {
  return (
    <div
      className="mb-4 min-w-[600px]"
      data-testid="move-list"
      data-cy="move-list"
      data-cy-move-list
    >
      <h2 className="font-bold">Moves</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Move
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Difficulty
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Execution
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {moves.map((move, index) => (
            <tr key={index}>
              <MoveItem
                move={move}
                onExecutionChange={(execution) =>
                  onExecutionChange(move.name, execution)
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoveList;
