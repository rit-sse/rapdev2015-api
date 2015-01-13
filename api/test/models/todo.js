var model = require('../../models').model;
var assert = require('assert');

var Todo,Todo2,User,createID;

describe('Todo',function(){
  beforeEach(function(){
    Todo = model('todo');
    Todo2 = model('todo');
    User = model('user');
    
    User.listUsers('','',function(results){
      console.log(results);
      User = results[0];
    });
    console.log(Todo);
  });
  describe('#getAllTodosOfUser()',function(){  
    it('respond with matching records',function(done){
      Todo.getAllTodosOfUser(model,User,function(results){
        console.log(results);
        done();
      });
    });
    
  });
});