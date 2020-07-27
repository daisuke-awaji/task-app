import React from "react";
export const toClickable = (Icon: any, handleClick: any) => {
  return (
    <span style={{ cursor: "pointer" }} onClick={handleClick}>
      <Icon />
    </span>
  );
};
