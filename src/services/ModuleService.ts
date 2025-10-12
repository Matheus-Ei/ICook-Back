import { ModuleRepository } from '../repositories/ModuleRepository';
import { inject, injectable } from 'inversify';
import { Module } from '../entities/Module';
import { TYPES } from '../providers/types';
import { AsyncMaybe } from '../types';

@injectable()
export class ModuleService {
  constructor(
    @inject(TYPES.ModuleRepository) private moduleRespository: ModuleRepository
  ) {}

  getAll = async (): AsyncMaybe<Module[]> => {
    return this.moduleRespository.findAll();
  };
}
