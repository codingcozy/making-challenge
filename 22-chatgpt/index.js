const chatInput = document.getElementById("chat_input");
const btnSend = document.getElementById("btn_send");
const content = document.getElementById("content");

let chatCnt = 0;

btnSend.addEventListener("click", () => {
  // send Chat;
  sendChat();
});

chatInput.addEventListener("input", (e) => {
  const msg = e.target.value;

  if (msg !== "") {
    btnSend.removeAttribute("disabled");
  } else {
    btnSend.setAttribute("disabled", "true");
  }
});

chatInput.addEventListener("keydown", (e) => {
  if (e.target.value !== "" && e.key === "Enter") {
    // send Chat
    sendChat();
  }
});

const userMessage = (message) => `
<div class="message">
          <div class="profile">
            <img src="./assets/user.png" alt="" width="50" height="50" />
          </div>
          <div class="textarea">
            <p class="text">${message}</p>
            <div class="meta">
              <button class="btn" type="button">
                <svg stroke="#A0A0B1" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span class="blind">edit</span>
              </button>
            </div>
          </div>
        </div>`;

const botMessage = (message, id) =>
  `<div class="message -bot">
				<div class="profile">
					<img src="./assets/bot.png" alt="" width="50" height="50" />
				</div>
				<div class="textarea">
					<p class="text" id="reply-${id}">${message}</p>
					<div class="meta">
						<button class="btn" type="button">
							<svg stroke="#A0A0B1" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
								<rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
							</svg>
							<span class="blind">copy</span>
						</button>
						<button class="btn" type="button">
							<svg stroke="#A0A0B1" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
							</svg>
							<span class="blind">like</span>
						</button>
						<button class="btn" type="button">
							<svg stroke="#A0A0B1" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
							</svg>
							<span class="blind">dislike</span>
						</button>
					</div>
				</div>
			</div>`;

function addMessage(type, message, id) {
  if (type === "user") {
    content.innerHTML += userMessage(message);
  } else if (type === "bot") {
    content.innerHTML += botMessage(message, id);
  }
}

// sample bot message
const helloMsg = "Hello! How can I assist you today?";
const cozycodingMsg = `As of my last knowledge update in September 2021, I don't have specific information about "cozycoding" as it may be a term or entity that emerged after my training data. If "cozycoding" is a programming-related term, framework, or community that has gained prominence after my last update, I won't have details about it.

If you provide more context or specific questions about "cozycoding," I'll do my best to assist you based on the information available up to my last update.`;

function sendChat() {
  // add Message
  addMessage("user", chatInput.value);

  const userMsg = chatInput.value;

  setTimeout(() => {
    let botMsg = helloMsg;
    if (String(userMsg).includes("cozycoding")) botMsg = cozycodingMsg;
    addMessage("bot", "", chatCnt);

    new TypeIt(`#reply-${chatCnt}`, {
      strings: [botMsg],
      speed: 15,
    }).go();
  }, 2000);

  // real api
  // fetch("https://api.openai.com/v1/chat/completions", {
  //   method: "POST",
  //   headers: {
  //     Authorization: ` `,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: "hello" }],
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(JSON.stringify(data, null, 2)));

  chatInput.value = "";
  btnSend.setAttribute("disabled", "true");
  chatCnt++;
}
