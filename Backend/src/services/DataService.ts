import fs from 'fs';
import csv from 'csv-parser';
import { isGTIN } from 'gtin';
import { AppError } from '../utils/exceptions/AppError';

type Colors = 'white' | 'black' | 'blue' | 'green' | 'red';

interface ComputerPart {
  id: number;
  description?: string;
  brand: string;
  color?: Colors;
  basePrice: number;
}

const NUM_OF_COLUMNS = 5;

class DataService {
  public async uploadFile(fileName: string) {
    const parts: ComputerPart[] = [];
    let index = 0;

    return await new Promise<ComputerPart[]>((resolve, reject) => {
      fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (fileRow) => {
          const part = this.createComputerPart(fileRow, ++index);
          parts.push(part);
        })
        .on('end', () => {
          fs.unlinkSync(fileName);
          resolve(parts);
        });
    });
  }

  private createComputerPart(fileRow: any, index: number): ComputerPart {
    if (
      Object.keys(fileRow).length != 5 ||
      !fileRow.id ||
      !fileRow.description ||
      !fileRow.brand ||
      !fileRow.color ||
      !fileRow.price
    ) {
      throw new AppError({
        description: `Error at row: ${index}. Please specify exact ${NUM_OF_COLUMNS} columns in following structure: id, description, brand, color, price.`,
        httpCode: 400,
      });
    }
    if (!isGTIN(fileRow.id)) {
      throw new AppError({
        description: `Error at row: ${index}. Barcode is not in GTIN format.`,
        httpCode: 400,
      });
    }

    if (!this.isColor(fileRow.color.toLowerCase())) {
      throw new AppError({
        description: `Error at row: ${index}. Color doesn't exist.`,
        httpCode: 400,
      });
    }

    if (!Number(fileRow.price)) {
      throw new AppError({
        description: `Error at row: ${index}. Price is not a number.`,
        httpCode: 400,
      });
    }
    return {
      id: Number(fileRow.id),
      description: fileRow.description,
      brand: fileRow.brand,
      color: fileRow.color as Colors,
      basePrice: Number(fileRow.price),
    } as ComputerPart;
  }

  private isColor(value: string): value is Colors {
    return ['white', 'black', 'blue', 'green', 'red'].includes(value);
  }
}

export const dataService = new DataService();
