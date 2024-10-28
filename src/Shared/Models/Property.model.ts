import { IAPILocation, IAPIProperty, IAPIRates, IAPISeller } from '../Interfaces';

export class PropertyModel {
  id: string = '';
  owner: string = '';
  name: string = '';
  type: string = '';
  description: string = '';
  location: IAPILocation = {
    street: '',
    city: '',
    state: '',
    zipcode: '',
  };
  beds: number = 0;
  baths: number = 0;
  square_feet: number = 0;
  amenities: string[] = [];
  rates: IAPIRates = {
    weekly: 0,
    monthly: 0,
    nightly: 0,
  };
  seller_info: IAPISeller = {
    name: '',
    email: '',
    phone: '',
  };
  images: string[] = [];
  is_featured: boolean = false;
  createdAt: string = '';
  updatedAt: string = '';

  constructor(data?: Partial<PropertyModel>) {
    Object.assign(this, data);
  }

  static deserialize(apiData?: IAPIProperty): PropertyModel {
    if (!apiData) {
      return new PropertyModel();
    }

    const data: Partial<PropertyModel> = {
      ...apiData,
      id: apiData._id,
      owner: apiData.owner,
      name: apiData.name,
      type: apiData.type,
      description: apiData.description,
      location: apiData.location,
      beds: apiData.beds,
      baths: apiData.baths,
      square_feet: apiData.square_feet,
      amenities: apiData.amenities,
      rates: apiData.rates,
      seller_info: apiData.seller_info,
      images: apiData.images,
      is_featured: apiData.is_featured,
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };

    return new PropertyModel(data);
  }

  static deserializeList(apiData: IAPIProperty[]): PropertyModel[] {
    return apiData.map(item => PropertyModel.deserialize(item));
  }
}
