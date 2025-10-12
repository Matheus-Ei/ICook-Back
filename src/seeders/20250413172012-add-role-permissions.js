'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = await queryInterface.sequelize.query(
      `SELECT id, title FROM permissions`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id, title FROM roles`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getRoleId = (title) => {
      const role = roles.filter((r) => r.title === title);
      return role[0].id;
    };

    const getPermissionId = (title) => {
      const permission = permissions.filter((p) => p.title === title);
      return permission[0].id;
    };

    const rolesPermissions = [
      {
        role_id: getRoleId('admin'),
        permissions: [
          'viewStats',
          'viewPages',
          'fillPages',
          'editPages',
          'deletePages',
          'createPages',
          'shareProject',
          'unshareProject',
          'viewProjectShares',
          'changeProjectShareRoles',
          'deleteProject',
          'editProject',
          'viewProject',
        ].map((p) => getPermissionId(p)),
      },

      /* 
      {
        role_id: getRoleId('manager'),
        permissions: [
          'viewStats',
          'viewPages',
          'fillPages',
          'editPages',
          'deletePages',
          'createPages',
          'shareProject',
          'unshareProject',
          'viewProjectShares',
          'changeProjectShareRoles',
          'viewProject',
        ].map((p) => getPermissionId(p)),
      },
 */

      {
        role_id: getRoleId('viewer'),
        permissions: ['viewPages', 'viewProjectShares', 'viewProject'].map(
          (p) => getPermissionId(p)
        ),
      },

      {
        role_id: getRoleId('filler'),
        permissions: ['viewPages', 'fillPages', 'viewProject'].map((p) =>
          getPermissionId(p)
        ),
      },

      {
        role_id: getRoleId('analizer'),
        permissions: [
          'viewStats',
          'viewPages',
          'viewProjectShares',
          'viewProject',
        ].map((p) => getPermissionId(p)),
      },

      {
        role_id: getRoleId('editor'),
        permissions: [
          'viewPages',
          'fillPages',
          'editPages',
          'deletePages',
          'createPages',
          'viewProjectShares',
          'viewProject',
        ].map((p) => getPermissionId(p)),
      },
    ];

    const rolePermissionEntries = rolesPermissions.flatMap((roleData) => {
      return roleData.permissions.map((permissionId) => ({
        role_id: roleData.role_id,
        permission_id: permissionId,
      }));
    });

    await queryInterface.bulkInsert(
      'role_permissions',
      rolePermissionEntries,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', null, {});
  },
};
