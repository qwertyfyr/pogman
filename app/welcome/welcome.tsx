import { useEffect, useState } from "react";
import pauseman from "../assets/pogman0.png";
import pogman from "../assets/pogman1.png";
import { exampleMap, GameMap } from "~/components/GameMap";
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
      <Pacman animate={isPlaying} col={startingTileCol} row={startingTileRow} />
      <GameMap givenMap={exampleMap} />
    </div>
  );
}

const Pacman = ({
  animate,
  col,
  row,
}: {
  animate: boolean;
  col: number;
  row: number;
}) => {
  // Toggle between the two images during animation
  const [toggle, setToggle] = useState(false);
  const [currentCol, setCurrentCol] = useState(col);
  const [currentRow, setCurrentRow] = useState(row);

  function canMoveToTile(row: number, col: number) {
    //get the GameMap[row][col]
    var tile = document.getElementById(`${row}-${col}`);
    console.log(tile);
    try {
      if (tile) {
        console.log("has tile");
        if (tile.hasAttribute("type")) {
          console.log("has attribute");
          return tile.getAttribute("type") === "wall";
        }
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // update toggle every 500ms when active
  useEffect(() => {
    if (animate) {
      var interval = setInterval(() => {
        setToggle((prev) => !prev);
      }, 500);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp")
        canMoveToTile(currentRow, currentCol) &&
          setCurrentRow((prev) => prev - 1);
      if (e.key === "ArrowDown") setCurrentRow((prev) => prev + 1);
      if (e.key === "ArrowLeft") setCurrentCol((prev) => prev - 1);
      if (e.key === "ArrowRight") setCurrentCol((prev) => prev + 1);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [animate]);

  return (
    <div
      className={`relative z-10`}
      style={{ left: `${currentCol * TILE}px`, top: `${currentRow * TILE}px` }}
    >
      {animate ? (
        <img
          src={toggle ? pogman : pauseman}
          style={{ width: `${TILE}px`, height: `${TILE}px` }}
        />
      ) : (
        <img
          src={pauseman}
          style={{ width: `${TILE}px`, height: `${TILE}px` }}
        />
      )}
    </div>
  );
};
