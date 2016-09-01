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



    // Set the display activation and frequency.

});
var feed = document.querySelector("#feed");
feed.addEventListener("click", vote, false);

function vote(e) {
    if (e.target !== e.currentTarget) {
        var name = e.target.getAttribute('data-author');
        var perm = e.target.getAttribute('data-permlink');
        var postime = e.target.getAttribute('data-posttime');
        var votenow = e.target.getAttribute('data-votenow');
        var currenttime = Date.now();
        var minutes = 60*1000;
        var difference = (currenttime/minutes) - (postime/minutes);
        console.log(votenow);
        var voteAtMinutes = localStorage.getItem("voteAt");
        localStorage.setItem('name',name);
        localStorage.setItem('perm',perm);
        if (votenow == true){
            chrome.extension.getBackgroundPage().voter30(1);
            alert("votenow");
            return;

        }

        if (difference > voteAtMinutes){
            alert("votenow");

        chrome.extension.getBackgroundPage().voter30(1);
        } else {

            var voteInMinutes = voteAtMinutes - difference;
            var voteInSeconds = voteInMinutes / 60000;
            alert("vote in " + Math.round(voteInMinutes) + " minutes");
            console.log(voteInSeconds);
            chrome.extension.getBackgroundPage().voter30(voteInSeconds);
        }
    }
    e.stopPropagation();
}

