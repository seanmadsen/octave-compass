import React, {Component} from 'react';
import IrPoint from "./Utils/IrPoint";
import styled from 'styled-components';
import Angle from "./Utils/Angle";

const radius = 322;
const size = 60;

const StyledG = styled.g`
  opacity: ${props => (props.active) ? '1' : '0.3'};
`;

const StyledRect = styled.rect`
  fill: ${props => (props.color === 'white') ? 'white' : 'black'};
`;

const StyledText = styled.text`
  font-size: 35px;
  fill: ${props => (props.color === 'white') ? 'black' : 'white'};
`;

export default function KeyLabel(props) {
  let point = (new IrPoint(props.interval, radius)).toXy();
  let rotation = -Angle.iToD(props.rotation);
  let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
  return (
    <StyledG active={props.active} transform={transform}>

      <StyledRect
        x={-size/2} y={-size/2}
        width={size} height={size}
        rx={size/6}  ry={size/6}
        color={props.color}
      />

      <StyledText
        x={0}
        y={0.75}
        dominantBaseline={'middle'} // TODO address lack of IE support
        textAnchor={'middle'}
        color={props.color}
      >
        {props.children}
      </StyledText>

    </StyledG>
  );
}
