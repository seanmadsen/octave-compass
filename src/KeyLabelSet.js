import React, {Component} from "react";
import KeyLabel from "KeyLabel";
import styled from "styled-components";
import Arc from "Arc";

const spread = 0.20;
const tieRadius = 348;
const tieSpan = 0.2;
const tieWidth = 50;

const ActiveG = styled.g`
  opacity: 1;
  & * {
    cursor: pointer;
  }
  &:hover {
    filter: url('#playing-highlight');
  }
`;

const InactiveG = styled.g`
  opacity: 0.25;
  & * {
    cursor: grab;
  }
`;

const LabelTie = styled(Arc)`
  stroke: ${props => props.color};
  stroke-width: ${tieWidth}px;
`;

export default class KeyLabelSet extends Component {

  handleMouseDown(event) {
    if (!this.props.playNotes) {
      return;
    }
    this.props.playNotes([this.props.pitch.note.id]);
  }

  /**
   * Return a LabelTie if needed
   *
   * @param nameCount
   * @return {LabelTie|null}
   */
  labelTie(nameCount) {
    if (nameCount < 2) {
      return null;
    }
    return <LabelTie
      startInterval={this.props.pitch.note.id - tieSpan}
      endInterval={this.props.pitch.note.id + tieSpan}
      color={this.props.pitch.note.color}
      radius={tieRadius}
    />;
  }

  /**
   * Generate an array of KeyLabel objects from an array of NoteName objects.
   *
   * @param {NoteName[]} names
   * @return {KeyLabel[]}
   */
  labels(names) {
    let result = [];
    const nameCount = names.length;
    names.forEach((name, index) => {
      const discreteWidth = nameCount - 1;
      const discreteOffset = (2 * index) - discreteWidth;
      const interval = this.props.pitch.note.id + (discreteOffset * spread);
      result.push(
        <KeyLabel
          key={index}
          interval={interval}
          rotation={this.props.rotation}
          color={this.props.pitch.note.color}
          active={this.props.active}
          parenthetical={nameCount > 1 && name.modifier.name === 'natural'}
        >
          {name.unicode}
        </KeyLabel>
      );
    });
    return result;
  }

  render() {
    const names = this.props.pitch.note.namesToUseForLabels;
    const G = this.props.active ? ActiveG : InactiveG;
    return (
      <G
        active={this.props.active}
        onMouseDown={e => this.handleMouseDown(e)}
      >
        {this.labelTie(names.length)}
        <g>{this.labels(names)}</g>
      </G>
    );
  }

}
