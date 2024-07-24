export const userNameValidator = name => {
  if (!name) {
    return 'Prašome užpildyti šį laukelį.';
  }
  return '';
};
