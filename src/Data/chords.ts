export interface ChordData {
  binary: number;
  name: string;
  weight: number;
  emblemSize: number;
  textSizeFactor: number;
  color: string;
  symbol: string;
  inversion?: number | null | undefined;
}

export const chords: ChordData[] = [
  {
    binary: 0b000010010001,
    name: "major",
    weight: 1,
    emblemSize: 1,
    textSizeFactor: 1,
    color: '#46ba19',
    symbol: '<tspan class="bold">M</tspan>',
  },
  {
    binary: 0b000010001001,
    name: "minor",
    weight: 2,
    emblemSize: 0.9,
    textSizeFactor: 1,
    color: '#2d5da6',
    symbol: '<tspan class="italic">m</tspan>',
  },
  {
    binary: 0b000010000101,
    name: "suspended 2",
    weight: 3,
    emblemSize: 0.7,
    textSizeFactor: 0.9,
    color: '#18c0ce',
    symbol: 'sus2',
  },
  {
    binary: 0b000010100001,
    name: "suspended 4",
    weight: 4,
    emblemSize: 0.7,
    textSizeFactor: 0.9,
    color: '#1bceb1',
    symbol: 'sus4',
  },
  {
    binary: 0b000100010001,
    name: "augmented",
    weight: 5,
    emblemSize: 0.7,
    textSizeFactor: 2,
    color: '#b7a18d',
    symbol: '<tspan class="bold">+</tspan>',
  },
  {
    binary: 0b000001001001,
    name: "diminished",
    weight: 6,
    emblemSize: 0.6,
    textSizeFactor: 1.7,
    color: '#ba5319',
    symbol: '<tspan dy="-0.4em" font-size="70%">o</tspan>',
  },
  {
    binary: 0b010010010001,
    name: "dominant 7",
    weight: 7,
    emblemSize: 0.7,
    textSizeFactor: 1.5,
    color: '#551654',
    symbol: '<tspan dy="-0.2em" font-size="70%">7</tspan>',
  },
  {
    binary: 0b100010010001,
    name: "major 7",
    weight: 8,
    emblemSize: 0.6,
    textSizeFactor: 1,
    color: '#9149aa',
    symbol: 'M<tspan dy="-0.5em" font-size="70%">7</tspan>',
  },
  {
    binary: 0b010010001001,
    name: "minor 7",
    weight: 9,
    emblemSize: 0.6,
    textSizeFactor: 1,
    color: '#9a6b2b',
    symbol: '<tspan class="italic">m</tspan><tspan dy="-0.5em" font-size="70%">7</tspan>',
  },
  {
    binary: 0b100010001001,
    name: "minor-major 7",
    weight: 10,
    emblemSize: 0.6,
    textSizeFactor: 0.85,
    color: '#85800c',
    symbol: '<tspan class="italic">m</tspan><tspan dy="-0.5em" font-size="70%">M7</tspan>',
  },
  {
    binary: 0b001010001001,
    name: "minor 6",
    weight: 11,
    emblemSize: 0.6,
    textSizeFactor: 1.15,
    color: '#9a225c',
    symbol: '<tspan class="italic">m</tspan><tspan dy="-0.5em" font-size="70%">6</tspan>',
  },
  {
    binary: 0b010100010001,
    name: "augmented 7",
    weight: 12,
    emblemSize: 0.6,
    textSizeFactor: 1.2,
    color: '#8d786a',
    symbol: '<tspan class="bold">+</tspan><tspan dy="-0.5em" font-size="70%">7</tspan>',
  },
  {
    binary: 0b100100010001,
    name: "augmented major 7",
    weight: 13,
    emblemSize: 0.6,
    textSizeFactor: 1,
    color: '#748d64',
    symbol: '<tspan class="bold">+</tspan><tspan dy="-0.5em" font-size="70%">M7</tspan>',
  },
  {
    binary: 0b001001001001,
    name: "diminished 7",
    weight: 14,
    emblemSize: 0.5,
    textSizeFactor: 1.5,
    color: '#5f4f46',
    symbol: '<tspan dy="-0.3em" font-size="70%">o7</tspan>',
  },
];
