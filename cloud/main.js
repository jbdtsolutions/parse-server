Parse.Cloud.define('sendPush', function(request, response) {
      
var query = new Parse.Query(Parse.Installation);
query.whereEqualTo("email", request.params.email);

Parse.Push.send({
  where: query,
  data: {
    alert: 'You have a new message from ' + request.params.username + '!'
  }
}, {
  success: function() {
    console.log('##### PUSH OK');
  },
  error: function(error) {
    console.log('##### PUSH ERROR');
  },
  useMasterKey: true
});

}
	