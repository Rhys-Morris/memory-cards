import React from "react";

export default function Card({ html, onClick }) {
  return <img onClick={onClick} className="card" src={html} />;
}
