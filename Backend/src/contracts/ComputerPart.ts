import { Colors } from '../utils/types/Colors';

export interface ComputerPart {
  id: number;
  description: string;
  brand: string;
  color: Colors;
  basePrice: number;
  taxPrice?: number;
}
