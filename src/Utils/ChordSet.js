import Chord from './Chord';
import IntervalSetFactory from "./IntervalSetFactory";

/**
 * This represents a set of chords at a given interval within a scale.
 */
export default class ChordSet {

  /**
   * The chords in this set.
   *
   * @type {Chord[]}
   */
  chords = [];

  /**
   * The interval ordinal at which this chord set exists.
   *
   * @type {number}
   */
  ordinal = 0;

  constructor(chords, ordinal) {
    this.chords = chords;
    this.ordinal = ordinal;
  }

  /**
   * How many chords are in this chord set?
   *
   * @return {number}
   */
  get count() {
    return this.chords.length;
  }

  /**
   * Generate a new chord set which exists at the given ordinal within the
   * given interval set.
   *
   * @param intervalSet
   * @param ordinal
   * @param possibleChords
   * @return {ChordSet}
   */
  static atOrdinal(intervalSet, ordinal, possibleChords) {
    let chords = [];
    possibleChords.forEach(chord => {
      const shiftedChord = IntervalSetFactory.fromShift(chord, ordinal);
      if (intervalSet.contains(shiftedChord)) {
        chords.push(chord);
      }
    });
    return new ChordSet(chords, ordinal);
  }

}