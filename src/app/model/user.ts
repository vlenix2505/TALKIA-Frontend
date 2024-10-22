export class User {
  id: number;
  userName: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  totalPoints: number;
  iCreatedAt: Date = new Date();
  iModifiedAt: Date = new Date();

  constructor(
    id: number, userName: string, name: string, email: string, password: string, 
    dateOfBirth: Date, totalPoints: number
  ) {
    this.id = id;
    this.userName = userName;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.totalPoints = totalPoints;
  }
}
