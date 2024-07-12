export const orderFilmData = (data) => {
  return data.sort((a, b) => a.label.localeCompare(b.label));
}

export const randomGenerateBetween = (min, max ) => Math.floor(Math.random() * (max - min + 1) + min);