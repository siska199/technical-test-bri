export interface TBasePropsInput {
  errorMessage?: string;
  label?: string;
  variant?: 'v1';
  customeClass?: {
    label?: string;
    input?: string;
    ciV1?: string;
    ciV2?: string;
    ciV3?: string;
    ciV4?: string;
  };
  customeElement?: {
    start?: React.ReactNode;
    end?: React.ReactNode;
    preStart?: string;
    preEnd?: string;
  };
}

export interface TCustomeEventOnChange<V, T extends object = NonNullable<unknown>> {
  target: {
    name: string;
    value: V;
    type?: string;
  } & T;
}

export interface TOption<TLabel = string> {
  label: TLabel;
  value: string;
  helperValue?: any;
}

export interface TColumn<TData, TKey extends keyof TData> {
  name: string;
  key: TKey;
  className?: string;
  customeComponent?: (data: TData) => React.ReactNode;
  isSorted?: boolean;
}

export interface TSettingTable<TData> {
  sortBy?: keyof TData;
  sortDir?: 'asc' | 'desc';
  checked?: boolean;
  pagination?: boolean;
  currentPage: number;
  totalPage: number;
  itemsPerPage: number;
}
