export class Payment {
  id: number;
  amount: number;
  date: Date;

  constructor(id: number, amount: number, date: Date) {
    this.id = id;
    this.amount = amount;
    this.date = date;
  }
}
