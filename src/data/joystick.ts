let joystickInfo = { x: 0, y: 0, direction: "" };

export type JoystickInfo = typeof joystickInfo;

export const getJoystickInfo = () => {
  return { ...joystickInfo };
};

export const setJoystickInfo = (info: JoystickInfo) => {
  joystickInfo = { ...info };
};
