/**
 * Created by trala on 8/30/2016.
 */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
 Grays out or [whatever the opposite of graying out is called] the option
 field.
 */
function ghost(isDeactivated) {
    options.style.color = isDeactivated ? 'graytext' : 'black';
    // The label color.
    options.frequency.disabled = isDeactivated;
    options.username.disabled = isDeactivated;
    options.notifyUpvotes.disabled = isDeactivated;
    options.notifyDownvotes.disabled = isDeactivated;
    options.notifyComments.disabled = isDeactivated;
}


function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}


window.addEventListener('load', function () {







    // Initialize the option controls.
    options.isActivated.checked = JSON.parse(localStorage.isActivated);
    // The display activation.
    options.frequency.value = localStorage.frequency;
    // The display frequency, in minutes.

    options.username.value = localStorage.username;

    options.notifyUpvotes.checked = JSON.parse(localStorage.notifyUpvotes);
    options.notifyDownvotes.checked = JSON.parse(localStorage.notifyDownvotes);
    options.notifyComments.checked = JSON.parse(localStorage.notifyComments);


    document.getElementById('feed').innerHTML = localStorage.getItem("allPosts");

    var updatetimes = document.querySelectorAll('.posttime');
    console.log(updatetimes);
    for (var i = 0; i < updatetimes.length; i++) {

        var posttime = updatetimes[i];
        console.log(posttime);
        var duration = timeSince(posttime.getAttribute('data-posttime'));
        console.log(duration);
        updatetimes[i].innerHTML = duration + " ago by ";
    }


    if (!options.isActivated.checked) {
        ghost(true);
    }

    // Set the display activation and frequency.
    options.isActivated.onchange = function () {
        localStorage.isActivated = options.isActivated.checked;
        localStorage.settingsChanged = true;
        ghost(!options.isActivated.checked);
    };

    options.notifyUpvotes.onchange = function () {
        localStorage.notifyUpvotes = options.notifyUpvotes.checked;
        localStorage.settingsChanged = true;
    };

    options.notifyDownvotes.onchange = function () {
        localStorage.notifyDownvotes = options.notifyDownvotes.checked;
        localStorage.settingsChanged = true;
    };

    options.notifyComments.onchange = function () {
        localStorage.notifyComments = options.notifyComments.checked;
        localStorage.settingsChanged = true;
    };

    options.frequency.onchange = function () {
        localStorage.frequency = options.frequency.value;
        localStorage.settingsChanged = true;

        console.log("Frquency changed: " + localStorage.frequency + " seconds");
    };

    options.username.onkeyup = function () {
        localStorage.username = options.username.value;

        if (localStorage.username.startsWith("@"))
            localStorage.username = localStorage.username.substring(1);

        localStorage.settingsChanged = true;

        document.getElementById("nameChanged").style.visibility = "visible";

        console.log("Username changed: ", localStorage.username);
    };
});
var feed = document.querySelector("#feed");
feed.addEventListener("click", vote, false);

function vote(e) {
    if (e.target !== e.currentTarget) {
        var name = e.target.getAttribute('data-author');
        var perm = e.target.getAttribute('data-permlink');
        var postime = e.target.getAttribute('data-posttime');
        var currenttime = Date.now();
        var minutes = 60*1000;
        var difference = (currenttime/minutes) - (postime/minutes);
        alert(difference);
        var voteAtMinutes = localStorage.getItem("voteAt");

        localStorage.setItem('name',name);
        localStorage.setItem('perm',perm);
        if (difference > voteAtMinutes){

        chrome.extension.getBackgroundPage().voter30(1);
        } else {
            var voteInMinutes = voteAtMinutes - difference;
            var voteInSeconds = voteInMinutes / 60000;
            chrome.extension.getBackgroundPage().voter30(voteInSeconds);
        }
    }
    e.stopPropagation();
}

