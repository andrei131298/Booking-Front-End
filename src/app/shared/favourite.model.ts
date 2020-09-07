export class Favourite {
  id: number;
  userId: number;
  propertyId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
