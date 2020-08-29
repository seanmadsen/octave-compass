import {musicTheory} from "./../../Data/musicTheory";

const PI = Math.PI;

/**
 * Helper functions to deal with plain scalar numbers
 */
export class Scalar {

  /**
   * Ensure that `value` is within a range between two numbers, specified by
   * `bounds`. If `value` is below the minimum, then it's shifted up enough to
   * make it fall within the bounds. If `value` is greater than `max`, then it's
   * shifted down to make it fall within the bounds.
   *
   * @param value The value to be shifted.
   *
   * @param bounds If you only give one number as a bound, then we'll assume 0
   * is the other bound. If you give two numbers, then they will both be used,
   * and you can give them in either order.
   *
   * @throws Error if bounds are zero width.
   */
  static wrap(value: number, ...bounds: [number] | [number, number]): number {
    const b = bounds.length === 1 ? [bounds[0], 0] : bounds;
    const min = Math.min(...b);
    const max = Math.max(...b);
    const intervalWidth = max - min;
    if (intervalWidth === 0) {
      throw new Error('Wrap bounds must have a width greater than zero.');
    }
    if (value < min) {
      return max - ((min - value) % intervalWidth);
    }
    else if (value >= max) {
      return min + ((value - max) % intervalWidth);
    }
    return value;
  }

  /**
   * Ensure that `value` is within range between 0 and the number of octave
   * divisions (typically 12).
   */
  static wrapToOctave(value: number): number {
    return Scalar.wrap(value, musicTheory.octaveDivisions);
  }

  /**
   * Return the factor by which a radius should be reduced when it lies on the
   * edge between two keys. We want to reduce it so that we get straight lines
   * between keys.
   */
  static get rFactorAtEdge(): number {
    return Math.cos(PI / musicTheory.octaveDivisions);
  }

}