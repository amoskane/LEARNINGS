
var textInputElement = document.getElementById('textInput'),
    nameDivElement = document.getElementById('nameDiv');

textInputElement.addEventListener('keyup', function(){
	var text = textInputElement.value;
	nameDivElement.innerHTML = text;
});


SAME in jQuery:
$('#textInput').on('keyup', function(){
	$('#nameDiv').html($('#textInput').val());
});

---------------------

WITHOUT CONTROLLER:
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
  </head>
  <body>
    First name:<input ng-model="firstName" type="text"/>
    <br>
    Last name:<input ng-model="lastName" type="text"/>
    <br>
    Hello {{firstName}} {{lastName}}
  </body>
</html>


WITH CONTROLLER:
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
--    <script>
--      function NameCtrl($scope){
--        $scope.firstName = 'John';
--        $scope.lastName = 'Smith';
--      }
--    </script>
  </head>
--  <body ng-controller="NameCtrl">
    First name:<input ng-model="firstName" type="text"/>
    <br>
    Last name:<input ng-model="lastName" type="text"/>
    <br>
    Hello {{firstName}} {{lastName}}
  </body>
</html>


WITH CONTROLLER IN MODULE:
//changes show up on page, but do not go into the scope
<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
--      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.firstName = 'John';
        $scope.lastName = 'Smith';
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    First name:<input ng-model="firstName" type="text"/>
    <br>
    Last name:<input ng-model="lastName" type="text"/>
    <br>
    Hello {{firstName}} {{lastName}}
  </body>
</html>


WITH A WATCHER:
//Changing scope values asynchronously - updates don't propagate without .apply().
//now they go to the page and the console
//starting lastName value does not show on page
<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.firstName = 'John';

        $scope.$watch('lastName', function(newValue, oldValue){
          console.log('new value is ' + newValue);
        });

        setTimeout(function(){
          $scope.lastName = 'Smith';
        }, 1000);
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    First name:<input ng-model="firstName" type="text"/>
    <br>
    Last name:<input ng-model="lastName" type="text"/>
    <br>
    Hello {{firstName}} {{lastName}}
  </body>
</html>


WITH AN $apply:
//Changing scope values asynchronously - updates propagate .apply().
//starting lastName value DOES show on page
<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.firstName = 'John';

        $scope.$watch('lastName', function(newValue, oldValue){
          console.log('new value is ' + newValue);
        });

        setTimeout(function(){
          $scope.lastName = 'Smith';
          $scope.$apply();
        }, 1000);
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    First name:<input ng-model="firstName" type="text"/>
    <br>
    Last name:<input ng-model="lastName" type="text"/>
    <br>
    Hello {{firstName}} {{lastName}}
  </body>
</html>


NG-REPEAT
<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.names = ['Larry', 'Curly', 'Moe'];
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    <ul>
      <li ng-repeat="name in names">{{name}}</li>
    </ul>
  </body>
</html>


NG-SUBMIT
//Adding entries to a list using forms and ng-submit.
<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.names = ['Larry', 'Curly', 'Moe'];

--        $scope.addName = function() {
--          $scope.names.push($scope.enteredName);
        };
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    <ul>
      <li ng-repeat="name in names">{{name}}</li>
    </ul>
--    <form ng-submit="addName()">
--      <input type="text" ng-model="enteredName">
--      <input type="submit" value="add">
--    </form>
  </body>
</html>


CLEAR THE ENTERED NAME 
$scope.addName = function() {
    $scope.names.push($scope.enteredName);
    $scope.enteredName = '';
};


//Removing names from a list using ng-click.
        $scope.removeName = function(name) {
          var i = $scope.names.indexOf(name);
          $scope.names.splice(i, 1);
        };
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    <ul>
      <li ng-repeat="name in names">{{name}}
      <a href="" ng-click="removeName(name)">remove</a></li>
    </ul>


