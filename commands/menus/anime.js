const settings = require('../../settings');
const path = require('path');
const fs = require('fs');

const imagePath = path.join(__dirname, '../../assets/bot_image.jpg');

module.exports = async (sock, chatId, message) => {
    const caption = `
╭═✦〔 ✅ *ꜱᴇʟᴇᴄᴛᴇᴅ* ✅ 〕✦═╮
│🛠️ ᴘʀᴇғɪx  : [ ${settings.prefix} ]
│🚀 ᴠᴇʀsɪᴏɴ : *${settings.version}*
╰═══⭘════════════⚬═╯
 
╭═✦〔 🌸 *ᴀɴɪᴍᴇ ᴄᴍᴅꜱ* 〕✦═╮
│
│🔹 .neko
│🔹 .waifu
│🔹 .loli
│🔹 .nom 
│🔹 .poke 
│🔹 .cry 
│🔹 .kiss 
│🔹 .pat 
│🔹 .hug 
│🔹 .wink 
│🔹 .facepalm 
│
╰═✪╾✦═✦═✦═✦═✦╼✪═╯
> ${settings.caption}
`;

    let imageBuffer = null;
    if (fs.existsSync(imagePath)) {
        imageBuffer = fs.readFileSync(imagePath);
    }

    await sock.sendMessage(chatId, {
        ...(imageBuffer ? { image: imageBuffer } : {}),
        caption,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363377534493877@newsletter',
                newsletterName: '𝗤𝗨𝗘𝗘𝗡 𝗗𝗔𝗡𝗜 𝗦𝗨𝗣𝗣𝗢𝗥𝗧',
                serverMessageId: -1
            }
        }
    }, { quoted: message });

    await sock.sendMessage(chatId, {
        react: { text: '📂', key: message.key }
    });
};
