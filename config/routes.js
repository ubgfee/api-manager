/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

var specifyRouteConfig = function(controller, action, layout){
  return {
    controller: controller,
    action: action,
    locals: {
      layout: layout
    }
  };
};



module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //page
  'GET /': 'ProjectController.index',
  'GET /index': 'ProjectController.index',
  'GET /home': 'ProjectController.index',
  'GET /project/add': 'ProjectController.add',
  'GET /project/manage': 'ProjectController.manage',
  'GET /project/exportExcel': 'ProjectController.exportExcel',
  'GET /project/:id': 'ProjectController.info',
  'GET /module/index': 'ModuleController.index',
  'GET /module/add': 'ModuleController.add',
  'GET /module/:id': 'ModuleController.info',
  'GET /api/index': 'ApiController.index',
  'GET /api/add': 'ApiController.add',
  'GET /api/edit': 'ApiController.edit',
  'GET /api/copy': 'ApiController.copy',
  'GET /api/test': 'ApiController.test',
  'GET /api/:id': 'ApiController.info',


  'get /login': {
    view: 'auth/login',
    locals:{
      layout: 'prj_layout'
    }
  },

  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout',

  'get /signup': {
    view: 'auth/signup',
    locals:{
      layout: 'prj_layout'
    }
  },
  'post /signup': 'AuthController.signup',


  //api route
  'GET /interface/list': 'UserController.list',
  'POST /interface/addUser': 'UserController.addUser',
  'POST /interface/addProject': 'UserController.addProject',
  'POST /interface/updateProject': 'UserController.updateProject',
  'POST /interface/addModule': 'UserController.addModule',
  'POST /interface/updateModule': 'UserController.updateModule',
  'POST /interface/addApi': 'UserController.addApi',
  'POST /interface/delProject': 'UserController.delProject',
  'POST /interface/delModule': 'UserController.delModule',
  'POST /interface/editApi': 'UserController.editApi',
  'POST /interface/delApi': 'UserController.delApi',
  'POST /interface/doTest': 'ApiController.doTest'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
