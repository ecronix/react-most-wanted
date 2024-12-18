/**
 * @function
 * @description Method for merging two different objects. It accepts 2 objects and returns new object.
 * @param {Record<string, any>} obj1 First object
 * @param {Record<string, any>} obj2 Second object
 * @returns New object created from merging provided objects
 */
export const merge = (obj1: Record<string, any>, obj2: Record<string, any>) => {
  let temp = { ...obj1, ...obj2 };

  Object.keys(temp).forEach((key) => {
    if (typeof temp[key] === "object" && !(temp[key] instanceof Array)) {
      temp[key] = { ...obj1[key], ...obj2[key] };
    }
  });

  return temp;
};
