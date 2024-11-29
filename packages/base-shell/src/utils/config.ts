export const merge = (obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> => {
  let temp = { ...obj1, ...obj2 };

  Object.keys(temp).forEach((key) => {
    if (typeof temp[key] === "object" && !(temp[key] instanceof Array)) {
      temp[key] = { ...obj1[key], ...obj2[key] };
    }
  });

  return temp;
};
