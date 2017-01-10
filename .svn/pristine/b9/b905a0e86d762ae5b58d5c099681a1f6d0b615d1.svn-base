//点赞模块定义
var favorite = angular.module("favorite", []);
/*
 * 点赞服务
 * action: 向后台发送点赞或取消行为
 */
favorite.service('favoriteServ', function ($http, $q) {
    //定义方法对象,可能有需要
    var FavoriteList = {};
    var url ="";
    //服务外部接口
    return {
        action: function(id,action){ //收藏按钮动作
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {id: id, action: action}
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
})