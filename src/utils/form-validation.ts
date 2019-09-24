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
  pComm?: {
    val: string;
    required: boolean;
  };
}

export function formValidation(values: Props) {
  // validation is only checking if input values are empty
  const v: any = values;

  return Object.keys(v).filter(
    (input: string) => !v[input].val && v[input].required,
  );
}
