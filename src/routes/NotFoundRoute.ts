import { AbstractRoute } from './AbstractRoute';
import { Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class NotFoundRoute extends AbstractRoute {
  constructor() {
    super();
    this.init();
  }

  notFound = (_: Request, res: Response) => {
    res.status(404).send({
      message: 'Endpoint not found',
    });
  };

  protected init = () => {
    this.router.get('/*', this.notFound);
    this.router.post('/*', this.notFound);
    this.router.delete('/*', this.notFound);
    this.router.patch('/*', this.notFound);
    this.router.put('/*', this.notFound);
    this.router.options('/*', this.notFound);
  };
}
