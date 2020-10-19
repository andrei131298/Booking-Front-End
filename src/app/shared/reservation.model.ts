export class Reservation {
  id: number;
  numberOfDays: number;
  price: number;
  review: string;
  checkIn: String;
  checkOut: String;
  userId: number;
  apartmentId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
