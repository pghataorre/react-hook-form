// Random functions that include JS functions that need to be mocked
// An exercise to show how to mock FUNCTIONS in Jest using jest.fn();

export const orderFilmData = (data) => {
  return data.sort((a, b) => a.label.localeCompare(b.label));
}

export const randomGenerateBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
};

export const generateUUID = () => {
  return crypto.randomUUID();
};

export const getTodaysDate = () => {
  return new Date();
}


export const getRemainingTime = (endDate, startDate = new Date()) => {
  let delta = (endDate.getTime() - startDate.getTime()) / 1000;

  return {
    remainingDays: Math.floor(delta / (60 * 60 * 24)),
    remainingHours: Math.floor((delta / (60 * 60)) % 24),
    remainingMinutes: Math.floor((delta / 60) % 60),
    remainingSeconds: Math.floor(delta % 60),
  };
}
