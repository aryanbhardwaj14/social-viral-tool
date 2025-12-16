let captions = [];
let hashtagsData = {};

fetch("/data/captions.json")
  .then((res) => res.json())
  .then((data) => (captions = data));

fetch("/data/hashtags.json")
  .then((res) => res.json())
  .then((data) => (hashtagsData = data));

function generateCaptionAndHashtags() {
  const topic = document.getElementById("topicInput").value.toLowerCase();

  if (!topic) {
    alert("Please enter a topic");
    return;
  }

  const caption =
    captions[Math.floor(Math.random() * captions.length)];

  const tags =
    hashtagsData[topic] || hashtagsData["default"];

  document.getElementById("captionOutput").value = caption;
  document.getElementById("hashtagOutput").value = tags.join(" ");
}

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand("copy");
  alert("Copied successfully");
}
