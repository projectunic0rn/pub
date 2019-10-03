interface Props {
  [index: string]: {
    val: string;
    required: boolean;
  };
}

export class FormVal {
  private isEmptyString = (str: string) => (str.length ? true : false);

  private isEmptyArray = (arr: string[]) => (arr.length ? true : false);

  private isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
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
        return !this.isValidUrl(val);
      }

      // check for empty string
      if (typeof val === 'string' && required) {
        return !this.isEmptyString(val);
      }
    });
  }
}
