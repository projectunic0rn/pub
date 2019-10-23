export function isEmptyString(str: string) {
  return str.length === 0;
}

export function isEmptyArray<T>(arr: T[]) {
  return arr.length === 0;
}

export function isValidUrl(url: string, tests: string[] = []) {
  let isValid = tests.length === 0;

  for (const k of tests) {
    if (url.includes(k)) {
      isValid = true;
      break;
    }
  }

  try {
    new URL(url);
  } catch (e) {
    isValid = false;
  }

  return isValid;
}

export function isValidUsername(str: string) {
  return str.length > 0;
}

export function isValidEmail(str: string) {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(str.toLowerCase());
}

export function isValidPassword(password: string) {
  const regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i;
  return regex.test(password.toLowerCase());
}

export function isPasswordMatch(confirmPassword: string, password: string) {
  return confirmPassword === password;
}
