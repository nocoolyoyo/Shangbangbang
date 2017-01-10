//用户服务模块定义
var user = angular.module("user", [])
/*
 * 用户服务Serv
 * init: 初始化服务
 * getAll: 返回所有用户对象数据
 */
user.service('userServ', function ($http, $q) {
    var user = {'hahaha':'erere'};
    var url = "test.json";
    return {
        init: function() {
            return user;
        },
        getAll: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url
            }).then(function (res) {
                deferred.resolve(res.data);
            }, function(err) {
                deferred.reject("请检查网络")
            });
            return deferred.promise;
        }
    };
});

