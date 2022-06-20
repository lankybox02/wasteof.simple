/* Import dependencies */
import express from 'express';
import { Wasteof2, Wasteof2Auth} from 'wasteof-client';

/* Define express app */
const app = express();

/* Get wasteof data */
let wa2 = new Wasteof2;
let feed;

function refreshFeed() {
wa2.getFeedOfUser("ratio") // ratio is following the most people
	.then(data => {
    feed = ""; // clear feed to avoid duplication
    /* Loop through every post */
    for (let i = 0; i < data.posts.length; i++) {
      let highlight = data.posts[i].poster.name; // username highlight
      if (data.posts[i].poster.name == "jokebot") continue; // skip jokebot
      if (data.posts[i].poster.name == "jeffalo" || data.posts[i].poster.name == "wasteof.money" || data.posts[i].poster.name == "beta" || data.posts[i].poster.name == "lankybox01") highlight = `<i style="color: lightgreen">${highlight}</i>`;
      feed = feed + "<div class=\"post\"><b>" + highlight + "</b> said:<br>" + data.posts[i].content + "</div>"
    }
  });
}

/* Navigation bar */
let nav = `<div class="nav">
  <b>[W&nbsp;&nbsp;]</b>
</div>`;

/* Homepage */
app.get('/', (req, res) => {
	refreshFeed() // refresh the feed when loaded
	res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Home - wasteof.simple</title>
<style>
body {
	font-family: Helvetica;
	background-color: lightgrey;
	margin-top: 50px;
	font-size: 20px;
}

.nav {
	background: rgb(59,59,59);
	background: -moz-linear-gradient(180deg, rgba(59,59,59,1) 0%, rgba(98,98,98,1) 100%);
	background: -webkit-linear-gradient(180deg, rgba(59,59,59,1) 0%, rgba(98,98,98,1) 100%);
	background: linear-gradient(180deg, rgba(59,59,59,1) 0%, rgba(98,98,98,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3b3b3b",endColorstr="#626262",GradientType=1);
	background-color: grey;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding: 10px;
	color: white;
	letter-spacing: 2px;
}

.post {
	background-color: grey;
	color: white;
	padding: 5px;
	margin-bottom: 30px;
	word-break: break-all;
	overflow: scroll;
	border-radius: 5px;
}
</style>
</head>
<body>
${nav}
<h1>Feed</h1>
${feed}
</body>
</html>
`);
});

/* Open server */
app.listen(3000, () => {
  console.log('server started');
});