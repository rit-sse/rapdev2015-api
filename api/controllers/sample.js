"use strict";

module.exports = {

  hello: function(req,res,next) {
    return res.send({hello: "world"});
  }

};