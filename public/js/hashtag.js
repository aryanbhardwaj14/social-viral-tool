let hashtagsData = {};

fetch('/data/hashtags.json')
  .then(res => res.json())
  .then(data => hashtagsData = data);

function generateHashtags() {
  const topic = document.getElementById("topicInput").value.trim().toLowerCase();

  if (!hashtagsData[topic]) {
    document.getElementById("hashtagOutput").value =
      "#viral #reels #instagram";
    return;
  }

  document.getElementById("hashtagOutput").value =
    hashtagsData[topic].join(" ");
}
