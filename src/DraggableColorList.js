import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
const DraggableColorList = SortableContainer((props) => {
  const { colors, deletePalette } = props;
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          deletePalette={deletePalette}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
