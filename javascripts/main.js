var chatTableTemplate = Handlebars.compile($("#chat-list-template").html());

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://chat.api.mks.io/chats'
  }).success(function (chats) {
    console.log("Got chats: ", chats);
    var messages = {message: chats};
    $("#main").find("tbody").append(chatTableTemplate(messages));
  })

  $("#submit-comment").on("click", function() {
    var post = $("#comment-field").val();
    $("#comment-field").val("");
    console.log(post)
  })
})

var signUp = function() {
  $("#signup").on("click", function() {
  var user = $(this).parent().find("#new-username").val();
  var pw = $(this).parent().find("#new-password").val();
  $(this).parent().hide();

  $.ajax({
    type: 'POST',
    url: 'http://chat.api.mks.io/signup',
    data: {username: user, password: pw}
    }).success(function (response) {
      console.log("Sign up successful");
    })
  });
};

var logIn = function() {
  $("#login").on("click", function() {
  var user = $(this).parent().find("#login-username").val();
  var pw = $(this).parent().find("#login-password").val();
  $.ajax({
    type: 'POST',
    url: 'http://chat.api.mks.io/signin',
    data: {username: user, password: pw}
    }).success(function (apiToken) {
      console.log("Log in successful");
      $("#login-container").hide();
      $("#signup-container").hide();
      $("#add-comment").prepend("<h2>You're posting as " + user + "</h2>");
      $("#add-comment").show();
      document.cookie = "chatitudeKey=" + apiToken;
    })
  });
}
