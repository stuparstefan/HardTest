import fs from 'fs';
import csv from 'csv-parser';
import { isGTIN } from 'gtin';
import { AppError } from '../utils/exceptions/AppError';
import { Colors } from '../utils/types/Colors';
import { computerPartRepository } from '../prisma/repository/computerPartRepository';
import { mapEntityToContract } from '../utils/mappers/ComputerPartsMapper';
import { ComputerPart, Prisma } from '@prisma/client';

const NUM_OF_COLUMNS = 5;
class DataService {
  public async uploadFile(fileName: string) {
    const parts: ComputerPart[] = [];
    let index = 0;

    await new Promise<ComputerPart[]>((resolve, reject) => {
      fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (fileRow) => {
          parts.push(this.createComputerPart(fileRow, ++index));
        })
        .on('end', () => {
          fs.unlinkSync(fileName);
          resolve(parts);
        });
    });
    return await computerPartRepository.insert(parts);
  }

  public async getAll(taxPercentage: number) {
    const data = await computerPartRepository.get();
    return data.map((computerPartEntity) => {
      return {
        ...mapEntityToContract(computerPartEntity),
        taxPrice: this.calculateTaxPrice(
          Number(computerPartEntity.price),
          taxPercentage,
        ),
      };
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
      id: fileRow.id,
      description: fileRow.description,
      brand: fileRow.brand,
      color: fileRow.color,
      price: new Prisma.Decimal(fileRow.price),
    } as ComputerPart;
  }

  private calculateTaxPrice(basePrice: number, taxPercentage: number): number {
    return Number(
      (basePrice += taxPercentage
        ? (basePrice * taxPercentage) / 100
        : 0).toFixed(2),
    );
  }

  private isColor(value: string): value is Colors {
    return ['white', 'black', 'blue', 'green', 'red'].includes(value);
  }
}

export const dataService = new DataService();
