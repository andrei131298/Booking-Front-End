export class Reservation {
  id: number;
  numberOfDays: number;
  price: number;
  review: string;
  checkIn: Date;
  checkOut: Date;
  userId: number;
  apartmentId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
