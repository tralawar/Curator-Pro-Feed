/**
 * Created by trala on 8/30/2016.
 */
var usernameInput = document.getElementById('username');

var voteat = document.getElementById('voteat');
var weight = document.getElementById('voteweight');


usernameInput.value = localStorage.getItem("username");



if (localStorage.getItem('voteAt') == null) {
    localStorage.setItem('voteAt', 30);
}
if (localStorage.getItem('voteweight') == null){
    localStorage.setItem('voteweight', 10000);
}

voteat.value = localStorage.getItem('voteAt');
weight.value = parseInt(localStorage.getItem('voteweight'))/100;

voteat.addEventListener("keyup", function(){
   localStorage.setItem("voteAt", voteat.value);
    console.log(localStorage.getItem('voteAt'));
});


weight.addEventListener("keyup", function(){
   localStorage.setItem("voteweight", weight.value*100);
    console.log(localStorage.getItem('voteweight'));
});

usernameInput.addEventListener("keyup", function(){


   localStorage.setItem("username", usernameInput.value);
    if (localStorage.username.startsWith("@"))
            localStorage.username = localStorage.username.substring(1);
    console.log(localStorage.getItem('username'));
});


usernameInput.addEventListener("paste", function(){
   localStorage.setItem("username", usernameInput.value);
    if (localStorage.username.startsWith("@"))
            localStorage.username = localStorage.username.substring(1);
    console.log(localStorage.getItem('username'));
});
