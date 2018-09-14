app=angular.module('starter.editRecencyCtrl', ['starter.services'])
.controller('editRecencyCtrl', function($scope, $stateParams,$preLoader,$localStorage, $window,$filter) {
    $scope.recency = {};
    $scope.recencyData ={};
    $(document).ready(function(){
        $('#autocomplete-facilities')
        .autocomplete({
          data: {
            "Flow Cytometry facility": null,
            "Viral Load": null,
            "Serology": null
          },
          minLength:0
        })
        
        $('.datepicker').datepicker();
        $('.tabs').tabs();
        if(!localStorage.getItem('counter')){
          $scope.counter =0;
          localStorage.setItem('counter', $scope.counter);
        }

      });
      // $scope.recency={gender:"female"};
      $scope.doRefresh = function() {
        $preLoader.show();
        $window.location.reload(true);
        $preLoader.hide();
        
      }
      $scope.genders = [
        { title: "Male",id:"male", checked: false },
        { title: "Female",id:"female", checked: false }
       
    ];
    //console.log($scope.recencyData)
    $scope.updateSelection = function(position, genders, title) {
        angular.forEach(genders, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.selected = title;
          //          console.log(title)
            }
        );

        if( $scope.selected == "Male"){
          $scope.recency.genders = "male"
        }else{
          $scope.recency.genders = "female"
        }
    }
var localarr =[];
$scope.facilities=[];
  localarr = JSON.parse(localStorage.getItem('RecencyData'));
  console.log(localarr);
  var localarrsize = Object.keys(localarr).length;
console.log(localarrsize);
for(i=0;i<localarrsize;i++){
  $scope.facilities.push({
    "facility_name":localarr[i]['facilities']
  })
}
console.log($scope.facilities)
      $scope.addRecency = function(){
        var count = localStorage.getItem('counter');
        $scope.counter  = parseInt(count) + 1;  
        $scope.digodate=$("#digodate").val();
         $scope.recencydate=$("#recencydate").val();
        $scope.recency.digodate =   $filter('date')($scope.digodate, "dd-MM-yyyy");
        $scope.recency.recencydate =   $filter('date')($scope.recencydate, "dd-MM-yyyy");
       //console.log($scope.recency);
       //console.log( $scope.counter);
        var recency = $scope.recency;
        if(JSON.parse(localStorage.getItem('RecencyData'))!=null){
         // console.log(JSON.parse(localStorage.getItem('RecencyData')))
            $scope.recencyData =JSON.parse(localStorage.getItem('RecencyData'));
        }       
         $scope.recencyData[$scope.counter-1] =recency;
         $scope.recency ={};
         for(i=0;i<$scope.genders.length;i++)
         {
          $scope.genders[i]['checked']=false;
         }         
          localStorage.setItem('RecencyData',JSON.stringify($scope.recencyData)) 
          //console.log( JSON.stringify($scope.recencyData));
          localStorage.setItem('counter', $scope.counter);
      }

});