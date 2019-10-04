import { IntervalSetFactory } from "./../Music/IntervalSetFactory";
import { Scalar } from "./../Math/Scalar";
import { IntervalSetBinary } from "./../Music/IntervalSetBinary";
import { IntervalSet } from "../Music/IntervalSet";

const separator = '-';
const defaultIntervalSetBin = 0b101010110101;
const defaultTonalCenter = 0;

export interface ParseResult {
  intervalSet: IntervalSet;
  tonalCenter: number;
}

/**
 * This app keeps the browser URL in sync with some of the state values. This
 * class provides functions for converting state values to a URL and
 * converting a URL to state values.
 */
export class Url {

  /**
   * Clean up input strings to match our desired formatting.
   */
  static normalize(url: string): string {
    return url.replace(/[^0-9-]/g, '');
  }

  /**
   * Test two URL paths for equality.
   */
  static pathsAreEqual(a: string, b: string): boolean {
    return Url.normalize(a) === Url.normalize(b);
  }

  /**
   * Parse a URL to determine the state that it represents.
   */
  static parse(url: string): ParseResult {
    const parts = Url.normalize(url).split(separator);
    const parsedIntervalSetBin =
      parseInt(parts[0], 10) || defaultIntervalSetBin;
    const validIntervalSetBin =
      IntervalSetBinary.guaranteedToContainTonalCenter(parsedIntervalSetBin);
    const intervalSet = IntervalSetFactory.fromBinary(validIntervalSetBin);
    const parsedTonalCenter = parseInt(parts[1], 10) || defaultTonalCenter;
    const tonalCenter = Scalar.wrapToOctave(parsedTonalCenter);
    return {
      intervalSet: intervalSet,
      tonalCenter: tonalCenter,
    };
  }

  /**
   * Generate a URL that encapsulates the supplied state.
   */
  static generate(intervalSet: IntervalSet, tonalCenter: number): string {
    let result = '';
    result += intervalSet.binary;
    if (tonalCenter) {
      result += separator + tonalCenter;
    }
    return result;
  }

}