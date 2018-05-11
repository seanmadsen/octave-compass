import React from 'react';
import styled from 'styled-components';
import {musicTheory} from "./Data/musicTheory";
import Note from './Utils/Note';

const StyledDiv = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

const IntervalSetName = styled.span`
  font-weight: bold;
`;

const NoteName = styled.span`
  font-weight: bold;
`;

export default function Marquee(props) {
  return (
    <StyledDiv className={props.className}>
      <IntervalSetName>{props.intervalSet.name}</IntervalSetName>
      <span> in </span>
      <NoteName>{props.noteSet.firstNote.getNameToMatch('flat').unicode}</NoteName>
    </StyledDiv>
  );
}
