import { useEffect, useState } from "react";
import pauseman from "../assets/pogman0.png";
import { exampleMap, GameMap } from "../components/GameMap";
export const TILE = 40;
export function Welcome() {
  const startingTileCol = 9;
  const startingTileRow = 12;
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="w-full gap-2">
      {/*Toggle between whether or not pacman is playing */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="bg-slate-500"
      >
        {String(isPlaying)}
      </button>
      <Pacman alive={true} col={startingTileCol} row={startingTileRow} />
      <GameMap givenMap={exampleMap} />
    </div>
  );
}

const Pacman = ({
  alive,
  col,
  row,
}: {
  alive: boolean;
  col: number;
  row: number;
}) => {
  const [position, setPosition] = useState({ row, col });

  function canMoveToTile(row: number, col: number) {
    return exampleMap[row][col] !== "B";
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (alive && e.key.startsWith("Arrow")) {
      e.preventDefault();
      setPosition((prev) => {
        let newRow = prev.row;
        let newCol = prev.col;

        if (e.key === "ArrowUp" && canMoveToTile(prev.row - 1, prev.col))
          newRow = prev.row - 1;
        else if (e.key === "ArrowDown" && canMoveToTile(prev.row + 1, prev.col))
          newRow = prev.row + 1;
        else if (e.key === "ArrowLeft" && canMoveToTile(prev.row, prev.col - 1))
          newCol = prev.col - 1;
        else if (
          e.key === "ArrowRight" &&
          canMoveToTile(prev.row, prev.col + 1)
        )
          newCol = prev.col + 1;

        return { row: newRow, col: newCol };
      });
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`relative z-10`}
      style={{
        top: `${position.row * TILE + TILE}px`,
        left: `${position.col * TILE}px`,
      }}
    >
      <img src={pauseman} style={{ width: `${TILE}px`, height: `${TILE}px` }} />
    </div>
  );
};
