export class Apartment {
  id: number;
  numberofRooms: number;
  pricePerNight: number;
  maxPersons: number;
  description: string;
  propertyId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
