import {
  isEmptyArray,
  isValidUrl,
  isEmptyString,
  isValidEmail,
  isValidPassword,
  isPasswordMatch,
  isValidUsername,
} from './validation-utils';
import { ProjectTechnology } from '@api';

export interface Props<T = string> {
  [index: string]: {
    val: T;
    required: boolean;
  };
}

type CreateProjectTypes = string | ProjectTechnology[];

export class FormVal {
  public checkValidation(v: Props<CreateProjectTypes>) {
    return Object.keys(v).filter((input) => {
      const { val, required } = v[input];

      if (typeof val === 'string') {
        if (input == 'pRepo' && required) {
          return !isValidUrl(val, ['github', 'gitlab', 'bitbucket', 'azure']);
        }

        if (input === 'pComm' && required) {
          return !isValidUrl(val, ['discord', 'slack']);
        }

        if (typeof val === 'string' && required) {
          return isEmptyString(val);
        }
      }

      if (Array.isArray(val)) {
        if (required) {
          return isEmptyArray(val);
        }
      }
    });
  }

  public userSignUp(v: Props) {
    return Object.keys(v).filter((input) => {
      const { val, required } = v[input];

      if (input === 'username' && required) {
        return !isValidUsername(val);
      }

      if (input === 'email' && required) {
        return !isValidEmail(val);
      }

      if (input === 'password' && required) {
        return !isValidPassword(val);
      }

      if (input === 'confirmPassword' && required) {
        return !isPasswordMatch(val, v['password'].val);
      }
    });
  }
}
