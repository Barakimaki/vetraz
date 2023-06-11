export const formatPhoneNumber = (phoneNumber: string): string =>  {
  phoneNumber = phoneNumber.replace(/\D/g, '');

  if (phoneNumber.length === 12 && phoneNumber.substring(0, 3) === '375') {
    return '+' + phoneNumber.substring(0, 3) + ' ' + phoneNumber.substring(3, 5)
      + ' ' + phoneNumber.substring(5, 8) + ' ' + phoneNumber.substring(8, 10)
      + ' ' + phoneNumber.substring(10);
  }
  if (phoneNumber.length === 11 && phoneNumber.substring(0, 2) === '80' ) {
    return '+375 ' + phoneNumber.substring(2, 4) + ' ' + phoneNumber.substring(4, 7)
      + ' ' + phoneNumber.substring(7, 9) + ' ' + phoneNumber.substring(9);
  }
  if (phoneNumber.length === 9) {
    return '+375 ' + phoneNumber.substring(0, 2) + ' ' + phoneNumber.substring(2, 5)
      + ' ' + phoneNumber.substring(5, 7) + ' ' + phoneNumber.substring(7);
  }
  return '';
}

export const getYearsString = (num: number): string => {
  if (num % 10 === 1 && num !== 11) {
    return num + ' год';
  } else if (num % 10 >= 2 && num % 10 <= 4 && !(num >= 12 && num <= 14)) {
    return num + ' года';
  } else {
    return num + ' лет';
  }
}