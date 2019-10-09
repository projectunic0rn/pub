interface Props {
  [index: string]: {
    val: string;
    required: boolean;
  };
}

export class FormVal {
  private isEmptyString = (str: string) => (str.length ? true : false);

  private isEmptyArray = (arr: string[]) => (arr.length ? true : false);

  private isValidUrl = (input: string, url: string) => {
    // project repo must be a Slack or Discord URL
    if (input === 'pComm') {
      if (!url.includes('slack') && !url.includes('discord')) {
        return false;
      }
    }

    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  private isValidUsername = (str: string) => {
    console.log(str);
    console.log(str.length ? true : false);
    return str.length ? true : false;
  };

  private isValidEmail = (str: string) => {
    /*
      source
      https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    */

    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(str.toLowerCase());
  };

  private isValidPassword = (password: string, confirmPassword: string) => {
    const regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i;
    return regex.test(password.toLowerCase());
  };

  private isPasswordMatch = (confirmPassword: string, password: string) => {
    return confirmPassword === password;
  };

  public checkValidation(v: Props) {
    return Object.keys(v).filter((input: string) => {
      const { val, required } = v[input];

      // check for empty array
      if (Array.isArray(val) && required) {
        return !this.isEmptyArray(val);
      }

      // check for valid url string
      if (input === 'pRepo' || (input === 'pComm' && required)) {
        return !this.isValidUrl(input, val);
      }

      // check for empty string
      if (typeof val === 'string' && required) {
        return !this.isEmptyString(val);
      }
    });
  }

  public userSignUp(v: Props) {
    return Object.keys(v).filter((input: string) => {
      const { val, required } = v[input];

      // check valid username
      if (input === 'username' && required) {
        return !this.isValidUsername(val);
      }

      // check for valid email
      if (input === 'email' && required) {
        return !this.isValidEmail(val);
      }

      // check password
      if (input === 'password' && required) {
        return !this.isValidPassword(val, v['confirmPassword'].val);
      }

      // check confirmPassword
      if (input === 'confirmPassword' && required) {
        return !this.isPasswordMatch(val, v['password'].val);
      }
    });
  }
}