//Enumerating objects - countries and their populations.
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', []);
      countryApp.controller('CountryCtrl', function ($scope){
        $scope.countries = [
          {"name": "China", "population": 1359821000},
          {"name": "India", "population": 1205625000},
          {"name": "United States of America","population": 312247000}
        ];
      });
    </script>
  </head>
  <body ng-controller="CountryCtrl">
    <ul>
      <li ng-repeat="country in countries">{{country.name}} - population {{country.population}}</li>
    </ul>
  </body>
</html>


IN A TABLE:
 <table>
   <tr>
     <th>Country</th>
     <th>Population</th>
   </tr>
   <tr ng-repeat="country in countries">
     <td>{{country.name}}</td>
     <td>{{country.population}}</td>
   </tr>
 </table>


FETCHING JSON:
 <html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', []);
      countryApp.controller('CountryCtrl', function ($scope, $http){
--        $http.get('countries.json').success(function(data) {
--          $scope.countries = data;
        });
      });
    </script>
  </head>
  <body ng-controller="CountryCtrl">
    <table>
      <tr>
        <th>Country</th>
        <th>Population</th>
      </tr>
      <tr ng-repeat="country in countries">
        <td>{{country.name}}</td>
        <td>{{country.population}}</td>
      </tr>
    </table>
  </body>
</html>


DEPENDENCY INJECTION FOR MINIFICATION
countryApp.controller('CountryCtrl', ['$scope', '$http', function (scope, http){
  http.get('countries.json').success(function(data) {
    scope.countries = data;
  });
}]);
    

ADD SEARCH WITH A FILTER
<body ng-controller="CountryCtrl">
--  Search:<input ng-model="query" type="text"/>
  <table>
    <tr>
      <th>Country</th>
      <th>Population</th>
    </tr>
--    <tr ng-repeat="country in countries | filter:query">
      <td>{{country.name}}</td>
      <td>{{country.population}}</td>
    </tr>
  </table>
</body>


SORTING IN AN NG-REPEAT
  <body ng-controller="CountryCtrl">
    Search:<input ng-model="query" type="text"/>
    <table>
      <tr>
        <th>Country</th>
        <th>Population</th>
      </tr>
      <tr ng-repeat="country in countries | filter:query | orderBy:'population'">
        <td>{{country.name}}</td>
        <td>{{country.population}}</td>
      </tr>
    </table>
  </body>


OR DECENDING
orderBy:'-population'


SORT TABLE COLUMNS interactively.
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', []);
      countryApp.controller('CountryCtrl', function ($scope, $http){
        $http.get('countries.json').success(function(data) {
          $scope.countries = data;
        });

--        $scope.sortField = 'population';
      });
    </script>
  </head>
  <body ng-controller="CountryCtrl">
    Search:<input ng-model="query" type="text"/>
    <table>
      <tr>
--        <th><a href="" ng-click="sortField = 'name'">Country</a></th>
--        <th><a href="" ng-click="sortField = 'population'">Population</a></th>
      </tr>
--      <tr ng-repeat="country in countries | filter:query | orderBy:sortField">
        <td>{{country.name}}</td>
        <td>{{country.population}}</td>
      </tr>
    </table>
  </body>
</html>


REVERSE SORT
        $scope.sortField = 'population';
        $scope.reverse = true;
      });
    </script>
  </head>
  <body ng-controller="CountryCtrl">
    Search:<input ng-model="query" type="text"/>
    <table>
      <tr>
        <th><a href="" ng-click="sortField ='name'; reverse = !reverse">Country</a></th>
        <th><a href="" ng-click="sortField = 'population'; reverse = !reverse">Population</a></th>
      </tr>
      <tr ng-repeat="country in countries | filter:query | orderBy:sortField:reverse">


ADD FLAGS
<td><img src="{{country.flagURL}}" width="100" /></td>
"flagURL": "//upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"


WITH ng-SRC
<td><img ng-src="{{country.flagURL}}" width="100"></td>


FORMAT CURRENCY
<td>{{country.gdp | currency }}</td>
$12,261.00


FORMAT Population
<td>{{country.population | number }}</td>
1,359,821,000


