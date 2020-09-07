import { writable, derived } from 'svelte/store';
import { IntervalSet } from './Utils/Music/IntervalSet';
import { IntervalSetFactory } from './Utils/Music/IntervalSetFactory';
import { ChordSet } from './Utils/Music/ChordSet';
import { NoteSet } from './Utils/Music/NoteSet';
import { Chord } from './Utils/Music/Chord';
import { Scale } from './Utils/Music/Scale';
import { Scalar } from './Utils/Math/Scalar';

/**
 * ABOUT THIS FILE:
 *
 * - The `====` line comments serve to delineate exported stores from one
 *   another.
 * - When one store needs several intermediate variables before export, I wrap
 *   it in an IIFE so that those variables can have their own scope.
 *
 * Originally, I used separate files for all these stores, which is an approach
 * that I still think has some merit. But in the end I settled on putting
 * everything into one file since it makes imports easier and derived stores
 * easier.
 *
 */

// ========================================================================== //

/**
 * A value of 0 means "Edit". When edit is enabled, the user can rotate the
 * scale and keyboard as well as toggle intervals on/off.
 * 
 * A value of 1 means "Play". When play is enabled, the user can play sounds.
 * 
 * Values in between 0 and 1 mean that the app is transitioning between states
 * and that no interaction should be possible. 
 */
export const editVsPlay = writable(1); 

// ========================================================================== //

/**
 * Which intervals are enabled.
 */
export const intervalSet = (() => {
  const {subscribe, update} = writable(IntervalSet.fromBinary(2741));

  /**
   * We run any newly computed IntervalSet through this function in order to
   * determine which Scale or Chord the new IntervalSet is. This has more of a
   * performance hit than just setting the interval set directly.
   */
  function smartUpdate(updater: (oldIntervalSet: IntervalSet) => IntervalSet) {
    update(is => IntervalSetFactory.fromIntervalSet(updater(is)));
  }
  
  return {
    subscribe, smartUpdate,
  
    /**
     * Turn on/off one interval within the set.
     */
    toggleInterval(ordinal: number) {
      smartUpdate(intervalSet => intervalSet.toggleIntervalOrdinal(ordinal));
    },
  
    /**
     * Rotate the inner scale polygon clockwise by the number (of half steps)
     * given. Note that it may fall on an intervalSet without a tonal center.
     */
    shift(rotation: number) {
      smartUpdate(intervalSet => intervalSet.shift(rotation));
    },
  
    /**
     * Rotate the inner scale polygon clockwise. When 1 is given as an argument,
     * rotate the polygon clockwise to its next vertex. When 2 is given, go 2
     * vertices and so on.
     */
    shiftMode(amount: number) {
      smartUpdate(intervalSet => intervalSet.modeShift(amount));
    },
  };
  
})();

// ========================================================================== //

/**
 * The note at the top of the wheel, as an integer. 0 means C, 1 means C
 * and so on. 
 */
export const tonalCenter = (() => {
  const {subscribe, set, update} = writable(0);

  return {
    subscribe, set, update,

    /**
     * E.g. when rotating the outer keyboard.
     */
    shift(intervalDiff: number) {
      update(tonalCenter => Scalar.wrapToOctave(tonalCenter - intervalDiff));
    },
  }
  
})();

// ========================================================================== //

/**
 * Which chords are displayed to the user.
 */
export const selectedChords = (() => {
  const {subscribe, set, update} = writable(ChordSet.fromDefaultChords);

  return {
    subscribe, set, update,

    /**
     * Turn on/off a type of chord to display within the scale.
     */
    toggle(chord: Chord) {
      update(selectedChords => selectedChords.toggleChord(chord))
    },

  };
})();

// ========================================================================== //

/**
 * True when the user is manipulating the radial keyboard.
 * 
 * This store value is redundant with the value stored in the Rotator
 * component, but this is intentional for performance reasons because we don't
 * want to re-render the Wheel component as frequently as the Rotator
 * component.
 */
export const keyboardIsRotating = writable(false);

// ========================================================================== //

/**
 * True when the user is manipulating the scale polygon.
 * 
 * This store value is redundant with the value stored in the Rotator
 * component, but this is intentional for performance reasons because we don't
 * want to re-render the Wheel component as frequently as the Rotator
 * component.
 */
export const scaleIsRotating = writable(false);

// ========================================================================== //

/**
 * Gives the set of notes that fall on the active intervals, given the tonal
 * center.
 */
export const noteSet = derived([intervalSet, tonalCenter],
  ([$intervalSet, $tonalCenter]) => 
  NoteSet.fromIntervalSet($intervalSet, -$tonalCenter).namedIfFeasible
);

// ========================================================================== //

/**
 * If the current interval set is a chord, then give the inversion of that
 * chord. If not, then give null.
 */
export const inversion = derived(intervalSet, $intervalSet => 
  $intervalSet instanceof Chord ? $intervalSet.inversion : null
);

// ========================================================================== //

/**
 * E.g. "G♭"
 */
export const tonalCenterName = derived([noteSet, inversion],
  ([$noteSet, $inversion]) =>
  $noteSet.rootNote($inversion || 0).nameToUseForLabels
);

// ========================================================================== //

/**
 * This puts the notes in the current interval set into a specific octave so
 * they can be played with audio.
 */
export const pitchSet = derived(noteSet, ($noteSet) => 
  $noteSet.pitchSetStartingFrom(4)
);

// ========================================================================== //

/**
 * The main text to display to the user that describes the current interval
 * set.
 */
export const title = derived([intervalSet, tonalCenterName],
  ([$intervalSet, $tonalCenterName]) => {
    const displayName = $intervalSet.displayName;
    if ($intervalSet instanceof Chord) {
      return `${$tonalCenterName} ${displayName} chord`
    }
    else if ($intervalSet instanceof Scale) {
      return `${$tonalCenterName} ${displayName} Scale`;
    }
    else {
      return `${displayName} in ${$tonalCenterName}`;
    }
  }
);

// ========================================================================== //

  /**
 * E.g. "1st inversion"
 */
export const inversionText = derived(inversion, $inversion => {
  const ordinalAbbreviations = [
    '0th',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
  ];
  return $inversion
    ? ` (${ordinalAbbreviations[$inversion]} inversion)`
    : undefined;
});

// ========================================================================== //

/**
 * True if we know the name of the current interval set.
 */
export const isNamed = derived(intervalSet, $intervalSet => 
  $intervalSet instanceof Chord || $intervalSet instanceof Scale
);

// ========================================================================== //
