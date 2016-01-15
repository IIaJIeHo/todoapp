angular.module('todoApp', [])
  .controller('TodoListController', function($scope) {
    $scope.todos = [
      {title:'learn angular', done:true},
      {title:'build an angular app', done:false}];
    $scope.reverse = true;
    $scope.changed = null;

    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    }
 
    $scope.addTodo = function() {
      if ($scope.changed){
        $scope.todos.splice($scope.todos.indexOf($scope.changed),1);
        $scope.changed = null;
      }
      $scope.todos.push({title:$scope.todoText, done:false});
      $scope.todoText = '';
    };
 
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.change = function(todo){
      $scope.changed = todo;
      $scope.todoText = todo.title;
    }
 
    $scope.archive = function() {
      var oldTodos = todoList.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });