var model = require('../../models').models;
var assert = require('assert');

var Todo,Todo2,User,createID;

describe('Todo',function(){
  beforeEach(function(){
    Todo = model('todo');
    User = model('user');
    console.log(model('todo'));
    User.createUser({id:0},'facebook',model,function(ret){
      console.log(ret);
    });
    
  });
  describe('#getAllTodosOfUser()',function(){  
    it('respond with matching records',function(done){
     // Todo.getAllTodosOfUser(model,User,function(results){
     //   console.log(results);
     //   done();
     // });
     console.log("Made it in");
     done();
    });
    
  });
});