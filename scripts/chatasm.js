let apiKey = "";

document.getElementById("apiKey").addEventListener("input", (event) => {
  apiKey = event.target.value; // Store API key only in memory
});


async function sendMessage() {
  if (!apiKey) {
    alert("Please enter your API key!");
    return;
  }
  const re_pat = /([^^])(\S)(\d)([^$])/g;
  const api = apiKey.replace(re_pat, "$1$3$2$4");
  const message = document.getElementById("userMessage").value;
  if (!message) {
    alert("Please enter a message!");
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Respond to the following in assamese: " + message }]
      })
    });

    const data = await response.json();
    document.getElementById("response").innerText = data.choices
      ? data.choices[0].message.content
      : "Error!";
  } catch (error) {
    document.getElementById("response").innerText = "API request failed.";
  }
}

// Erase API key from memory when the session closes
window.addEventListener("beforeunload", () => {
  apiKey = ""; // Clear API key when the user leaves the page
});