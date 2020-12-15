export class Reservation {
  id: number;
  price: number;
  review: string;
  checkIn: String;
  checkOut: String;
  userId: number;
  apartmentId: number;
  apartmentName?: string;
  propertyName?:string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
