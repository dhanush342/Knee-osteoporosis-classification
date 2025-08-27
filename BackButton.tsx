import React from "react";

const BackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    style={{
      position: "absolute",
      top: 16,
      left: 16,
      background: "none",
      border: "none",
      color: "#007bff",
      fontSize: 18,
      cursor: "pointer",
    }}
    onClick={onClick ? onClick : () => window.history.back()}
    aria-label="Go back"
  >
    &#8592; Back
  </button>
);

export default BackButton;