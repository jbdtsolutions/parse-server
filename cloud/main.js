Parse.Cloud.define('sendPush', function(request, response) {
 
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.whereEqualTo("email", request.params.email);

   Parse.Push.send({
   where: pushQuery,
     data: {
        alert: 'You have a new message from ' + request.params.username + '!'
      }, 
      push_time: request.params.date
    }, {
      success: function() {
        // Push was successful
        response.success('push successful')
      },
      error: function(error) {
        // Handle error
        response.error('push failed')
      }
   });

    });
	
	