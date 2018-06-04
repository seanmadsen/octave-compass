/**
 * This represents a set of chords.
 */
export default class ChordSet {

  /**
   * The chords in this set.
   *
   * @type {Chord[]}
   */
  chords = [];

  constructor(chords) {
    this.chords = chords;
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
   * Compare two chords to determine how they should be sorted.
   *
   * @param {Chord} chordA
   * @param {Chord} chordB
   */
  static chordSortOrder(chordA, chordB) {
    return chordA.weight - chordB.weight;
  }

  /**
   * Return an array of the chords in this set, correctly sorted.
   */
  get orderedChords() {
    return this.chords.slice(0).sort(ChordSet.chordSortOrder);
  }

  /**
   * If you stack all the emblems, end to end, how big would they be?
   *
   * @return {number}
   */
  get totalEmblemSize() {
    return this.chords
      .map(chord => chord.emblemSize || 0)
      .reduce((a, b) => a + b, 0);
  }

  /**
   * Return true if this set contains the given chord, false otherwise.
   *
   * @param {Chord} chord
   * @return {boolean}
   */
  containsChord(chord) {
    return this.chords.some(c => c.binary === chord.binary);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord added. If the given chord was already in the set, then the set
   * will be returned as-is.
   *
   * @param {Chord} chord
   * @return {ChordSet}
   */
  addChord(chord) {
    const chords = this.chords.slice(0);
    if (!this.containsChord(chord)) {
      chords.push(chord);
    }
    return new ChordSet(chords);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord removed. If the given chord was not in the set to begin with,
   * then the set will be returned as-is.
   *
   * @param {Chord} chord
   * @return {ChordSet}
   */
  removeChord(chord) {
    const chords = this.chords.filter(c => c.binary !== chord.binary);
    return new ChordSet(chords);
  }

  /**
   * Return a new ChordSet that's identical to this ChordSet, except with the
   * given chord toggled. If the chord is already present, then remove it. If
   * the chord is not present, then add it.
   *
   * @param {Chord} chord
   * @return {ChordSet}
   */
  toggleChord(chord) {
    return this.containsChord(chord) ?
      this.removeChord(chord) : this.addChord(chord);
  }

}