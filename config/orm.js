var connection = require("./connection.js");


// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}

var orm = {
    selectAll: function(tableName, cb) { // burgers
      var query = 'SELECT * FROM ' + tableName + ';';
      connection.query(query, function(error, result) {
        if (error) throw error;
        cb(result);
      });
    },
    insertOne: function(tableName, cols, values, cb) {
      var query = 'INSERT INTO ' + tableName;

      query += ' (';
      query += cols.toString();
      query += ') ';
      query += 'VALUES (';
      query += printQuestionMarks(values.length);
      query += '); ';

      connection.query(query, values, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    updateOne: function(tableName, objColVals, condition, cb) {
      var queryString = "UPDATE " + tableName;

      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
  };


module.exports = orm;