export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  lokacija: string;
  tokeni: number;
  cars: Car[];
  roles: string[];
  messages: Message[];
}
export interface Car {
  id: number;
  proizvodjac: string;
  godiste: number;
  model: string;
  kilometraza: number;
  gorivo: string;
  kubikaza: number;
  brojVrata: number;
  snagaMotora: number;
  cijena: number;
  slika: string;
  username: string;
  userId: number;
  lokacija: string;
  tokeni: string;
  komentari: Komentar[];
  featured: boolean;
}
export interface Filters {
  orderBy: string;
  searchTerm?: string;
  fuel: string;
  proizvodjac: string;
  pageNumber: number;
  pageSize: number;
  proizvodnjaOd: number;
  proizvodnjaDo: number;
}
interface Komentar {
  commentId: number;
  sentFrom: string;
  message: string;
}
export interface Message {
  messageId: number;
  sentFrom: string;
  messageContent: string;
}
