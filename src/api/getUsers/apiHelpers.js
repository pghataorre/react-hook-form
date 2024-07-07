export const orderFilmData = (data) => {
  return data.sort((a, b) => a.label.localeCompare(b.label));
} 