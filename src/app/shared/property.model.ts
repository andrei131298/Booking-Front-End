export class Property {
  id: number;
  name: string;
  type: string;
  description: string;
  numberOfStars: number;
  cityName: string;
  street: string;
  streetNumber: number;
  photo: string;
  cityId: number;
  ownerId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
