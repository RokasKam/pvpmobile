export const classRoomValidator = classRoom => {
  const re = /^\d{6}$/;

  if (!classRoom) {
    return 'Prašome užpildyti šį laukelį.';
  }
  if (!re.test(classRoom)) {
    return 'Prašome įvesti tinkamą klasę, kuri yra sudaryta iš 6 skaičių!';
  }
  return '';
};
