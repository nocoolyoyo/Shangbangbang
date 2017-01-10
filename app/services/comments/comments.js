//评论模块定义
var comments = angular.module("comments", []);
/*
 * 服务
 * 内部方法：
 * loadUrlData: 加载远程接口评论数据，包含数据接口，判断是否从本地或者远程调取数据,先暴露该方法在需要是调用
 * loadLocalData:加载本地列表数据
 *
 * 服务接口：
 * update: 更新评论数据，手动加载远程，暂无用处
 * sendComment: 发送用户用户评论
 * getList: 输出单条评论数据
 * getLists: 输出评论列表模块数据
 */
comments.service('commentsServ', function ($http, $q) {
    //定义方法对象,评论列表数据
    var Lists = {};
    var url ="testComment.json";
    //服务外部接口
    var loadUrlData = function(id,dfd){
        $http({
            method: 'GET',
            url: url,
            data: {id: id}
        }).then(function(res) {
            //alert('操作成功')
            //加载进本地对象;
            Lists = res.data;
            localStorage.commentList = res.data;
            dfd.resolve(res.data);
            //这里应该写进本地数据;
        }, function() {
            dfd.resolve('error');
            // alert('请检查网络');
            //deferred.reject("请检查网络")
        });
        return dfd;
    };
    var loadLocalData = function(id,dtd){

    };
    return {
        sendComment: function (id,comment) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {id: id, comment: comment}
            }).then(function(data) {
                //alert('操作成功')
                //加载进对象;
                deferred.resolve('success');
                //这里应该写进本地数据;
            }, function() {
                deferred.resolve('error');
                // alert('请检查网络');
                //deferred.reject("请检查网络")
            });
            return deferred.promise;
        },
        getList: function(){
            return Lists;
        },
        getLists: function(id){
            var deferred = $q.defer();
            //加载异步数据
            console.log(localStorage)
            loadUrlData(id,deferred);
            //加载本地数据
            //loadLocalData(id,deferred)
            return deferred.promise
        }
    };
});