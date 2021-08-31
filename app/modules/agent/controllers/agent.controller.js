const mongoose = require('mongoose');
const roleRepo = require('role/repositories/role.repository');
const userModel = require("user/models/user.model.js");
const userRepo = require('user/repositories/user.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const fs = require('fs');
const User = new userModel();



class agentController {
    constructor() {
        this.agent = [];

    }

    /* @Method: create
    // @Description: agent create view render
    */
    async create(req, res) {
        try {
            res.render('agent/views/add.ejs', {
                page_name: 'agent-management',
                page_title: 'Create Agent',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: insert
    // @Description: save agent
    */
    async insert(req, res) {
        try {
           
            let role = await roleRepo.getByField({ role: 'agent' });
            let agent = await userRepo.getByField({ 'email': req.body.email, 'isDeleted': false, 'role': role._id });
            if (_.isEmpty(agent)) {
                req.body.role = role._id;
                if (req.files.length > 0) {
                    req.body.profile_image = req.files[0].filename;
                }
                let save = await userRepo.save(req.body);
                if (save) {
                    req.flash('success', 'The agent has created successfully.');
                    res.redirect(namedRouter.urlFor('agent.listing'));
                 }
            } else {
                req.flash('error', "agent already exist.");
                res.redirect(namedRouter.urlFor('agent.create'));
            }
        } catch (e) {
            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('agent.create'));
        }
    };

    /* @Method: list
    // @Description: To get all the agent from DB
    */
    async list(req, res) {
        try {
            res.render('agent/views/list.ejs', {
                page_name: 'agent-management',
                page_title: 'Agent List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAll
    // @Description: To get all the agent from DB
    */
    async getAll(req, res) {
            try {
                req.body.role = 'agent';
                if (_.has(req.body, 'sort')) {
                    var sortOrder = req.body.sort.sort;
                    var sortField = req.body.sort.field;
                } else {
                    var sortOrder = -1;
                    var sortField = '_id';
                }

                let agentData = await userRepo.getAllAgent(req);
                let meta = {
                    "page": req.body.pagination.page,
                    "pages": agentData.pageCount,
                    "perpage": req.body.pagination.perpage,
                    "total": agentData.totalCount,
                    "sort": sortOrder,
                    "field": sortField
                };
                return {
                    status: 200,
                    meta: meta,
                    data: agentData.data,
                    message: `Data fetched successfully.`
                };
            } catch (e) {
                return { status: 500, data: [], message: e.message };
            }
        }
        /**
         * @Method: edit
         * @Description: To edit agent information
         */
    async edit(req, res) {
        try {
            let result = {};
            let agentData = await userRepo.getById(req.params.id);
            if (!_.isEmpty(agentData)) {
                result.agent_data = agentData;
                res.render('agent/views/edit.ejs', {
                    page_name: 'agent-management',
                    page_title: 'Edit Agent',
                    user: req.user,
                    response: result,
                });
            } 
            else {
                req.flash('error', "Sorry agent not found!");
                res.redirect(namedRouter.urlFor('agent.listing'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: update
    // @Description: agent Update
    */
    async update(req, res) {
        try {
            let agentData = await userRepo.getById(req.body.id);
            if (!_.isEmpty(agentData)) {
                var chkEmail = { isDeleted: false, email: req.body.email, _id: { $ne: mongoose.Types.ObjectId(req.body.id) } };
                let isExist = await userRepo.getByField(chkEmail);
                if (!_.isEmpty(isExist)) {
                    req.flash('error', "Email already exist.");
                    res.redirect(namedRouter.urlFor('agent.edit', { id: req.body.id }));
                } else {
                    if (req.files.length > 0) {
                        req.body.profile_image = req.files[0].filename;
                    }
                    let agentUpdate = userRepo.updateById(req.body, req.body.id);
                    if (agentUpdate) {
                        req.flash('success', 'Agent updated successfully.');
                        res.redirect(namedRouter.urlFor('agent.listing'));
                    } else {
                        res.redirect(namedRouter.urlFor('agent.edit', { id: req.body.id }));
                    }
                }
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: delete
    // @Description: agent Delete
    */
    async delete(req, res) {
        try {
            let agentData = await userRepo.getById(req.params.id);
            if (!_.isEmpty(agentData)) {
                let agentDelete = await userRepo.updateById({ "isDeleted": true }, agentData._id)
                if (!_.isEmpty(agentDelete)) {
                    req.flash('success', 'Agent Removed Successfully');
                    res.redirect(namedRouter.urlFor('agent.listing'));
                }
            } else {
                req.flash('error', "Sorry agent not found");
                res.redirect(namedRouter.urlFor('agent.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };



    /*
    // @Method: statusChange
    // @Description: agent status change action
    */
    async statusChange(req, res) {
        try {
            let agentData = await userRepo.getById(req.params.id);
            if (!_.isEmpty(agentData)) {
                let agentStatus = (agentData.isActive == true) ? false : true;
                let agentUpdate = await userRepo.updateById({ 'isActive': agentStatus }, req.params.id);
                if (!_.isEmpty(agentUpdate)) {
                    req.flash('success', "Agent status has changed successfully.");
                    res.redirect(namedRouter.urlFor('agent.listing'));
                }
            } else {
                req.flash('error', "Sorry agent not found");
                res.redirect(namedRouter.urlFor('agent.listing'));

            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new agentController();