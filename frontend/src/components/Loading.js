import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const Loading = ({ size = 65 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: size,
          height: size,
        }}
      >
        <span className="visually-hidden"></span>
      </Spinner>
    </div>
  );
};
