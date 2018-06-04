import React, {Component} from 'react';
import IrPoint from "Utils/Geometry/IrPoint";
import styled from 'styled-components';
import Angle from "Utils/Geometry/Angle";

const fontSizeToEmblemSizeRatio = 0.85;

const Background = styled.circle`
  fill: ${props => props.color || 'grey'};
`;

const Symbol = styled.text`
  fill: white;
  font-size: ${props => props.fontSize}px;
  tspan.bold {
    font-weight: bold;
  }
  tspan.italic {
    font-style: italic;
  }
`;

const HighlightableG = styled.g`
  & * {
    cursor: pointer;
  }
  &:hover ${Background} {
    filter: url('#playing-highlight');
    stroke: yellow;
    stroke-width: 2px;
  }
`;

const NonHighlightableG = styled.g`
  & * {
    cursor: grab;
  }
`;

export default class ChordEmblem extends Component {

  handleMouseDown(e) {
    const shiftedChord = this.props.chord.shift(this.props.interval);
    this.props.playIntervals(shiftedChord.ordinals);
  }

  fontSize() {
    return this.props.size * this.props.chord.textSizeFactor
      * fontSizeToEmblemSizeRatio;
  }

  render() {
    const point = new IrPoint(this.props.interval, this.props.radialPosition)
      .toXy();
    const rotation = -Angle.iToD(this.props.rotation);
    let transform = `translate(${point.x} ${point.y}) rotate(${rotation})`;
    const G = this.props.somethingIsRotating ?
      NonHighlightableG : HighlightableG;
    return (
      <G
        transform={transform}
        className={this.props.className}
        onMouseDown={e => this.handleMouseDown(e)}
      >
        <Background
          cx={0} cy={0}
          r={this.props.size}
          color={this.props.chord.color}
        />
        <Symbol
          x={0} y={0}
          dangerouslySetInnerHTML={{__html: this.props.chord.symbol}}
          dominantBaseline={'middle'} // TODO address lack of IE support
          textAnchor={'middle'}
          fontSize={this.fontSize()}
        />
      </G>
    );
  }
  
}