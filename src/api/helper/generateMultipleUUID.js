
import { randomGenerateBetween } from './apiHelpers';
import generateOneRandomNumber  from './generateOneRandomNumber';

export const returnMultipleRandomNumbers = (toGenerate) => {
  let uuidArrays =[]

  for(let i = 0; i < toGenerate; i++) {
    const test = randomGenerateBetween(1, 1000);
    uuidArrays.push(test);
  }

  return uuidArrays;
};

export const addRandomNumbers = () => {
  const number1 = generateOneRandomNumber();
  const number2 = generateOneRandomNumber();

  return number1 + number2;
}
