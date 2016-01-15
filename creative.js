angular.module('todoApp', [])
  .controller('TodoListController', function($scope) {
    $scope.reverse = true;
    $scope.changed = null;
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = $scope.saved == null ? [] : JSON.parse($scope.saved);
    localStorage.setItem('todos', JSON.stringify($scope.todos));

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

    $scope.changeTodo = function(todo){
      $scope.changed = todo;
      $scope.todoText = todo.title;
    }
    //delete on double click
    $scope.deleteTodo = function(todo){
      $scope.todos.splice($scope.todos.indexOf(todo),1);
    }
 
    $scope.deleteAutos = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };

    $scope.$watch('todos', function(newVal, oldVal){
      localStorage.setItem('todos', JSON.stringify(newVal));
  }, true);

  });