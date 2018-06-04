import ChordSet from "Utils/Music/ChordSet";
import Chord from "Utils/Music/Chord";

const majorChord = Chord.fromBinary(0b000010010001);
const anotherMajorChord = Chord.fromBinary(0b000010010001);
const dominant7Chord = Chord.fromBinary(0b010010010001);
const diminishedChord = Chord.fromBinary(0b0000001001001);

const majorAndDiminished = new ChordSet([
  majorChord,
  diminishedChord
]);
const dominant7AndMajor = new ChordSet([
  dominant7Chord,
  majorChord,
]);
const majorAndMajorAndDiminished = new ChordSet([
  majorChord,
  anotherMajorChord,
  diminishedChord
]);

test('count', () => {
  expect(majorAndDiminished.count).toBe(2);
});

test('totalEmblemSize', () => {
  expect(majorAndDiminished.totalEmblemSize).toBeGreaterThan(0);
});

test('containsChord', () => {
  expect(majorAndDiminished.containsChord(majorChord)).toBe(true);
  expect(majorAndDiminished.containsChord(dominant7Chord)).toBe(false);
});

test('addChord', () => {
  expect(majorAndDiminished.addChord(dominant7Chord).count).toBe(3);
  expect(majorAndDiminished.addChord(majorChord).count).toBe(2);
});

test('removeChord', () => {
  expect(majorAndDiminished.removeChord(majorChord).count).toBe(1);
  expect(majorAndDiminished.removeChord(dominant7Chord).count).toBe(2);
});

test('toggleChord', () => {
  expect(majorAndDiminished.toggleChord(majorChord).count).toBe(1);
  expect(majorAndDiminished.toggleChord(dominant7Chord).count).toBe(3);
});

test('uniqueChords', () => {
  expect(ChordSet.uniqueChords([majorChord, anotherMajorChord])
    .map(chord => chord.defaultName)
  ).toEqual(['major'])
});

test('sortedChords', () => {
  expect(ChordSet.sortedChords([dominant7Chord, majorChord])
    .map(chord => chord.defaultName)
  ).toEqual(['major', 'dominant 7'])
});

test('ensure that chords are sorted and unique', () => {
  expect(dominant7AndMajor.chords.map(c => c.defaultName))
    .toEqual(['major', 'dominant 7']);
  expect(majorAndDiminished.chords.map(c => c.defaultName))
    .toEqual(['major', 'diminished']);
  expect(majorAndMajorAndDiminished.chords.map(c => c.defaultName))
    .toEqual(['major', 'diminished']);
});
