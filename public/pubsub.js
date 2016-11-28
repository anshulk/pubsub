angular.module('pubSub', [])
  .controller('pubSubController', function($scope) {

    var socket = io();                      // connect to the socket on this server
    socket.on('players', function(data){    // whenever server send 'players'
      console.log(data);
      $scope.players = data;                // update
      $scope.$apply();                      // send to frontend
    });
});