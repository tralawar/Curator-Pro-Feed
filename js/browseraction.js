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


var feedCount = parseInt(localStorage.getItem('feedcount'));


window.addEventListener('load', function () {


        document.getElementById('feed').innerHTML = localStorage.getItem("allPosts");

        var updatetimes = document.querySelectorAll('.posttime');

        for (var i = 0; i < updatetimes.length; i++) {

            var posttime = updatetimes[i];

            var duration = timeSince(posttime.getAttribute('data-posttime'));

            updatetimes[i].innerHTML = duration + " ago by ";

}

    // Set the display activation and frequency.

});
var feed = document.querySelector("#feed");
feed.addEventListener("click", vote, false);
//localStorage.removeItem('votes');
function vote(e) {
    if (e.target !== e.currentTarget) {
        var name = e.target.getAttribute('data-author');
        var perm = e.target.getAttribute('data-permlink');
        var postime = e.target.getAttribute('data-posttime');
        var votenow = e.target.getAttribute('data-votenow');
        var currenttime = Date.now();
        var minutes = 60*1000;
        var difference = (currenttime/minutes) - (postime/minutes);

        var voteAtMinutes = localStorage.getItem("voteAt");
        localStorage.setItem('name',name);
        localStorage.setItem('perm',perm);

        console.log(e.target.src);
        if(e.target.src == "chrome-extension://jfgdbklbldhljbohcephefhhhdkkehmk/icons/30.png"){
            e.target.src = "chrome-extension://jfgdbklbldhljbohcephefhhhdkkehmk/icons/30v.png"
        } else if (e.target.src == "chrome-extension://jfgdbklbldhljbohcephefhhhdkkehmk/icons/vote.png"){
            e.target.src = "chrome-extension://jfgdbklbldhljbohcephefhhhdkkehmk/icons/votev.png"
        } else{
            return;
        }


        if (votenow == ""){

            return;
        }

        if (votenow == "true"){

            chrome.extension.getBackgroundPage().votenow();

            return;

        }

        if (difference > voteAtMinutes){

            chrome.extension.getBackgroundPage().votenow();

        } else if ( votenow == "false" ) {

            var voteInMinutes = voteAtMinutes - difference;
            var voteInSeconds = voteInMinutes * 60000;

            var votesToCast;

            var voteTime = voteInSeconds + currenttime;



            if(localStorage.getItem('votes')== null){

                votesToCast= [];
            } else {
                votesToCast = JSON.parse(localStorage.getItem('votes'));
            }






            var castVote ="" + voteTime +" "+ localStorage.getItem('username')+ " " + localStorage.getItem('name') +" " +localStorage.getItem('perm')+" "+ localStorage.getItem("voteweight");




            votesToCast.push(castVote);

            localStorage.setItem("votes",JSON.stringify(votesToCast));

        }
    }
    e.stopPropagation();
}

