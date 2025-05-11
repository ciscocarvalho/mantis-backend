export enum Led {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export enum LedState {
  ON = "on",
  OFF = "off",
}

const ledStateMap = {
  [Led.RED]: LedState.OFF,
  [Led.GREEN]: LedState.OFF,
  [Led.BLUE]: LedState.OFF,
};

export type LedStateMap = typeof ledStateMap;

export type LedStateKey = keyof LedStateMap;

export type LedStateValue = LedStateMap[LedStateKey];

export const ledIdToName = (led: Led): "red" | "green" | "blue" => {
  switch (led) {
    case Led.RED:
      return "red";
    case Led.GREEN:
      return "green";
    case Led.BLUE:
      return "blue";
  }
};

export const ledNameToId = (name: string): Led => {
  switch (name) {
    case "red":
      return Led.RED;
    case "green":
      return Led.GREEN;
    case "blue":
      return Led.BLUE;
    default:
      throw new Error("Abandon ship");
  }
};

export const getLedStates = (): LedStateMap => {
  return { ...ledStateMap };
};

export const getLedState = (led: Led): LedStateValue => {
  return ledStateMap[led];
};

export const setLedState = (led: Led, state: LedState) => {
  ledStateMap[led] = state;
};
