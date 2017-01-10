/*
 * 测试页面模块
 *
 */

<!--页面模块定义和依赖-->
var welcome = angular.module('welcome',['user','bottomTool','commentsList']);

welcome.controller('welcomeCtrl',function($scope,userServ) {
    userServ.getAll(
    ).then(function(data) {
       $scope.lastName = data.name;
    });
});