export declare const login: (data: {
    username: string;
    password: string;
}) => Promise<any>;
export declare const register: (data: {
    username: string;
    surname: string;
    password: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    address: string;
    passportSeries: string;
    role: string;
    balance: number;
}) => Promise<any>;
