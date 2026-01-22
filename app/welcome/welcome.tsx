import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import pauseman from "../assets/pogman0.png";
import { exampleMap, GameMap, replaceCharInMap } from "../components/GameMap";
export const TILE = 40;
const startingTileCol = 9;
const startingTileRow = 12;

export function Welcome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  return (
    <div className="w-full gap-2">
      {/*Toggle between whether or not pacman is playing */}
      <button
        onClick={() => {
          setIsPlaying((prev) => !prev);
          !isPlaying && setScore(0);
        }}
        className="bg-slate-500"
      >
        {String(isPlaying)}
      </button>
      <p>Score: {score}</p>
      <Pacman
        alive={isPlaying}
        col={startingTileCol}
        row={startingTileRow}
        setScore={setScore}
      />
      <GameMap givenMap={exampleMap} />
    </div>
  );
}

export function canMoveToTile(row: number, col: number) {
  return exampleMap[row][col] !== "B";
}

const Pacman = ({
  alive,
  col,
  row,
  setScore,
}: {
  alive: boolean;
  col: number;
  row: number;
  setScore: Dispatch<SetStateAction<number>>;
}) => {
  const [direction, setDirection] = useState<
    "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined
  >();
  const [position, setPosition] = useState({ row, col });

  const directionRef = useRef(direction);
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);
  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  function updateScore(row: number, col: number) {
    if (exampleMap[row][col] === "C") setScore((prev) => prev + 100);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!alive || !e.key.startsWith("Arrow")) return;
    e.preventDefault();

    const pos = positionRef.current;
    setDirection((prev) => {
      let newDirection = prev;
      switch (e.key) {
        case "ArrowUp":
          if (canMoveToTile(pos.row - 1, pos.col)) newDirection = "UP";
          break;

        case "ArrowDown":
          if (canMoveToTile(pos.row + 1, pos.col)) newDirection = "DOWN";
          break;

        case "ArrowLeft":
          if (canMoveToTile(pos.row, pos.col - 1)) newDirection = "LEFT";
          break;

        case "ArrowRight":
          if (canMoveToTile(pos.row, pos.col + 1)) newDirection = "RIGHT";
          break;
      }
      return newDirection;
    });
  }

  function move(direction: "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined) {
    if (!direction) return null;
    setPosition((prev) => {
      let newRow = prev.row;
      let newCol = prev.col;
      direction == "UP" && (newRow = prev.row - 1);
      direction == "DOWN" && (newRow = prev.row + 1);
      direction == "LEFT" && (newCol = prev.col - 1);
      direction == "RIGHT" && (newCol = prev.col + 1);
      if (canMoveToTile(newRow, newCol)) {
        updateScore(newRow, newCol);
        replaceCharInMap(exampleMap, newRow, newCol, "O");
        return { row: newRow, col: newCol };
      }
      return { row: prev.row, col: prev.col };
    });
  }

  useEffect(() => {
    if (!alive) {
      setDirection(undefined);
      setPosition({ row: startingTileRow, col: startingTileCol });
      return;
    }

    document.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(() => {
      move(directionRef.current);
    }, 200);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [alive]);

  return (
    <>
      <div
        className={`relative z-10`}
        style={{
          top: `${position.row * TILE + TILE}px`,
          left: `${position.col * TILE}px`,
        }}
      >
        <img
          src={pauseman}
          style={{ width: `${TILE}px`, height: `${TILE}px` }}
        />
      </div>
      <div className="size-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-amber-400" />
    </>
  );
};
