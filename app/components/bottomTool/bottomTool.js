//底部工具栏模块定义
var bottomTool = angular.module("bottomTool", ['praise','favorite', 'comments']);
//指令
bottomTool.directive("bottomTool",function($location){
    //console.log($location.url())
    return{
        restrict:'EA',
        template: '<div >' +
                '<textarea ng-model="comment"></textarea>' +
                '<button ng-click="actionAudio()">语音</button>' +
                '<button ng-click="actionFavorite()" ng-bind="favoriteButton"></button>' +
                '<button ng-click="actionPraise()" ng-bind="praiseButton"></button><span ng-bind="praiseNum"></span>' +
                '<button ng-click="actionShare()">分享</button>' +
                '<button ng-click="actionComment()">发送评论</button>' +
                '</div>',
        //templateUrl: 'bottomTool.html',用url加载html时最好用根目录路径绝对加载
        controller: 'bottomToolCtrl'
    }
});
//控制器
bottomTool.controller("bottomToolCtrl",function($scope,praiseServ,favoriteServ,commentsServ){
    $scope.praiseButton = '点赞';
    $scope.praiseNum = 666;
    $scope.favoriteButton = '收藏';
    //语音控制
    $scope.actionAudio = function () {
        console.log(1111)
    };
    //收藏控制
    $scope.actionFavorite = function () {
        var id = 0; //需要传递的id
        var action = 0;//点赞和取消判断标志

        if($scope.favoriteButton === "收藏"){
            $scope.favoriteButton = "取消收藏";
            action = 0;
        }else{
            $scope.favoriteButton = "收藏";
            action = 1;
        }
        favoriteServ.action(id, action).then(function(res) {
            if(res === 'error'){
                if($scope.favoriteButton === "收藏"){
                    $scope.favoriteButton = "取消收藏";
                }else{
                    $scope.favoriteButton = "收藏";
                }
            }
        });
    };
    //点赞控制
    $scope.actionPraise = function (id) {
        var id = 0; //需要传递的id
        var action = 0;//点赞和取消判断标志
        if($scope.praiseButton === "点赞"){
            $scope.praiseButton = "取消点赞";
            $scope.praiseNum++;
            action = 0;
        }else{
            $scope.praiseButton = "点赞";
            $scope.praiseNum--;
            action = 1;
        }
        praiseServ.action(id, action).then(function(res) {
            if(res === 'error'){
                if($scope.praiseButton === "点赞"){
                    $scope.praiseButton = "取消点赞";
                    $scope.praiseNum++;
                }else{
                    $scope.praiseButton = "点赞";
                    $scope.praiseNum--;
                }
            }
        });
    };
    //评论控制
    $scope.actionComment = function () {
        var id = 0;//需要传递的id
        commentsServ.sendComment(id,$scope.comment).then(function(res) {
            if(res === 'error'){
                //操作失败行为
            }
        });

    };
    $scope.actionShare = function () {
        console.log(1111)
    };


});