PREP for ROUTING
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', []);
      countryApp.controller('CountryListCtrl', function ($scope, $http){
        $http.get('countries.json').success(function(data) {
          $scope.countries = data;
        });
      });
    </script>
  </head>
  <body ng-controller="CountryListCtrl">
    <ul>
      <li ng-repeat="country in countries">{{country.name}}</li>
    <ul>
  </body>
</html>


ROUTING
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular-route.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', ['ngRoute']);

      countryApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            template: '<ul><li ng-repeat="country in countries">{{country.name}}</li><ul>',
            controller: 'CountryListCtrl'
          }).
          when('/:countryName', {
            template: '<h1>TODO create country detail view</h1>',
            controller: 'CountryDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
      });

      countryApp.controller('CountryListCtrl', function ($scope, $http){
        $http.get('countries.json').success(function(data) {
          $scope.countries = data;
        });
      });

      countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams){
        console.log($routeParams);
      });
    </script>
  </head>
  <body>
    <div ng-view></div>
  </body>
</html>
1) An additional script tag has been added for angular-route, which defines the ngRoute module.
2) The ngRoute module was added as a dependency to countryApp, which provides the $routeProvider API.
3) The config() call sets up the routes using inline strings as templates.
4) A placeholder CountryDetailCtrl was added.
5) A div with the ng-view directive was added to the body. This is where the route provider 
injects content rendered from the template associated with the current route.


SEPERATE INTO 3 FILES:
INDEX.html
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular-route.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', ['ngRoute']);

      countryApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'country-list.html',
            controller: 'CountryListCtrl'
          }).
          when('/:countryName', {
            templateUrl: 'country-detail.html',
            controller: 'CountryDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
      });

      countryApp.controller('CountryListCtrl', function ($scope, $http){
        $http.get('countries.json').success(function(data) {
          $scope.countries = data;
        });
      });

      countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams){
        console.log($routeParams);
      });
    </script>
  </head>
  <body>
    <div ng-view></div>
  </body>
</html>

COUNTRY-DETAIL.html
<h1>TODO create country detail view</h1>

COUNTRY-LIST.html
<ul>
  <li ng-repeat="country in countries">{{country.name}}</li>
<ul>


EXTRACT and USE parameters from routes
countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams){
    $scope.name = $routeParams.countryName;
});


Using links with routes for navigation between views
country-list.html
<ul>
  <li ng-repeat="country in countries">
    <a href="#/{{country.name}}">{{country.name}}</a>
  </li>
<ul>


LOOKING UP DETAILS
countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, $http){
    $scope.name = $routeParams.countryName;
    $http.get('countries.json').success(function(data) {
    	var country = data.filter(function(entry){
            return entry.name === $scope.name;
        })[0];
        console.log(country);
    });
});


GET DETAILS on detail page
<h1>{{country.name}}</h1>
<ul>
  <li>Flag: <img ng-src="{{country.flagURL}}" width="100"></li>
  <li>Population: {{country.population | number }}</li>
  <li>Capital: {{country.capital}}</li>
  <li>GDP: {{country.gdp | currency }}</li>
</ul>

index:
$http.get('countries.json').success(function(data) {
  $scope.country = data.filter(function(entry){
    return entry.name === $scope.name;
  })[0];
});
      

GET DATA IN A SERVICE
countryApp.factory('countries', function($http){
  return {
    list: function(callback){
      $http.get('countries.json').success(callback);
    }
  };
});

// countryApp.controller('CountryListCtrl', function ($scope, $http){
//     $http.get('countries.json').success(function(data) {
//         $scope.countries = data;
//     });
// });
countryApp.controller('CountryListCtrl', function ($scope, countries){
  countries.list(function(countries) {
    $scope.countries = countries;
  });
});

countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, $http){
  $http.get('countries.json').success(function(data) {
    $scope.country = data.filter(function(entry){
      return entry.name === $routeParams.countryName
    })[0];
  });
});


//Extracting the country details query into a service
countryApp.factory('countries', function($http){
  return {
    list: function(callback){
      $http.get('countries.json').success(callback);
    },
    find: function(name, callback){
      $http.get('countries.json').success(function(data) {
        var country = data.filter(function(entry){
          return entry.name === name;
        })[0];
        callback(country);
      });
    }
  };
});


