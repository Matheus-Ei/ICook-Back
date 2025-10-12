import { injectable } from 'inversify';
import { AsyncMaybe } from '../types';
import { ModulesModel } from '../models/ModulesModel';
import { Module } from '../entities/Module';

@injectable()
export class ModuleRepository {
  findAll = (): AsyncMaybe<Module[]> => {
    return ModulesModel.findAll();
  };
}
