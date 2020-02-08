import { FormVal } from '../form-validation';

describe('checkValidation', () => {
  test('empty imput should return an empty array', () => {
    const formVal = new FormVal();
    const inObj = {};

    const out = formVal.checkValidation(inObj);
    expect(out).toEqual(expect.arrayContaining([]));
  });

  test('value is required and is of type "string"', () => {
    const formVal = new FormVal();
    const inObj = {
      pRepo: { val: '', required: true },
      pComm: { val: '', required: true },
      tuna: { val: '', required: true },
    };

    const out = formVal.checkValidation(inObj);
    expect(out).toEqual(expect.arrayContaining(['pRepo', 'pComm', 'tuna']));
  });

  test('value is required and is an array', () => {
    const formVal = new FormVal();
    const inObj = {
      seabass: {
        val: [],
        required: true,
      },
    };

    const out = formVal.checkValidation(inObj);
    expect(out).toEqual(expect.arrayContaining(['seabass']));
  });
});

describe('userSignUp', () => {
  test('empty imput should return an empty array', () => {
    const formVal = new FormVal();
    const inObj = {};

    const out = formVal.userSignUp(inObj);
    expect(out).toEqual(expect.arrayContaining([]));
  });

  test('value is required', () => {
    const formVal = new FormVal();
    const inObj = {
      username: { val: '', required: true },
      email: { val: '', required: true },
      password: { val: 'pass', required: true },
      confirmPassword: { val: 'word', required: true },
    };

    const out = formVal.userSignUp(inObj);
    expect(out).toEqual(
      expect.arrayContaining([
        'username',
        'email',
        'password',
        'confirmPassword',
      ]),
    );
  });
});
