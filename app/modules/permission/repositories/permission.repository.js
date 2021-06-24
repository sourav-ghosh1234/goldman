var mongoose = require('mongoose');
var Permission = require('permission/models/permission.model');
var Role = require('role/models/role.model');
var RolePermission = require('permission/models/role_permission.model');
var perPage = config.PAGINATION_PERPAGE;
var async = require('async');

var permissionRepository = {
   
    getPermissionByRole: async (role) => {
        try {
            let permResult = await Permission.aggregate([
                { $match: { is_deleted: 'no' } },
                {
                    "$project": {
                     "permission_group": "$permission_group",
                       "operation": "$operation",
                       "displayName": "$displayName",
                       "description": "$description",
                  }
                },
                { $group: { _id: "$permission_group", permission_list: { $push: "$$ROOT" } } },
                { "$sort": {_id: -1}}
            ]);
    
            let _result = [];
            let permissions = async () => {
                await utils.asyncForEach(permResult, async perm => {
                    let permissionLists = [];
                    await utils.asyncForEach(perm.permission_list, async innerPerms => {
                        let permId = innerPerms._id;
                        let roleInfo = await RolePermission.findOne({$and:[{'role':role},{'permissionall': {$in: [permId]}}]});
                        innerPerms.hasAccess = (roleInfo != null)?true:false;
                        // perm['hasAccess'] = (roleInfo != null)?true:false;
                        // console.log(32, innerPerms.hasAccess);
                        permissionLists.push(innerPerms);
                        perm.permission_list = permissionLists;
                    });
                    // console.log(36, permissionLists);
                    _result.push(perm);
                });
            }
            await permissions();
            return _result;
        } catch (err) {
            throw err;
        }
    // var aggregate = Permission.aggregate([
    //     {
    //         "$project": {
    //          "permission_group": "$permission_group",
    //            "operation": "$operation",
    //            "displayName": "$displayName",
    //            "description": "$description",
    //       }
    //     },
    //     { $group: { _id: "$permission_group", permission_list: { $push: "$$ROOT" } } },
    //     { "$sort": {_id: -1}}
    // ]).exec(function (err, permResult) {
    //    if (err) {
    //         return cb(err.message, null);
    //     } else {
    //         var _result = [];
    //         async.forEachSeries(permResult, function (perm, callbackOne) {
    //             async.forEachSeries(perm.permission_list, function (innerPerms, callbackTwo) {
    //                 var permId = innerPerms._id;
    //                 RolePermission.findOne({$and:[{'role':role},{'permissionall': {$in: [permId]}}]}, function (err, roleInfo) {
    //                    innerPerms.is_access = (roleInfo != null)?true:false;
    //                     callbackTwo();
    //                 });
    //             }, function (err) {
    //                 if (err) return cb(err.message, null);
    //                 else {
    //                     _result.push(perm);
    //                     callbackOne();
    //                 }
    //             });
    //         }, function (err) {
    //             if (err) return cb(err.message, null);
    //             else {
    //                 return cb(null, _result);
    //             }
    //         });
    //     }  
    // })    
   },

    updateRolePermissionById: async (field,data) => {
        try {
            let update = await RolePermission.findOneAndUpdate(field, data,{upsert: true, 'new': true});
            if(!update) {
                return null;
            }
            return update;
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        try {
            let result = await Permission.find({ status: 'Active'}).sort({permission_group:-1}).exec();
            if(!result) {
                return null;
            }
            return result;
        } catch(err) {
            throw err;
        }
    },

    getRolePermissionByField: async (params) => {
        try {
            let result = await RolePermission.findOne(params);
            if (!result) {
                return null;
            }
            return result;
        } catch (err) {
            throw err;
        }
    },
    getById: async (id) => {
        try {
            let result = await Permission.findById(id);
            if (!result) {
                return null;
            }
            return result;
        } catch (err) {
            throw err;
        }
    },

    getByField: async (params) => {
        try {
            let result = await Permission.findOne(params);
            if (!result) {
                return null;
            }
            return result;
        } catch (err) {
            throw err;
        }
    },

    getAllByField: async (params) => {
        try {
            let result = await Permission.find(params);
            if (!result) {
                return null;
            }
            return result;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            let result = await Permission.findById(id);
            if(!result) {
                return null;
            }
            return result;
        } catch (err) {
            throw err;
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },

    updateById: async (data, id) => {
        try {
            let result = await Permission.findByIdAndUpdate(id, data);
            if (!result) {
                return null;
            }
            return result;
        } catch (err) {
            throw err;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (obj) => {
        try {
            let newPermission = new Permission(obj);
            let _save = await newPermission.save();
            if (!_save) {
                return null;
            }
            return _save;
        } catch (err) {
            throw err;
        }
    },
    saveRolePermission: async (obj) => {
        try {
            let newRolePermission = new RolePermission(obj);
            let _save = await newRolePermission.save();    
            if (!_save) {
                return null;
            }
            return _save;
        } catch (err) {
            throw err;
        }
    }
};



module.exports = permissionRepository;