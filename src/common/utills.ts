interface ResourceDTO {
  [key: string]: any;
}

export const removeUndefinedFields = (obj: ResourceDTO): ResourceDTO => {
  return Object.keys(obj).reduce((acc, objKey) => {
    if (obj[objKey] !== undefined) {
      (acc as ResourceDTO)[objKey] = obj[objKey];
    }
    return acc;
  }, {} as ResourceDTO);
};
