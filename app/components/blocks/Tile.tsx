export type tileType = "B" | "O" | "C";

export type Props = {
  tileType: tileType;
  id: string;
  size: number;
};

export const Tile = ({ props }: { props: Props }) => {
  return (
    <div
      id={props.id}
      className={`relative ${tileColor(props.tileType)}`}
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    />
  );
};

function tileColor(type: tileType) {
  if (type === "C") {
    return "bg-yellow-500";
  } else if (type === "B") return "bg-purple-900";
  return "bg-black";
}
