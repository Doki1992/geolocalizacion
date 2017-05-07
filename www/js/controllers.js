angular.module('starter.controllers', [])

.controller('ciegoctrl', function($scope) {
    $scope.data = {
    speechText: 'hola mundo'
  };
  $scope.recognizedText = '';
 
  $scope.speakText = function() {
    //alert("hola");        
    TTS.speak('hello, world!', function () {
        alert('success');
    }, function (reason) {
        alert(reason);
    });

  };
  

})

.controller('prueba', function($scope, $ionicSideMenuDelegate){
   $scope.uno = function(){      
      $ionicSideMenuDelegate.toggleRight();
   };


})

.controller('lcontroler', function($scope){
 $scope.shouldShowDelete = true;
 $scope.shouldShowReorder = true;
 $scope.listCanSwipe = true
 $scope.p = function(){
  alert("hola mundo");

 };
})

.controller('addcontact', function($scope, $http, $sce){
  $scope.contacto = {
    nombre: '',
    numero: ''
  }
  var defaultHTTPHeaders = {
    'Content-type':'json',
    'Accept':'application/json'
  }
  $http.defaults.headers.post = defaultHTTPHeaders;
  $scope.addc = function(){
    var url =  'http://grupo19.esy.es/'
    var postUrl = $sce.trustAsResourceUrl(url);
    $http.post(url,$scope.contacto)
    .then( 
      function(response){
        alert(response.data);
      },
      function(){
        alert('error');
      });
    
  };

  $scope.deleteC=function(){
    alert("se borrara el contacto");
  };


})
.controller('GeolocationCtrl', function($scope, $cordovaGeolocation, $ionicLoading,$ionicPlatform) {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          //alert(lat + " --- " + long);
      }, function(err) {
        alert(err.message);
    });

     ionic.Platform.ready(function(){
            $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
 
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            
            var myLatlng = new google.maps.LatLng(lat, long);
             
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
             
            $scope.map = map;             
            $ionicLoading.hide();
            alert(lat + " --- " + long);         
             
        }, function(err) {
            $ionicLoading.hide();
            alert(err.message);
        });
    }
    );     
})

.controller('Salir', function($scope){
  $scope.salir = function(){
     ionic.Platform.exitApp(); 
     alert('salio');
  };
})
;
