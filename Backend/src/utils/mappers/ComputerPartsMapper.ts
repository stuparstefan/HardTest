import { ComputerPart as Contract } from '../../contracts/ComputerPart';
import { ComputerPart as Entity, Prisma } from '@prisma/client';
import { Colors } from '../types/Colors';

export const mapEntityToContract = (entity: Entity) => {
  return {
    id: Number(entity.id),
    description: entity.description,
    brand: entity.brand,
    color: entity.color as Colors,
    basePrice: Number(entity.price),
  };
};

export const mapContractToEntity = (contract: Contract) => {
  return {
    id: contract.id.toString(),
    description: contract.description,
    brand: contract.brand,
    color: contract.color,
    price: new Prisma.Decimal(contract.basePrice),
  } as Entity;
};
