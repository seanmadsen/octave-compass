import {musicTheory} from "../Data/musicTheory";
import Note from './Note';
import Scalar from "./Scalar";
import CustomMath from "./CustomMath";
import NoteNameSet from './NoteNameSet';

export default class NoteSet {

  /**
   * @param {Note[]} notes
   */
  constructor(notes) {
    this.notes = notes;
  }

  /**
   * Return an array of Note objects containing all possible notes.
   *
   * @return {Note[]}
   */
  static get chromaticNotes() {
    return Object.entries(musicTheory.notes)
      .map(([index, noteData]) => new Note(noteData));
  }

  /**
   * Return a new note set based on a given interval set and rotation.
   *
   * @param {IntervalSet} intervalSet
   *
   * @param {number} rotation
   *   The rotation of the keyboard (clockwise)
   *
   * @return {NoteSet}
   */
  static fromIntervalSet(intervalSet, rotation) {
    const allNotes = this.chromaticNotes;
    const notes = intervalSet.toArray().map(i =>
      allNotes[Scalar.wrap(i - rotation, musicTheory.octaveDivisions)]
    );
    return new NoteSet(notes);
  }

  /**
   * How many notes are in this notes set?
   *
   * @return {number}
   */
  get count() {
    return this.notes.length;
  }

  /**
   * Returns an array containing one value per note in this set. Each value is
   * an array of possible modifiers for different ways that note can be named.
   *
   * @return {[[string]]}
   *   e.g. for a C major chord:
   *   [
   *     ['natural', 'sharp', 'doubleFlat'],
   *     ['natural', 'flat', 'doubleSharp'],
   *     ['natural', 'doubleSharp', 'doubleFlat'],
   *   ]
   */
  get possibleModifiersForEachNoteName() {
    return this.notes.map(note => Object.keys(note.names));
  }

  /**
   * This is the big one. This function generates ALL the possible sets of note
   * NAMES for the notes within this note set. For example, say we have a set
   * of 7 notes and each note has three possible names. The total possible note
   * name sets is 3^7 = 2187.
   *
   */
  get possibleNoteNameSets() {
    return CustomMath.cartesianProduct(...this.possibleModifiersForEachNoteName)
      .map(modifierKeys => NoteNameSet.fromModifiers(this, modifierKeys));
  }

  //get bestNoteNameSet

}