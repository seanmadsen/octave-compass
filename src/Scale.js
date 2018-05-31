import React from 'react';
import Polygon from "./Polygon";
import IrPoint from './Utils/IrPoint'
import styled from 'styled-components';
import Rotatable from "./Rotatable";
import SwarmOfChords from "./SwarmOfChords";
import Brand from "./Brand";

const RADIUS = 310;

const Background = styled(Polygon)`
  fill: #E1E1E1;
  filter: url(#drop-shadow);
  stroke: #f7f7f7;
  stroke-width: 3px;
  cursor: grab;
`;

function Scale(props) {
  const intervals = props.intervalSet.ordinals;
  const points = intervals.map(i => IrPoint.fromArray([i, RADIUS]));
  return (
    <g>
      <Background points={points}/>
      <Brand rotation={props.rotation}/>
      <SwarmOfChords
        intervalSet={props.intervalSet}
        selectedChords={props.selectedChords}
        rotation={props.rotation}
        somethingIsRotating={props.somethingIsRotating}
        playIntervals={props.playIntervals}
      />
    </g>
  );
}

export default Rotatable(Scale);
