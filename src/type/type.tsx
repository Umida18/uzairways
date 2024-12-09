export interface Employee {
  username: string;
  firstName: string;
  birthDate: string;
  citizenship: string;
  serialNumber: string;
  validityPeriod: string;
}

export interface BookingData {
  ticketIds: string[];
  employees: Employee[];
}

export interface IUser {
  username: string;
  surname: string;
  password: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  balance: number;
  address: string;
  passportSeries: string;
}
export interface IQA {
  question: string;
  answer: string;
}
