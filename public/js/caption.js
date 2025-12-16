let captionsData = {};
let hashtagsData = {};

// load JSON once
Promise.all([
  fetch('/data/captions.json').then(res => res.json()),
  fetch('/data/hashtags.json').then(res => res.json())
]).then(([captions, hashtags]) => {
  captionsData = captions;
  hashtagsData = hashtags;
}).catch(err => {
  alert("Failed to load data files");
  console.error(err);
});

function generateCaptionAndHashtags() {
  const topic = document.getElementById("topicInput").value.trim().toLowerCase();

  if (!topic) {
    alert("Please enter a topic");
    return;
  }

  // CAPTION
  if (!captionsData[topic]) {
    document.getElementById("captionOutput").value =
      "No caption found for this topic yet.";
  } else {
    const list = captionsData[topic];
    const randomCaption = list[Math.floor(Math.random() * list.length)];
    document.getElementById("captionOutput").value = randomCaption;
  }

  // HASHTAGS
  if (!hashtagsData[topic]) {
    document.getElementById("hashtagOutput").value =
      "#trending #viral #reels";
  } else {
    document.getElementById("hashtagOutput").value =
      hashtagsData[topic].join(" ");
  }
}

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand("copy");
}
