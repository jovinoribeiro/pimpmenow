var app = angular.module('Pimpme', 
	[
		'ngRoute',
		'ngResource'
	]);

//app.constant('BACKEND', 'http://localhost:3000');
app.constant('BACKEND', 'http://pimpmenow.herokuapp.com')

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main.html',
		controller: 'HomeCtrl',
		controllerAs: 'homeCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);   


app.controller('HomeCtrl', function($scope, $http, BACKEND) {
	var homeCtrl = this;
	homeCtrl.greeting = 'Hello World!';

	homeCtrl.fetchData = function(query) {
		var srcUrl = BACKEND + '/main/fetchdata';
/*		$http.get( srcUrl )
		.then (function(result) {
			homeCtrl.userData = result.data;
		});
*/
		$http( {  
			url: srcUrl,
			method: 'GET',
			params : { query : query}
		})
		.then (function(result) {
			homeCtrl.userData = result;
		});
	};
});