//Caching JSON data in a service.
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular-route.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', ['ngRoute']);

      countryApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'country-list.html',
            controller: 'CountryListCtrl'
          }).
          when('/:countryName', {
            templateUrl: 'country-detail.html',
            controller: 'CountryDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
      });

      countryApp.factory('countries', function($http){
        var cachedData;
        function getData(callback){
          if(cachedData) {
            callback(cachedData);
          } else {
            $http.get('countries.json').success(function(data){
              cachedData = data;
              callback(data);
            });
          }
        }
        return {
          list: getData,
          find: function(name, callback){
            getData(function(data) {
              var country = data.filter(function(entry){
                return entry.name === name;
              })[0];
              callback(country);
            });
          }
        };
      });

      countryApp.controller('CountryListCtrl', function ($scope, countries){
        countries.list(function(countries) {
          $scope.countries = countries;
        });
      });

      countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, countries){
        countries.find($routeParams.countryName, function(country) {
          $scope.country = country;
        });
      });
    </script>
  </head>
  <body>
    <div ng-view></div>
  </body>
</html>



Caching JSON using cache option:
// countryApp.factory('countries', function($http){
//   var cachedData;
//   function getData(callback){
//     if(cachedData) {
//       callback(cachedData);
//     } else {
//       $http.get('countries.json').success(function(data){
//         cachedData = data;
//         callback(data);
//       });
//     }
//   }
//   return {
//     list: getData,
//     find: function(name, callback){
//       getData(function(data) {
//         var country = data.filter(function(entry){
//           return entry.name === name;
//         })[0];
//         callback(country);
//       });
//     }
//   };
// });

countryApp.factory('countries', function($http){
  function getData(callback){
    $http({
      method: 'GET',
      url: 'countries.json',
      cache: true
    }).success(callback);
  }
  return {
    list: getData,
    find: function(name, callback){
      getData(function(data) {
        var country = data.filter(function(entry){
          return entry.name === name;
        })[0];
        callback(country);
      });
    }
  };
});

//Creating a custom filter to encode URIs
country-list.html
<ul>
  <li ng-repeat="country in countries">
    <a href="#/{{country.name | encodeURI}}">{{country.name}}</a>
  </li>
<ul>

countryApp.filter('encodeURI', function(){
    return window.encodeURI;
});


//Simulating a RESTful service by splitting the JSON data across files.
countryApp.factory('countries', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'countries.json',
        cache: true
      }).success(callback);
    },
    find: function(id, callback){
      $http({
        method: 'GET',
        url: 'country_' + id + '.json',
        cache: true
      }).success(callback);
    }
  };
});

countries.json
[
  {
    "name": "China",
    "id": 1
  },
  {
    "name": "India",
    "id": 2
  },
  {
    "name": "United States of America",
    "id": 3
  }
]

country_1.json
{
  "name": "China",
  "population": 1359821000,
  "flagURL": "//upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  "capital": "Beijing",
  "gdp": 12261
}


//Creating a custom Angular directive for country entries.
countryApp.directive('country', function(){
  return {
    scope: {
      country: '='
    },
    restrict: 'A',
    templateUrl: 'country.html'
  };
});

country.html
<a href="#/{{country.id}}">{{country.name}}</a>

country-list.html
// <ul>
//   <li ng-repeat="country in countries">
//     <a href="#/{{country.id}}">{{country.name}}</a>
//   </li>
// <ul>
<ul>
  <li ng-repeat="country in countries" country="country"></li>
<ul>


//Adding a controller to our custom directive
countryApp.directive('country', function(){
  return {
    scope: {
      country: '='
    },
    restrict: 'A',
    templateUrl: 'country.html',
    controller: function($scope, countries){
      console.log($scope.country);
    }
  };
});


