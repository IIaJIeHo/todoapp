angular.module('todoApp', [])
  .controller('TodoListController', function($scope) {
    $scope.reverse = true;
    $scope.changed = null;
    $scope.saved = localStorage.getItem('todos');
    $scope.showeditem = localStorage.getItem('showed') == null ? false : true;
    console.log($scope.showeditem);
    $scope.todos = $scope.saved == null ? [] : JSON.parse($scope.saved);
    localStorage.setItem('todos', JSON.stringify($scope.todos));
    $scope.text = 'add';

    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    }
 
    $scope.addTodo = function() {
      if ($scope.changed){
        $scope.todos.splice($scope.todos.indexOf($scope.changed),1);
        $scope.changed = null;
      }
      if (($scope.todoText == undefined) || ($scope.todoText == '')){
        return false;
      }
      $scope.todos.push({title:$scope.todoText, done:false});
      $scope.todoText = '';
      $scope.text = 'add';
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
      $scope.text = 'change';
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

      $scope.showed = function(){
        $scope.showeditem = true;
        localStorage.setItem('showed', true);
      }

    $scope.$watch('todos', function(newVal, oldVal){
      localStorage.setItem('todos', JSON.stringify(newVal));
  }, true);



  });