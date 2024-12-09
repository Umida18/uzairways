// import { jwtDecode } from "jwt-decode";

// interface TokenPayload {
//   userId: string;
//   [key: string]: any; // Token ichida boshqa ma'lumotlar ham bo'lishi mumkin
// }

// /**
//  * Tokenni dekod qilib, foydalanuvchi ID ni qaytaradi
//  * @param token JWT token
//  * @returns Foydalanuvchi ID yoki null
//  */
// export const decodeToken = (token: string): string | null => {
//   try {
//     const decoded: TokenPayload = jwtDecode(token);
//     return decoded.userId || null;
//   } catch (error) {
//     console.error("Tokenni dekod qilishda xatolik:", error);
//     return null;
//   }
// };
