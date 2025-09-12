export type tileType = "standard" | "wall" | "coin";

export const Tile = ({
  type,
  id,
  size,
}: {
  type: tileType;
  id: string;
  size: number;
}) => {
  return (
    <div
      id={id}
      className={`relative ${tileColor(type)}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

function tileColor(type: tileType) {
  if (type === "coin") {
    return "bg-yellow-500";
  } else if (type === "wall") return "bg-purple-900";
  return "bg-black";
}
