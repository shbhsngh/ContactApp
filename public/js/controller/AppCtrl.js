'use Strict';
app.controller('AppCtrl',['$scope','$http',function($scope,$http){
    console.log("Hello App Controller");
    var refresh = function() {
       var promise=$http.get('/dddd');
        promise.success(function (response) {
            console.log("GOT data that requested");
            $scope.contactList = response;
            console.log(response+"ffddfdfdfdfdfdfdfdfdfdfd");
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactApp',$scope.contact).success(function(response){
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/delContact/' + id).success(function(response){
            refresh();
        });
    };

    $scope.edit = function(id){
       console.log(id);
        $http.get('/editContact/' + id).success(function(response){
            $scope.contact = response;
        });
    };

    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/updateContact/' + $scope.contact._id, $scope.contact).success(function(response){
            refresh();
        });
    };

    $scope.deselect = function(){
        $scope.contact = "";
    };

}]);