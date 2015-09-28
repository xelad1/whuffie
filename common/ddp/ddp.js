var DDPClient = require('ddp-client');

var DDP = function(params) {
  this.ddpClient = new DDPClient(params);
  this.collections = this.ddpClient.collections;
};

DDP.prototype.initialize = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.ddpClient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this back will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        reject(error);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected to Meteor server');
      resolve(true);
    });
  });
};

// Method to close the ddp connection
DDP.prototype.close = function() {
  return this.ddpClient.close();
};

// Promise-based subscription
DDP.prototype.subscribe = function(pubName, params) {
  var self = this;
  params = params || undefined;
  if (params && !Array.isArray(params)) {
    console.warn('Params must be passed as an array to DDP.subscribe');
  }
  return new Promise(function(resolve) {
    self.ddpClient.subscribe(pubName, params, function() {
      resolve(true);
    });
  })
};

// Promise-based method call
DDP.prototype.call = function(methodName, params) {
  var self = this;
  params = params || undefined;
  if (params && !Array.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.call');
  }

  return new Promise(function(resolve, reject) {
    self.ddpClient.call(methodName, params,
      function (err, result) {   // callback which returns the method call results
        // console.log('called function, result: ' + result);
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
      function () {
        // callback which fires when server has finished
        // console.log('updated');  // sending any updated documents as a result of
        // console.log(ddpclient.collections.posts);  // calling this method
      }
    );
  });
};

module.exports = DDP;