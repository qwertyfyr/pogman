import { TILE } from "~/welcome/welcome";
import { Tile } from "./blocks/Tile";

export const GameMap = ({
  givenMap,
  className,
}: {
  givenMap: string[];
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      {givenMap.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row
            .split("")
            .map((char, colIndex) =>
              renderCell(char, `${rowIndex}-${colIndex}`)
            )}
        </div>
      ))}
    </div>
  );
};

function renderCell(char: string, key: string) {
  switch (char) {
    case "O":
      return <Tile id={key} key={key} size={TILE} type="O" />;
    case "B":
      return <Tile id={key} key={key} size={TILE} type="B" />;
    case "C":
      return <Tile id={key} key={key} size={TILE} type="C" />;
  }
}

export var exampleMap = [
  "BBBBBBBBBBBBBBBBBBB",
  "BCCCCCCCCBCCCCCCCCB",
  "BCBBCBBBCBCBBBCBBCB",
  "BCBBCBBBCBCBBBCBBCB",
  "BCCCCCCCCCCCCCCCCCB",
  "BCBBCBCBBBBBCBCBBCB",
  "BCCCCBCCCBCCCBCCCCB",
  "BBBBCBBBOBOBBBCBBBB",
  "BBBBCBOOOOOOOBCBBBB",
  "BBBBCBOBBOBBOBCBBBB",
  "OOOOCOOBOOOBOOCOOOO",
  "BBBBCBOBBBBBOBCBBBB",
  "BBBBCBOOOOOOOBCBBBB",
  "BBBBCBOBBBBBOBCBBBB",
  "BCCCCCCCCBCCCCCCCCB",
  "BCBBCBBBCBCBBBCBBCB",
  "BCCBCCCCCCCCCCCBCCB",
  "BBCBCBCBBBBBCBCBCBB",
  "BCCCCBCCCBCCCBCCCCB",
  "BCBBBBBBCBCBBBBBBCB",
  "BCCCCCCCCCCCCCCCCCB",
  "BBBBBBBBBBBBBBBBBBB",
];

export function replaceCharInMap(
  map: string[],
  row: number,
  col: number,
  newChar: string
) {
  if (map[row][col] == "O") return;
  const rowArray = map[row].split("");
  rowArray[col] = newChar;
  map[row] = rowArray.join("");
}
 