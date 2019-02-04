const express = require('express');
const Router = express.Router();
const VerifyUserMiddleware = require('../Middleware/verifyUser.middeware')
const verifylogin = require('../Controller/LoginController')

const config = require('../Common/config/env.config')


const ADMIN =  config.permissionLevels.ADMIN ;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


const PermissionMiddleware = require('../Common/permission_middleware/auth.permission.middleware');
const ValidationMiddleware = require('../Common/permission_middleware/auth.validation.middleware')

const User_actions = require('../Controller/User_actions_controller')
Router.post('/register'  , require('../Controller/RegisterController').post);



Router.post('/login' , [
    VerifyUserMiddleware.hasAuthValidFields, 
    VerifyUserMiddleware.isPasswordAndUserMatch,
    verifylogin.login
]);
Router.get('/users' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    User_actions.list
])

Router.get('/users/:userId' , [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
User_actions.getbyid
] )

Router.delete('/users/:userId' , [

    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    User_actions.RemovebyId
  
] )

Router.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    User_actions.patchById
]);


Router.post('/login/refresh', [
    ValidationMiddleware.validJWTNeeded,
    ValidationMiddleware.verifyRefreshBodyField,
    ValidationMiddleware.validRefreshNeeded,
    verifylogin.login
])

module.exports = Router 