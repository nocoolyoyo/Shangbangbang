//列表模块定义
var commentsList = angular.module("commentsList", ['praise','comments']);

//指令
commentsList.directive("commentsList",function($location){
    //console.log($location.url())
    return{
        restrict:'EA',
        template: '<ul ng-repeat="list in lists">' +
                '<li><span ng-bind="list.content"></span><button ng-click="actionCommentPraise(list)" ng-bind="transPraise(list.isPraise)">' +
                '</button><span ng-bind="list.praiseNum"></span></li>' +
                '</ul>',

        //templateUrl: 'bottomTool.html',用url加载html时最好用根目录路径绝对加载
        controller: 'commentsListCtrl'
    }
});
//控制器
commentsList.controller("commentsListCtrl",function($scope,praiseServ,commentsServ){
    var id = 0;//需要请求的评论列表id
    //加载数据,省了手动渲染列表
    commentsServ.getLists(id).then(function(data){
        $scope.lists = data.list;
    });
    //点赞控制
    $scope.actionCommentPraise = function (list){
        localStorage.lastname="Smith";
        document.write(localStorage.lastname);
        console.log(localStorage.commentList)
        if(list.isPraise === true){
            list.praiseNum--;
        }else{
            list.praiseNum++;
        }
        list.isPraise = ! list.isPraise;
        praiseServ.action(list.id,list.isPraise,list.type).then(function(res) {
            if(res === 'error'){
                list.isPraise = !list.isPraise;
                list.praiseNum--;
            }
        });
    };
    $scope.transPraise = function(isPraise) {
        return (isPraise === true) ? "取消点赞" : "点赞";
    }
});

