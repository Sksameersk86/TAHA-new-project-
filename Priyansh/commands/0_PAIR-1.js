module.exports.config = {
  name: "pair",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "pairing",
  commandCategory: "Love", 
  usages: "pair", 
  cooldowns: 10
};
module.exports.run = async function({ api, event,Threads, Users }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];

        var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
        var tle = Math.floor(Math.random() * 101);
        var namee = (await Users.getData(event.senderID)).name
        const botID = api.getCurrentUserID();
        const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
        var id = listUserID[Math.floor(Math.random() * listUserID.length)];
        var name = (await Users.getData(id)).name
        var arraytag = [];
        const gifCute = ["https://i.ibb.co/0Rw4BTTP/Messenger-creation-1-C7-BD1-AA-3-CFC-4-FF4-8582-82-FE1052591-D.gif","https://i.ibb.co/2016p7X1/Messenger-creation-42-FE17-AC-F16-F-4-DFD-A4-F7-83-CE974936-A3.gif","https://i.ibb.co/Rpd1YWsP/Messenger-creation-A3-FBA4-E1-5589-47-FB-845-B-7-EDC8-DFD23-D1.gif","https://i.ibb.co/GQWVrDkc/Messenger-creation-6-F5-D2524-4-A2-E-4823-8-E9-B-EC46979-A7-FBB.gif","https://i.ibb.co/yFWqJ0Kj/Messenger-creation-498-C3-F99-B27-C-4-D5-D-B656-33-B4-B0-E7-D901.gif","https://i.ibb.co/DPXGtCw8/Messenger-creation-30-BBF4-B3-F16-A-4972-B8-B0-12919-C882-E45.gif"];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});


        let Avatar = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );

        let gifLove = (await axios.get(gifCute[Math.floor(Math.random() * gifCute.length)], { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8") );

        let Avatar2 = (await axios.get( `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );

        var imglove = [];

              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

        var msg = {body: `ℓσg 😑 нυмѕє 😒 נαℓтє нαιη 😏  נαℓтє нαιη 😒 ιѕ вαт ρє 🤐 q__ιтηє 😵 zα∂α кнυвѕυяαт 😍 ℓαgтє нαιη 😣 нυм ѕαтн мє..👩‍❤️‍👨 נσ внι 🥺 ιѕнq мє ❤️ нσтι нαι..🩷 нσтι нαι..🤍 ∂ιωαηι ѕι 🤞🥀 кнυѕнι ηαнι 👏😔! ∂єкнι נαтι 😒 мσнαввαт кι ує 😇 zαмαησ ѕє 👏🤞\n\n◈━━━━━━━━━━━━━━━━💚✨\n\n𝐃𝐞𝐤𝐡𝐨 𝐭𝐮𝐦𝐡𝐫𝐚 𝐣𝐢𝐯𝐚𝐧 𝐬𝐚𝐭𝐡𝐢 𝐦𝐢𝐥 𝐠𝐚𝐲𝐚 𝐡𝐚𝐢 🙂🖐️
𝐀𝐛 𝐦𝐮𝐣𝐡𝐬𝐞 𝐛𝐚𝐫 𝐛𝐚𝐫 𝐬𝐢𝐭𝐭𝐢𝐧𝐠 𝐤𝐚𝐫𝐰𝐚𝐧𝐞 𝐤𝐞 𝐥𝐢𝐲𝐞 𝐦𝐚𝐭 𝐊𝐚𝐡𝐨 👈😒\n◈━━━━━━━━━━━━━━━━💚✨ ${namee} 💓 ${name}\n◈━━━━━━━━━━━━━━━━💚✨\n➥𝗟𝗼𝘃𝗲 𝗥𝗮𝘁𝗶𝗼: ${tle}%\n◈━━━━━━━━━━━━━━━━💚✨\n\n➺ 𓆩『 ⸙   ᴅᴇᴡᴀɴɪ ᴛᴇʀɪ.𝐱͜͡ᴆ  』𓆪\n\n◈━━━━━━━━━━━━━━━━💚✨\n\n「 -𝑴𝑨𝑫𝑬 𝑩𝒀\n\n◈━━━━━━━━━━━━━━━━💚✨\n\𝐓𝐀𝐇𝐀 𝑲𝑯𝑨𝑵  ◈ ──── 💚✨- 」`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
                             }
