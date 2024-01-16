import React from "react";
const Col = ({ style = {}, span = 12, children, ...props }) => {
  const { layout, gap, index } = props;

  return (
    <div
      style={{
        ...style,
        width: `calc(${layout ? (100 / layout) * span : 100}% - ${
        (layout/span-1)*gap[1]/(layout/span)   
        }px)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Col;
