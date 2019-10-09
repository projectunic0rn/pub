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
}
