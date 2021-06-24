const permissionRepo = require('permission/repositories/permission.repository');
const roleRepo = require('role/repositories/role.repository');
const slug = require('slug');
const fs = require('fs');

const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

let createPermissions = async (req) => {
    try {
        let routes = fs.readFileSync('./app/routeList.js', { encoding: 'utf-8' });
        // console.log(8, typeof routes);
        let routesArray = routes.split(',');
        let routeGroups = [];
        await utils.asyncForEach(routesArray, async(route) => {
            if(route.indexOf('admin.') != -1){                
                let routeGroup = route.split('.')[1];
                routeGroups.push(routeGroup);
            }
        });
        routeGroups = new Set([...routeGroups]);
        routeGroups.forEach(async group => {
            let operation = [];

            await utils.asyncForEach(routesArray, async (route) => {
                if (route.indexOf(`admin.${group}.`) != -1) {
                    // operation.push(route);
                    let permissionsObj = { permission_group: group, operation: route, displayName: utils.humanize(route), description: utils.humanize(route) };
                    console.log(25, permissionsObj);
                    let permission = await permissionRepo.getByField({ operation: { $in: [route] } });
                    console.log(27, permission);
                    if(!permission) {
                        let savePermission = await permissionRepo.save(permissionsObj);
                    } else {
                        let updatePermission = await permissionRepo.updateById(permissionsObj, permission._id);
                    }
                }
            });
        })
    } catch (error) {
        console.log(12, error);
        return { "status": 500, data: [], "message": error.message };
    }
}

// createPermissions();
/* @Method: edit
// @Description: Permission list
*/
exports.edit = async (req, res) => {
    try {
        const permissionsList = await permissionRepo.getPermissionByRole(req.params.id);
        const role = await roleRepo.getById(req.params.id);
        res.render('permission/views/edit.ejs', {
            page_name: 'role-management',
            page_title: `Edit ${role.roleDisplayName} Role Permission`,
            user: req.user,
            response: permissionsList,
            role: req.params.id
        });
    } catch (error) {
        console.log(14, error);
        return { "status": 500, data: [], "message": error.message };
    }
};

/* @Method: update
// @Description: update Permission
*/
exports.update = async (req, res) => {
    try {
        // console.log(72, req.body);
        const permissionsList = await permissionRepo.updateRolePermissionById({'role':req.body.role},req.body);
        // console.log(76, permissionsList);
        req.flash('success', "Permissions updated Successfully");
        res.redirect(namedRouter.urlFor('admin.role.list'));
    } catch (error) {
        console.log(76, error);
        return { "status": 500, data: [], "message": error.message };
    }
};
