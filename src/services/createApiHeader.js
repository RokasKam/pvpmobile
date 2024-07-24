export const createApiHeader = token => {
  return {Authorization: `Bearer ${token}`};
};
