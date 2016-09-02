/**
 * Created by trala on 8/30/2016.
 */
var addAuthors = document.getElementById('addAuthor');
var clearListBtn = document.getElementById('clearListBtn');
var importListBtn = document.getElementById('importList');


addAuthors.addEventListener("mouseup", addAuthor);
clearListBtn.addEventListener("click", clearList);
importListBtn.addEventListener("click", importAuthors);

//localStorage.clear();

if (localStorage.getItem('authors') == null) {
    var authors = [];
    var authorsHTML = '';
} else {
    var authors = JSON.parse(localStorage.getItem('authors'));
    var authorsHTML = localStorage.getItem('authorsHTML');
    document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');

}



document.getElementById("authorInput")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            addAuthors.click();
            addAuthors.value = "";
        }
    });


function addAuthor() {

    var input = document.getElementById("authorInput").value.toLowerCase();
    if (authors.indexOf(input) != -1  ) {
        alert('name exists');
        return
    }
    authors.unshift(input);
    if(JSON.parse(localStorage.getItem('following') != null))   {
        localStorage.setItem("authors", JSON.stringify(authors.concat(JSON.parse(localStorage.getItem('following')))));
    }else{
        localStorage.setItem("authors", JSON.stringify(authors));
    }
    var HTMLize = JSON.parse(localStorage.getItem("authors"));

    for (var i = 0; i < HTMLize.length; ++i) {

        HTMLize[i] = ("<div class='author-tile' data-name='" + HTMLize[i] + "'>" + HTMLize[i] + "</div>");
    }

    authorsHTML = HTMLize.join([separator = " "]);
    localStorage.setItem('authorsHTML', authorsHTML);
    document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');
}

function importAuthors(){

    chrome.extension.getBackgroundPage().importList();
    var authimport = authors.concat(JSON.parse(localStorage.getItem("following")));
    localStorage.setItem("authors", JSON.stringify(authimport));
    var authorsArray = JSON.parse(localStorage.getItem("authors"));


    for (var i = 0; i < authorsArray.length; ++i) {

        authorsArray[i] = ("<div class='author-tile' data-name='" + authorsArray[i] + "'>" + authorsArray[i] + "</div>");
    }

    authorsHTML = authorsArray.join([separator = " "]);
    localStorage.setItem('authorsHTML', authorsHTML);
    document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');
}

function clearList() {
    localStorage.removeItem('authors');
    localStorage.removeItem("authorsHTML");
    localStorage.removeItem('following');
    document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');

    location.reload();

}