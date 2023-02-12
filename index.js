import { Client, GatewayIntentBits } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
  ],
  allowedMentions: {
    repliedUser: false, 
  },
});

const gptClient = new ChatGPT({
  apiKey: "API_KEY",
  orgKey: "ORG_KEY",
});


client.on("ready", () => {
  console.log(`Loaded And Online\n${client.user.username} is Online`);
});


client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  let ChannelID = "CHANNEL_ID";
  let channel = message.guild.channels.cache.get(ChannelID);
  if (!channel) return;

  if (message.channel.id === channel.id) {
    let msg = await message.reply({
      content: `Loading Wait..`,
    });
    let reply = await gptClient.chat(message.content, message.author.username); 
    msg.edit({
      content: `${reply}`,
    });
  }
});


client.login("");