//Fetching data within custom directives - adding flags to the country listing.
countryApp.directive('country', function(){
  return {
    scope: {
      country: '='
    },
    restrict: 'A',
    templateUrl: 'country.html',
    controller: function($scope, countries){
      countries.find($scope.country.id, function(country) {
        $scope.flagURL = country.flagURL;
      });
    }
  };
});

country.html
<img ng-src="{{flagURL}}" width="20">
<a href="#/{{country.id}}">{{country.name}}</a>


//Extracting controllers into a separate module
index.html
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
 
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular-route.min.js"></script>

    <script src="countryControllers.js"></script>
    <script src="app.js"></script>
  </head>
  <body>
    <div ng-view></div>
  </body>
</html>

country-detail.html
<h1>{{country.name}}</h1>
<ul>
  <li>Flag: <img ng-src="{{country.flagURL}}" width="100"></li>
  <li>Population: {{country.population | number }}</li>
  <li>Capital: {{country.capital}}</li>
  <li>GDP: {{country.gdp | currency }}</li>
</ul>

country-list.html
<ul>
  <li ng-repeat="country in countries" country="country"></li>
<ul>

country.html
<img ng-src="{{flagURL}}" width="20">
<a href="#/{{country.id}}">{{country.name}}</a>

app.js
var countryApp = angular.module('countryApp', ['ngRoute', 'countryControllers']);
countryApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'country-list.html',
      controller: 'CountryListCtrl'
    }).
    when('/:countryId', {
      templateUrl: 'country-detail.html',
      controller: 'CountryDetailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});
 
countryApp.factory('countries', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'countries.json',
        cache: true
      }).success(callback);
    },
    find: function(id, callback){
      $http({
        method: 'GET',
        url: 'country_' + id + '.json',
        cache: true
      }).success(callback);
    }
  };
});
 
countryApp.directive('country', function(){
  return {
    scope: {
      country: '='
    },
    restrict: 'A',
    templateUrl: 'country.html',
    controller: function($scope, countries){
      countries.find($scope.country.id, function(country) {
        $scope.flagURL = country.flagURL;
      });
    }
  };
});

countryControllers.js
var countryControllers = angular.module('countryControllers', []);

countryControllers.controller('CountryListCtrl', function ($scope, countries){
  countries.list(function(countries) {
    $scope.countries = countries;
  });
});
 
countryControllers.controller('CountryDetailCtrl', function ($scope, $routeParams, countries){
  countries.find($routeParams.countryId, function(country) {
    $scope.country = country;
  });
});

countries.json
[
  {
    "name": "China",
    "id": 1
  },
  {
    "name": "India",
    "id": 2
  },
  {
    "name": "United States of America",
    "id": 3
  }
]

country_1.json
{
  "name": "China",
  "population": 1359821000,
  "flagURL": "//upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  "capital": "Beijing",
  "gdp": 12261
}

country_2.json
{
  "name": "India",
  "population": 1205625000,
  "flagURL": "//upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
  "capital": "New Delhi",
  "gdp": 4716
}

country_3.json
{
  "name": "United States of America",
  "population": 312247000,
  "flagURL": "//upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  "capital": "Washington, D.C.",
  "gdp": 16244
}



//Extracting factories and directives to separate modules using method chaining.
index.html
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>

    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular-route.min.js"></script>

    <script src="countryControllers.js"></script>
    <script src="countriesFactory.js"></script>
    <script src="countryDirective.js"></script>
    <script src="app.js"></script>
  </head>
  <body>
    <div ng-view></div>
  </body>
</html>

countriesFactory.js
angular.module('countriesFactory', [])
       .factory('countries', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'countries.json',
        cache: true
      }).success(callback);
    },
    find: function(id, callback){
      $http({
        method: 'GET',
        url: 'country_' + id + '.json',
        cache: true
      }).success(callback);
    }
  };
});

countryDirective.js
angular.module('countryDirective', [])
       .directive('country', function(){
  return {
    scope: { country: '=' },
    restrict: 'A',
    templateUrl: 'country.html',
    controller: function($scope, countries){
      countries.find($scope.country.id, function(country) {
        $scope.flagURL = country.flagURL;
      });
    }
  };
});

 

