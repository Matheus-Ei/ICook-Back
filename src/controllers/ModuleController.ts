import { ModuleService } from '../services/ModuleService';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Module } from '../entities/Module';
import { TYPES } from '../providers/types';
import { Res } from '../utils/response';

@injectable()
export class ModuleController {
  constructor(
    @inject(TYPES.ModuleService) private moduleService: ModuleService
  ) {}

  getAll = async (_: Request, res: Response) => {
    try {
      const modules = await this.moduleService.getAll();

      return Res.sendByType<Module[] | null>(res, 'found', undefined, modules);
    } catch (error) {
      return Res.sendByType(res, 'internalError', error);
    }
  };
}
