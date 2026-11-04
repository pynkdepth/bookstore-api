export class CreateBookDto {
  title: string;
  price: number;
  stock?: number; // Tanda tanya (?) berarti opsional/boleh kosong
  categoryId?: string;
  publisherId?: string;
}