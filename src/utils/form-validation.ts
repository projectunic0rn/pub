interface Props {
  pName?: {
    val: string;
    required: boolean;
  };
  pDesc?: {
    val: string;
    required: boolean;
  };
  pRepo?: {
    val: string;
    required: boolean;
  };
  pType?: {
    val: any;
    required: boolean;
  };
  pTech?: {
    val: any;
    required: boolean;
  };
  pComm?: {
    val: string;
    required: boolean;
  };
}

export function formValidation(values: Props) {
  // validation is only checking if input values are empty
  const v: any = values;

  return Object.keys(v).filter((input: string) => {
    if (input === 'pTech') return !v[input].val.length && v[input].required;
    return !v[input].val && v[input].required;
  });
}
