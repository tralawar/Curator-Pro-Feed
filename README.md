# Curator-Pro-Feed

<h1>Installation</h1><hr>
<ul>
<li>Download the the .zip</li>
<li>Extract all files to your disired directory</li>
<li>In Chrome click the dropdown More Tools > Extensions</li>
<li>Check Developer mode</li>
<li>The click "Load unpacked extension..."</li>
<li>Select the top level directory containing the "manifest.json"</li>
</ul>


<img src="http://i.imgur.com/xd23NsP.jpg">
<div>
<h1>Make the votes change to blue</h1><hr>
<ul>
<li>Once it is loaded you will see the extend and the id. (see picture below)</li>
<li>Select and copy the id. </li>
<li>Open Curator-Pro-Feed-master\js\browseraction.js</li>
<li>On line 93 - 96 replace the all 4 instances of "abjnadnojmilaccpdofgabajmnmkkclm"

with your id.
 <br>
  chrome-extension://abjnadnojmilaccpdofgabajmnmkkclm/icons/30.png
  </li>
<li>Save the file and enjoy.</li>
</ul>
</div>


<img src="http://i.imgur.com/vJuMHQ4.jpg">

```
if(e.target.src == "chrome-extension://abjnadnojmilaccpdofgabajmnmkkclm/icons/30.png"){
e.target.src = "chrome-extension://abjnadnojmilaccpdofgabajmnmkkclm/icons/30v.png"
} else if (e.target.src == "chrome-extension://abjnadnojmilaccpdofgabajmnmkkclm/icons/vote.png"){
e.target.src = "chrome-extension://abjnadnojmilaccpdofgabajmnmkkclm/icons/votev.png"
```
  
<h2>The blue vote status turns back to white once you close feed window! Vote will still go through as long as the browser is opn.</h2>
