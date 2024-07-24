export const passwordValidator = password => {
  if (!password) {
    return 'Prašome užpildyti šį laukelį.';
  }
  return '';
};
