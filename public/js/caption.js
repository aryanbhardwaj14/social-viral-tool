let captionsData = {};
let hashtagsData = {};

document.addEventListener("DOMContentLoaded", () => {

  Promise.all([
    fetch("data/captions.json").then(r => {
      if (!r.ok) throw new Error("Captions JSON not found");
      return r.json();
    }),
    fetch("data/hashtags.json").then(r => {
      if (!r.ok) throw new Error("Hashtags JSON not found");
      return r.json();
    })
  ])
  .then(([c, h]) => {
    captionsData = c;
    hashtagsData = h;
    console.log("JSON loaded successfully");
  })
  .catch(err => {
    console.error(err);
    alert("Data load failed");
  });

  document.getElementById("generateBtn").addEventListener("click", () => {
    const topic = document
      .getElementById("topicInput")
      .value.trim()
      .toLowerCase();

    if (!topic) {
      alert("Enter a topic");
      return;
    }

    // CAPTION
    if (captionsData[topic]) {
      const list = captionsData[topic];
      document.getElementById("captionOutput").value =
        list[Math.floor(Math.random() * list.length)];
    } else {
      document.getElementById("captionOutput").value =
        "Fresh vibes, real energy ✨";
    }

    // HASHTAGS
    if (hashtagsData[topic]) {
      document.getElementById("hashtagOutput").value =
        hashtagsData[topic].join(" ");
    } else {
      document.getElementById("hashtagOutput").value =
        "#viral #reels #instagram";
    }
  });

});

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand("copy");
}
