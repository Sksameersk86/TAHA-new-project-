const axios = require("axios");
const crypto = require("crypto");

// ************* CREDIT LOCK SYSTEM *************
const ORIGINAL_CREDITS = "ARIF-BABU";
const ORIGINAL_HASH = crypto.createHash("sha256").update(ORIGINAL_CREDITS).digest("hex");

function checkCredits() {
  const currentHash = crypto.createHash("sha256").update(ORIGINAL_CREDITS).digest("hex");
  if (currentHash !== ORIGINAL_HASH) {
    throw new Error("❌ CREDIT ERROR: Credits change mat karo! File locked by ARIF-BABU.");
  }
}
checkCredits();
// ************************************************

module.exports.config = {
  name: "hourlytime",
  version: "4.1.1",
  hasPermssion: 0,
  credits: ORIGINAL_CREDITS, // Do NOT Change
  description: "Hourly time announcements (Pakistan Time).",
  commandCategory: "Utilities",
  cooldowns: 0,
};

const imgLinks = [
  "https://i.ibb.co/0yQhzNJf/e2f1c794d60e2b4b2df146ae27f883a2.jpg",
  "https://i.ibb.co/zHT9pPC4/2f0d71def8a64ef02392a7d19bd9f001.jpg",
  "https://i.ibb.co/d4k5zRdV/6604f623b17ac609723d13f41d26f183.jpg",
  "https://i.ibb.co/GvRmR5B5/fea75e113b058d3aee6d557310d4d9d2.jpg",
];

let lastHour = null;

async function sendHourly(api) {
  try {
    const now = new Date();
    const pkt = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));

    const hour = pkt.getHours();
    const minute = pkt.getMinutes();

    if (minute !== 0 || lastHour === hour) return;
    lastHour = hour;

    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";

    const days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

    const msg =
`❁ ━━━━━━━[ 𝗧𝗜𝗠𝗘 ]━━━━━━━ ❁

✰ 𝗧𝗜𝗠𝗘 ➪ ${hour12}:00 ${ampm} ⏰
✰ 𝗗𝗔𝗧𝗘 ➪ ${date} ${month} ${year} 📆
✰ 𝗗𝗔𝗬 ➪ ${day} ⏳

❁ ━━━━━ ❃ TAHA BABU ❃ ━━━━━ ❁`;

    const threads = await api.getThreadList(100, null, ["INBOX"]);
    const active = threads.filter(t => t.isSubscribed);

    for (const t of active) {
      const img = imgLinks[Math.floor(Math.random() * imgLinks.length)];
      const stream = (await axios.get(img, { responseType: "stream" })).data;
      api.sendMessage({ body: msg, attachment: stream }, t.threadID);
    }

  } catch (e) {
    console.log("Error:", e);
  }
}

module.exports.handleEvent = () => {};

module.exports.run = async ({ api, event }) => {
  setInterval(() => sendHourly(api), 60000);
  api.sendMessage("✔ Hourly Pakistan Time enabled", event.threadID);
};
