angular.module('myGuestApp', [])
  .controller('MyGuestController', ['$scope', '$http', function($scope, $http) {
    $scope.guests = [];
    $scope.newGuest = {};

    $http.get("/api/guest").success(function(data){
      $scope.guests = data;
    })

    $scope.addGuest = function() {
      console.log($scope.newGuest);
      $http.post("/api/guest", $scope.newGuest).success(function(data){
        console.log(data);
        $scope.guests.push(data.guest);
      });
    };

    $scope.deleteGuest = function(id) {
      $http.delete("/api/guest/" + id).success(function(data){
        console.log(data);
        var idx = -1;
        for(i=0; i<$scope.guests.length; i++) {
          if($scope.guests[i]._id == id) {
            idx = i;
            break;
          }
        }
        $scope.guests.splice(idx,1);
      });

    };

  }]);