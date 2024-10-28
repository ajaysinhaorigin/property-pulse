export interface IAPISeller {
  name: string;
  email: string;
  phone: string;
}

export interface IAPIRates {
  weekly: number;
  monthly: number;
  nightly: number;
}

export interface IAPILocation {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IAPIProperty {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: IAPILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: IAPIRates;
  seller_info: IAPISeller;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}
