let hashtagsData = {};

fetch('/data/hashtags.json')
  .then(r => r.json())
  .then(d => hashtagsData = d);

document.getElementById("hashtagBtn").addEventListener("click", () => {
  const topic = document.getElementById("topicInput").value.trim().toLowerCase();

  if (hashtagsData[topic]) {
    document.getElementById("hashtagOutput").value =
      hashtagsData[topic].join(" ");
  } else {
    document.getElementById("hashtagOutput").value =
      "#viral #reels #instagram";
  }
});

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand("copy");
}
