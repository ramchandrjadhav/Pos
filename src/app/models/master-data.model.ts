export interface State {
  id: number;
  name: string;
  code?: string;
}

export interface City {
  id: number;
  name: string;
  state: string;
}

export interface Domain {
  id: number;
  name: string;
  code: string;
}

export interface Seller {
  id: number;
  name: string;
  subscriber_id?: string;
}

export interface Location {
  id: number;
  name: string;
  city?: string;
  state?: string;
}

export interface MasterDataResponse<T> {
  success: boolean;
  data: T[];
}
