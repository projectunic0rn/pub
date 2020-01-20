import { ReactNode } from 'react';

export enum Show {
  Never,
  AuthOnly,
  GuestOnly,
  Always,
}

export interface NavItem {
  item: ReactNode;
  key: string;
  show: Show;
}
