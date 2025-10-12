import { ProjectController } from '../controllers/ProjectController';
import { AbstractRoute } from './AbstractRoute';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { SharedProjectController } from '../controllers/SharedProjectController';
import { PageController } from '../controllers/PageController';
import { ProjectSchema } from '../schemas/ProjectSchema';
import { SharedProjectSchema } from '../schemas/SharedProjectSchema';
import { PageSchema } from '../schemas/PageSchema';
import { PermissionController } from '../controllers/PermissionController';
import { CoherenceValidatorMiddleware } from '../middlewares/CoherenceValidatorMiddleware';

@injectable()
export class ProjectRoute extends AbstractRoute {
  constructor(
    @inject(TYPES.ProjectController)
    private projectController: ProjectController,
    @inject(TYPES.SharedProjectController)
    private sharedProjectController: SharedProjectController,
    @inject(TYPES.PageController) private pageController: PageController,
    @inject(TYPES.PermissionController)
    private permissionController: PermissionController,
    @inject(TYPES.CoherenceValidatorMiddleware)
    private coherenceValidatorMiddleware: CoherenceValidatorMiddleware
  ) {
    super();
    this.init();
  }

  // Routes related only to the project itself
  private project = () => {
    this.router.get('/', this.projectController.getAll);

    this.router.post(
      '/',
      this.validator.body(ProjectSchema.create()),
      this.projectController.create
    );

    this.router.get(
      '/:projectId',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('viewProject'),
      this.projectController.get
    );

    this.router.get(
      '/:projectId/stats/modules',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('viewStats'),
      this.projectController.getModuleCount
    );

    this.router.patch(
      '/:projectId',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('editProject'),
      this.validator.body(ProjectSchema.edit()),
      this.projectController.update
    );

    this.router.delete(
      '/:projectId',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('deleteProject'),
      this.projectController.delete
    );
  };

  // Routes related to the project pages
  private pages = () => {
    this.router.get(
      '/:projectId/pages',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('viewPages'),
      this.pageController.getAll
    );

    this.router.get(
      '/:projectId/pages/stats/:type',
      this.validator.params(ProjectSchema.defaultParams()),
      this.validator.query(PageSchema.periodQuery()),
      this.permission.verifyByProject('viewStats'),
      this.pageController.getByPeriod
    );

    this.router.post(
      '/:projectId/pages',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('createPages'),
      this.validator.body(PageSchema.create()),
      this.pageController.create
    );

    this.router.get(
      '/:projectId/pages/:pageId',
      this.validator.params(PageSchema.defaultParams()),
      this.coherenceValidatorMiddleware.verifyPageExistence,
      this.permission.verifyByProject('viewPages'),
      this.pageController.get
    );

    this.router.patch(
      '/:projectId/pages/:pageId',
      this.validator.params(PageSchema.defaultParams()),
      this.coherenceValidatorMiddleware.verifyPageExistence,
      this.permission.verifyByProject('editPages'),
      this.validator.body(PageSchema.edit()),
      this.pageController.update
    );

    this.router.patch(
      '/:projectId/pages/:pageId/modules',
      this.validator.params(PageSchema.defaultParams()),
      this.coherenceValidatorMiddleware.verifyPageExistence,
      this.permission.verifyByProject('editPages'),
      this.validator.body(PageSchema.setModule()),
      this.pageController.setModule
    );

    this.router.delete(
      '/:projectId/pages/:pageId',
      this.validator.params(PageSchema.defaultParams()),
      this.coherenceValidatorMiddleware.verifyPageExistence,
      this.permission.verifyByProject('deletePages'),
      this.pageController.delete
    );

    this.router.get(
      '/:projectId/pages/:pageId/childrens',
      this.validator.params(PageSchema.defaultParams()),
      this.coherenceValidatorMiddleware.verifyPageExistence,
      this.permission.verifyByProject('viewPages'),
      this.pageController.getChildrens
    );
  };

  // Routes related to project sharing operations
  private shared = () => {
    this.router.get(
      '/shared',
      this.sharedProjectController.getAllSharedProjects
    );

    this.router.get(
      '/:projectId/members',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('viewProjectShares'),
      this.validator.query(SharedProjectSchema.queryEmail(true)),
      this.sharedProjectController.getMembers
    );

    this.router.get(
      '/:projectId/members/stats/:type',
      this.validator.params(ProjectSchema.defaultParams()),
      this.validator.query(SharedProjectSchema.periodQuery()),
      this.permission.verifyByProject('viewStats'),
      this.sharedProjectController.getByPeriod
    );

    this.router.get(
      '/:projectId/members/permissions/:permission',
      this.permissionController.verifyByProjectRole
    );

    this.router.post(
      '/:projectId/members',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('shareProject'),
      this.validator.body(SharedProjectSchema.create()),
      this.sharedProjectController.share
    );

    this.router.patch(
      '/:projectId/members',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('changeProjectShareRoles'),
      this.validator.body(SharedProjectSchema.edit()),
      this.validator.query(SharedProjectSchema.queryEmail()),
      this.sharedProjectController.changeRole
    );

    this.router.delete(
      '/:projectId/members',
      this.validator.params(ProjectSchema.defaultParams()),
      this.permission.verifyByProject('unshareProject'),
      this.validator.query(SharedProjectSchema.queryEmail()),
      this.sharedProjectController.unshare
    );
  };

  protected init = () => {
    this.shared();
    this.pages();
    this.project();
  };
}
