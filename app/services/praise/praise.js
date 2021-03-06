//点赞模块定义
var praise = angular.module("praise", []);
/*
 * 点赞服务
 */
praise.service('praiseServ', function ($http, $q) {
    var url ="";//接口地址
    return {
        action: function(id,action,type){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {id: id, action: action, type: type}
            }).then(function() {
                //alert('操作成功');
                deferred.resolve('success');
            }, function() {
                deferred.resolve('error');
               // alert('请检查网络');
                //deferred.reject("请检查网络")
            });
            return deferred.promise;
        }
    };
});

