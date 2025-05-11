let buttonsInfo = {
  a: { state: "unpressed" },
  b: { state: "unpressed" },
};

export type ButtonsInfo = typeof buttonsInfo;

export const getButtonsInfo = () => {
  return { ...buttonsInfo };
};

export const setButtonsInfo = (info: ButtonsInfo) => {
  buttonsInfo = { ...info };
};

export const getButtonInfo = (button: keyof ButtonsInfo) => {
  return buttonsInfo[button];
};

export const setButtonInfo = (button: keyof ButtonsInfo, info: ButtonsInfo[keyof ButtonsInfo]) => {
  buttonsInfo[button] = info;
};
