let temperature = 0;

export const getTemperature = () => {
  return temperature;
};

export const setTemperature = (newTemperature: number) => {
  temperature = newTemperature;
};
