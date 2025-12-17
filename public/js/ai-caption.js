document.getElementById("aiGenerateBtn").addEventListener("click", async () => {
  const input = document.getElementById("aiInput").value.trim();
  const output = document.getElementById("aiOutput");

  if (!input) {
    alert("Please describe your reel or post");
    return;
  }

  output.value = "Generating AI captions...";

  try {
    const res = await fetch("/api/ai-caption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();
    output.value = data.captions.join("\n\n");
  } catch (err) {
    output.value = "AI service unavailable. Please try again later.";
  }
});

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand("copy");
}
