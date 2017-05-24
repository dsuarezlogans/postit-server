'use strict';

$("#create").submit(function(event) {

  // Stop form from submitting normally
  event.preventDefault();

  // Send the data using post
  var posting = $.post(url, $('#create').serialize());

  // Put the results in a div
  posting.done(function(data) {
    console.log(data);
  });
});
