var chatTableTemplate = Handlebars.compile($("#chat-list-template").html());

var checkCookies = function() {
  var allCookies = document.cookie.split(';');
  if (allCookies) {
    var apiKey = allCookies.map(function(v,i,a) {
      if (v.indexOf("chatitudeKey") === 0) {
        var key = v.slice(v.indexOf('=')+1, v.length);
        return key;
      }
    })
    return apiKey;
  }
  return "";
}

var postComment = function() {
  var post = $("#comment-field").val();
  $("#comment-field").val("");
  var key = checkCookies()[0];

  $.ajax({
    type: 'POST',
    url: 'http://chat.api.mks.io/chats',
    data: {apiToken: key, message: post}
  }).success(function () {
    loggedIn();
  })
}

var showChat = function() {
  $.ajax({
  type: 'GET',
  url: 'http://chat.api.mks.io/chats'
  }).success(function (chats) {
    var messages = {message: chats};
    $("#main").find("tbody").append(chatTableTemplate(messages));
  });
}

var signUp = function() {
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
};

var logIn = function() {
  var user = $(this).parent().find("#login-username").val();
  var pw = $(this).parent().find("#login-password").val();
  $.ajax({
    type: 'POST',
    url: 'http://chat.api.mks.io/signin',
    data: {username: user, password: pw}
  }).success(function (apiToken) {
    loggedIn();
    document.cookie = "chatitudeKey=" + apiToken.apiToken;
    console.log(apiToken.apiToken)
  })
}

var loggedIn = function() {
  $("#login-container").hide();
  $("#signup-container").hide();
  $("#add-comment").show();
  $("#main").find("tbody").children().remove();
  showChat();
  $("#main").show();
}

$(document).ready(function() {

  var apiKey = checkCookies()[0];
  if (apiKey.length > 1) {
    loggedIn()
    setInterval(loggedIn, 10000);
  }

  $("#submit-comment").on("click", postComment);

  $("#signup").on("click", signUp);

  $("#login").on("click", logIn);

})


