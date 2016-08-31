// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//localStorage.removeItem("authorsHTML");
//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
 Displays a notification with the current time. Requires "notifications"
 permission in the manifest file (or calling
 "Notification.requestPermission" beforehand).
 */
function show() {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.


    Notification.requestPermission(function (status) {
        console.log(status); // notifications will only be displayed if "granted"
        var n = new Notification("title", {body: "notification body"}); // this also shows the notification

    });

}

function showUpvote() {
    var notification = new Notification("+1 Upvote", {
        icon: 'extension_upvote.png',
        body: "" + localStorage.lastUser + " voted on " + getTopicSubstring(localStorage.lastTopic)
    });
    setTimeout(notification.close.bind(notification), 5000);

    notification.onclick = function () {
        window.focus();
        chrome.tabs.create({url: localStorage.lastLink});
        notification.close();
    };
}

function showDownvote() {
    var notification = new Notification("-1 Downvote", {
        icon: 'extension_upvote.png',
        body: "" + localStorage.lastUser + " voted on " + getTopicSubstring(localStorage.lastTopic)
    });
    setTimeout(notification.close.bind(notification), 5000);

    notification.onclick = function () {
        window.focus();
        chrome.tabs.create({url: localStorage.lastLink});
        notification.close();
    };
}

function showComment() {
    var notification = new Notification("+1 Comment", {
        icon: 'extension_message.png',
        body: "" + localStorage.lastUser + " replied to " + getTopicSubstring(localStorage.lastTopic)
    });
    setTimeout(notification.close.bind(notification), 5000);

    notification.onclick = function () {
        window.focus();
        chrome.tabs.create({url: localStorage.lastLink});
        notification.close();
    };
}

function getTopicSubstring(topic) {
    if (topic.length > 62) {
        return topic.substring(0, 62) + "...";
    }
    return topic;
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 30;        // The display frequency, in seconds.
    localStorage.isInitialized = true; // The option initialization.

    localStorage.firstRequestSend = false;
    localStorage.lastTime = 0;
    localStorage.lastTopic = null;
    localStorage.lastUser = null;
    localStorage.lastLink = null;
    localStorage.username = "yourusername";
    localStorage.settingsChanged = false;

    localStorage.notifyUpvotes = true;
    localStorage.notifyDownvotes = true;
    localStorage.notifyComments = true;

    chrome.tabs.create({'url': 'chrome://extensions/?options=' + chrome.runtime.id});

}


function importList() {
    steem.api.getFollowing(localStorage.getItem("username"), 0, 'blog', 100, function (err, result) {

        if (localStorage.getItem("following") == true) {
            localStorage.removeItem("following");
        }
        var importfollowing = [];

        for (ob in result) {
            importfollowing.push(result[ob]['following']);
        }
        localStorage.setItem('following', importfollowing.join(" "));


    });
}









if(authors){

var authors = localStorage.getItem('authors').split(" ");
}else{
    var authors = localStorage.getItem('authors');

}




steem.api.streamOperations(function (err, response) {


    var comment = response[0];
    var author = response[1]['author'];
    var c = response[1];
    var date = Date.now();

    if (localStorage.getItem("allPosts") == null){
        var post = "Starting Feed...";
    } else {
        var post = localStorage.getItem("allPosts");
    }
    if (comment != 'comment') {
        return;
    }
    if (authors.indexOf(author) == -1) {
        return;
    }

    if (response[1]['title'] == "") {
        return;
    }

    if (!('json_metadata' in c)) {
        return;
    }
    var metadata = JSON.parse(c['json_metadata']);
    if ('image' in metadata) {

        post = ("<tr><td rowspan='2'><img class='images' height='64' src='"
        + metadata['image'][0]
        + "'></td><td class='title'><a href='https://www.steemit.com/"
        + response[1]['parent_permlink'] + "/@" + response[1]['author'] + "/" +response[1]['permlink']+"' target='_new'>"
        + response[1]['title']
        + "</a></td></tr><tr><td><span data-posttime='"+ date +"' class='posttime'></span><span class='author'>"
        + author
        + "</span><img data-posttime='"+ date +"' data-author='" + author + "' data-permlink='"+c['permlink']+"' height='19' src='../../icons/vote.png'></td></tr><br>") + post;


    } else {

        post = ("<tr><td rowspan='2'><img height='64' src='../../icons/noimg.png'></td><td class='title'><a href='https://www.steemit.com/"
        + response[1]['parent_permlink'] + "/@" + response[1]['author'] + "/" +response[1]['permlink']+"' target='_new'>"
        + response[1]['title']
        + "</a></td></tr><tr><td><span data-posttime='"+ date +"' class='posttime'></span><span class='author'>"
        + author
        + "</span><img data-posttime='"+ date +"' data-author='" + author + "' data-permlink='"+c['permlink']+"' height='19' src='../../icons/vote.png'></td></tr><br>") + post;
    }
    localStorage.setItem("allPosts", post);


});




function voter30(time){

    setTimeout(function () {
            steemconnect.vote(localStorage.getItem('username'), localStorage.getItem('name'), localStorage.getItem('perm'), localStorage.getItem("voteweight"), function (err, result) {
                console.log(err, result);
            });
        }, time);
}




