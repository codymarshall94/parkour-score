"use client";

import { useState } from "react";
import MoveSelector from "./MoveSelector";
import { MOVES } from "@/constants/move";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import MoveList from "./MoveList";
import { Separator } from "../ui/separator";
import Counter from "./Counter";

interface Move {
  name: string;
  difficulty: number;
  execution: number;
}

const versatilityHelperTexts = [
  "Didn't effectively utilize the course. The participant may have struggled to adapt to different areas and functions, resulting in limited engagement with the course.",
  "Started branching out and used a variety of obstacles. The participant demonstrated an initial level of adaptability but may benefit from incorporating more diverse movements and techniques.",
  "Showed versatility by navigating through different course areas. The participant effectively adapted to various obstacles, showcasing a well-rounded performance.",
  "Excellently demonstrated adaptability and creativity. The participant went beyond basic movements, incorporating a wide range of techniques and transitions with finesse.",
  "Achieved the highest level of versatility. The participant flawlessly executed movements in each course section, displaying exceptional adaptability, creativity, and mastery of diverse challenges.",
];

//https://internationalparkourfederation.org/judges-criteria/

const ScoreCalculator: React.FC = () => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [execution, setExecution] = useState<number>(10);
  const [versatility, setVersatility] = useState<number>(0);
  const [flowMistakes, setFlowMistakes] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [moveName, setMoveName] = useState<string>("");
  const [moveDifficulty, setMoveDifficulty] = useState<number>(0);

  const addMove = (name: string, difficulty: number) => {
    const newMove: Move = {
      name,
      difficulty,
      execution: 10,
    };
    setMoves([...moves, newMove]);
  };

  const handleMoveSelect = (newMove: string) => {
    const selectedMove = MOVES.find(
      (move) => move.value.toLowerCase() === newMove.toLowerCase()
    );
    if (selectedMove) {
      addMove(selectedMove.name, selectedMove.difficulty);
    }
  };

  const handleChangeMoveExecution = (moveName: string, execution: number) => {
    const newMoves = moves.map((move) => {
      if (move.name === moveName) {
        return {
          ...move,
          execution,
        };
      }
      return move;
    });
    setMoves(newMoves);
  };

  const calculateTotalScore = () => {
    const difficultyScore = moves.reduce(
      (total, move) => total + move.difficulty,
      0
    );
    const versatilityScore = versatility * 2;
    const flowScore = 10 - flowMistakes;
    const total =
      (difficultyScore + execution + versatilityScore + flowScore) / 4;

    const roundedTotal = Math.round(total * 10) / 10;

    setTotalScore(roundedTotal);
  };

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="font-bold">Score Calculator</h1>
      <MoveList moves={moves} onExecutionChange={handleChangeMoveExecution} />

      <h2 className="font-bold">Select Moves</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <MoveSelector onSelect={handleMoveSelect} />
        <span className="text-center">or</span>
        <Separator />
        <Label htmlFor="move">Move:</Label>
        <Input
          name="move"
          type="text"
          placeholder="Move name"
          onChange={(e) => setMoveName(e.target.value)}
          required
        />
        <Label htmlFor="difficulty">Difficulty:</Label>
        <Counter
          value={moveDifficulty}
          onDecrease={() => setMoveDifficulty(Math.max(1, moveDifficulty - 1))}
          onIncrease={() => setMoveDifficulty(Math.min(5, moveDifficulty + 1))}
        />
        <Button onClick={() => addMove(moveName, moveDifficulty)}>
          Add Move
        </Button>
      </div>

      <div className="flex flex-col space-y-2 mb-4">
        <Label htmlFor="versatility">Versatility:</Label>
        <Slider
          name="versatility"
          min={0}
          max={5}
          step={1}
          defaultValue={[0]}
          onValueChange={(value) => setVersatility(value[0])}
        />
        <p>
          Versatility: <span className="font-bold">{versatility}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {versatilityHelperTexts[versatility - 1]}
        </p>
      </div>

      <div>
        <Label htmlFor="flowMistakes">Flow Mistakes:</Label>
        <Counter
          value={flowMistakes}
          onDecrease={() => setFlowMistakes(Math.max(0, flowMistakes - 1))}
          onIncrease={() => setFlowMistakes(flowMistakes + 1)}
        />
      </div>

      <Button onClick={calculateTotalScore}>Calculate Total Score</Button>

      <div>
        <h2>
          Total Score: <span className="font-bold">{totalScore}</span>
        </h2>
      </div>
    </div>
  );
};

export default ScoreCalculator;
