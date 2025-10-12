import { AbstractRoute } from './AbstractRoute';
import swaggerUi from 'swagger-ui-express';
import { injectable } from 'inversify';
import fs from 'fs';
import YAML from 'yaml';

@injectable()
export class DocumentationRoute extends AbstractRoute {
  private swaggerDocument: object;

  constructor() {
    super();
    const file = fs.readFileSync('./documentation.yaml', 'utf8');
    this.swaggerDocument = YAML.parse(file);

    this.init();
  }

  protected init = () => {
    this.router.use('/', swaggerUi.serve);
    this.router.get('/', swaggerUi.setup(this.swaggerDocument));
  };
}
