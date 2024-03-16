export interface WinnersForOne {
    X: string;
    Y: string;
    Z: string;
    A: string;
    B: string;
    C: string;
    [key: string]: string;
}

export interface PlayValsForOne {
  X: number;
  Y: number;
  Z: number;
  [key: string]: number;
}

export interface PlayValsForTwo {
  A: number;
  B: number;
  C: number;
  X: number;
  Y: number;
  Z: number;
  [key: string]: number;
}

export interface WinnersAndLosers {
  A: string;
  B: string;
  C: string;
  [key: string]: string;
}
