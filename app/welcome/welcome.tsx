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
      <Pacman animate={isPlaying} x={startingTileCol} y={startingTileRow} />
      <GameMap givenMap={exampleMap} className="" />
    </div>
  );
}

const Pacman = ({
  animate,
  x,
  y,
}: {
  animate: boolean;
  x: number;
  y: number;
}) => {
  // Toggle between the two images during animation
  const [toggle, setToggle] = useState(false);
  const [xPosition, setXPosition] = useState(TILE * x);
  const [yPosition, setYPosition] = useState(TILE * y);

  function isTileWall(row: number, col: number) {
    //get the GameMap[row][col]
    var tile = document.getElementById(`${row}-${col}`);
    if (tile) {
      if (tile.hasAttribute("type")) {
        return tile.getAttribute("type") === "wall";
      }
      return false;
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
      if (e.key === "ArrowUp") setYPosition((prev) => prev - TILE);
      if (e.key === "ArrowDown") setYPosition((prev) => prev + TILE);
      if (e.key === "ArrowLeft") setXPosition((prev) => prev - TILE);
      if (e.key === "ArrowRight") setXPosition((prev) => prev + TILE);
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
      style={{ left: `${xPosition}px`, top: `${yPosition}px` }}
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
