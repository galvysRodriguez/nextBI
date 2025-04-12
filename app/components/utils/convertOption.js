

export const convertOption = (array, idKey, labelKey) => {
    return array?.data?.map(item => ({
      value: item[idKey],
      label: item[labelKey]
    })) || [];
  };
  
