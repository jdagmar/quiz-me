export const shuffleList = (array: any[]) => { 
  return array.sort(() => Math.random() - 0.5); 
};
