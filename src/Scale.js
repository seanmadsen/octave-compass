import React from 'react';
import Polygon from "./Polygon.js";

const RADIUS = 56;

export default function Scale(props) {
  let intervals = [0, 2, 4, 5, 7, 9, 11];
  let points = intervals.map(v => [v, RADIUS]);
  return (
    <Polygon points={points}/>
  );
}