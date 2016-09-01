/**
 * Created by trala on 8/30/2016.
 */
var addAuthors = document.getElementById('addAuthor');
var clearListBtn = document.getElementById('clearListBtn');
var importListBtn = document.getElementById('importList');

addAuthors.addEventListener("mouseup", addAuthor);
clearListBtn.addEventListener("click", clearList);
importListBtn.addEventListener("click", importAuthors);



if (localStorage.getItem('authors') == null) {
    var authors = '';
    var authorsHTML = '';
} else {
    var authors = localStorage.getItem('authors');
    var authorsHTML = localStorage.getItem('authorsHTML');
}
document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');


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

    if (authors.includes(" " + input + " ") == true ) {
        alert('name exists');
        return
    }
    authors = input + " " + authors;
    localStorage.setItem("authors", authors);
    var authorsArray = authors.split(" ");
    authorsArray.pop();

    for (i = 0; i < authorsArray.length; ++i) {

        authorsArray[i] = ("<div class='author-tile' data-name='" + authorsArray[i] + "'>" + authorsArray[i] + "</div>");
    }

    authorsHTML = authorsArray.join([separator = " "]);
    console.log(authorsArray);
    localStorage.setItem('authorsHTML', authorsHTML);
    document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');
}

function importAuthors(){

    chrome.extension.getBackgroundPage().importList();
    authors = localStorage.getItem("following") +" "+ authors;
    localStorage.setItem("authors", authors);
    var authorsArray = authors.split(" ");
    authorsArray.pop();

    for (i = 0; i < authorsArray.length; ++i) {

        authorsArray[i] = ("<div class='author-tile' data-name='" + authorsArray[i] + "'>" + authorsArray[i] + "</div>");
    }

    authorsHTML = authorsArray.join([separator = " "]);
    console.log(authorsArray);
    localStorage.setItem('authorsHTML', authorsHTML);
    document.getElementById('authorList').innerHTML = localStorage.getItem('authorsHTML');
}

function clearList() {
    localStorage.removeItem('authors');
    localStorage.removeItem("authorsHTML");

    location.reload();

}