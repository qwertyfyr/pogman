import { useEffect, useState } from "react";
import pauseman from "../assets/pogman0.png";
import { exampleMap, GameMap } from "../components/GameMap";
export const TILE = 40; // Allow every component to have access to the default size of a singular tile.
export function Welcome() {
  const startingTileCol = 9;
  const startingTileRow = 13;
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
      if (e.key === "ArrowUp" && canMoveToTile(position.row - 1, position.col))
        setPosition((prev) => {
          return { ...prev, row: prev.row-- };
        });
      if (
        e.key === "ArrowDown" &&
        canMoveToTile(position.row + 1, position.col)
      )
        setPosition((prev) => {
          return { ...prev, row: prev.row++ };
        });
      if (
        e.key === "ArrowLeft" &&
        canMoveToTile(position.row, position.col - 1)
      )
        setPosition((prev) => {
          return { ...prev, col: prev.col-- };
        });
      if (
        e.key === "ArrowRight" &&
        canMoveToTile(position.row, position.col + 1)
      )
        setPosition((prev) => {
          return { ...prev, col: prev.col++ };
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
        top: `${position.row * TILE}px`,
        left: `${position.col * TILE}px`,
      }}
    >
      <img src={pauseman} style={{ width: `${TILE}px`, height: `${TILE}px` }} />
    </div>
  );
};
