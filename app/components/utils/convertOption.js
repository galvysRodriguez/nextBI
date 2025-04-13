

export const convertOption = (array, idKey, labelKey) => {
    return array?.data?.map(item => ({
      value: item[idKey],
      label: item[labelKey]
    })) || [];
  };
  
export const mapIdsToArray = (array, ids) => {
    return array
      .filter(opt => ids.includes(opt.value))
      .map(opt => ({ id: opt.value, name: opt.label }));
  };