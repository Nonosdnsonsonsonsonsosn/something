const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const client = new Discord.Client();

client.login("MzUwODc0OTI2ODg4MjU1NDg5.DIKZSg.3_x6kdRd6FDa4RjOr3UL0lOLt4s");
client.on('ready', () => {
    console.log("Online!");
    //Allows it to update when a new guild is joined
    setInterval(function() {
        client.user.setPresence({
            game: {
                name: "m.help | " + client.guilds.size + " servers",
                type: 0
            }
        });
    }, 1200000);
});

client.on('message', async(message) => {
    if (message.author.bot) return; //Ingore bot users. Part of being a good bot
    let content = message.content;
    //This is your prefix  -THANKS!!
    if (content.startsWith("m.")) {
        //remove the prefix  -Wow you are Really good at this.. i suck *SadFaceEmoji*
        content = content.slice(2);
        if (content.startsWith("echo")) {
            content = content.slice("echo".length);
            if (content.length < 1) {
                message.channel.send("**Error:** Emtpy Echo message!");
                return;
            }
            message.channel.send(content);
        } else if (content.startsWith("report")) {
            content = content.slice("report".length);
            if (content.length < 1) {
                message.reply("**Error:** Emtpy Report");
                return;
            }
            client.guilds.get("297182289442504704").channels.get("371193250347876353").send("**Report:** " + content);
        } else if (content.startsWith("server")) {
            message.channel.send("The Minecraft server I live on is ```bpserverz.mcraft.pro:27678```");
        } else if (content.startsWith("usrinfo")) {
            message.channel.send("You do not have permission to do that!");
        } else if (content.startsWith('send')) {
            if (message.author.id === "358858081851015169") {
                let output = "";
                let first = false;
                client.guilds.forEach(guild => {
                    try {
                        guild.defaultChannel.send(message.content.split(" ").slice(1).join(" "));
                    } catch(e) {
                        if(!first) {
                            output += "I could not send to:\n";
                        }
                        output += guild.name + "\n";
                    }
                });
            } else {
                message.channel.send("Unauthorised");
            }
        } else if (content.startsWith("support")) {
            message.channel.send(`**Mini Help Menu**\n` +
                "** **\n" +
                "Use /report to report an issue with our bot!\n" +
                "Use /help for a full list of commands!");
        } else if (content.startsWith("info")) {
            message.channel.send("Version: Release B12.0.1");
		} else if (content.startsWith("ban")) {
			if (message.channel.type === "text") {
				if (message.member.hasPermission("BAN_MEMBERS") === false) {
					message.channel.send("You cannot ban Members!");
					return;
				}
				if (message.guild.me.hasPermission("BAN_MEMBERS") === false) {
					message.channel.send("I cannot ban Members!");
					return;
				}
				if (message.members && message.mention.members.size < 1) { //<--- right here
					message.channel.send("Please mention someone!");
					return;
				}
				let banned = [];
				let notBanned = [];
				for (let member of message.mentions.members.values()) {
					try {
						await member.ban();
						banned.push(member.displayName);
					} catch (e) {
						notBanned.push(member.displayName);
					}
				}
				message.channel.send(`Banned Users: ${banned.join(", ")}\nNot Banned: ${notBanned.join(", ")}`);
			} else {
				message.channel.send("Incorrect channel type!");
			}
        } else if (content.startsWith("kick")) {
			if (message.channel.type === "text") {
				if (message.member.hasPermission("KICK_MEMBERS") === false) {
					message.channel.send("<:uncheck:350754166542565376> You cannot kick Members!");
					return;
				}
				if (message.guild.me.hasPermission("KICK_MEMBERS") === false) {
					message.channel.send("I cannot kick Members! <:error:371182728860663808>");
					return;
				}
				if (message.members && message.mention.members.size < 1) {
					message.channel.send("Please mention someone! <:error:371182728860663808>");
					return;
				}
				let kicked = [];
				let notKicked = [];
				for (let member of message.mentions.members.values()) {
					try {
						await member.kick();
						kicked.push(member.displayName);
					} catch (e) {
						notKicked.push(member.displayName);
					}
				}
				message.channel.send(`Kicked Users: ${kicked.join(", ")}\nNot Kicked: ${notKicked.join(", ")}`);
			} else {
				message.channel.send("Incorrect channel type! <:error:371182728860663808>");
			}
        } else if (content.startsWith("help")) {
            let embed = new Discord.RichEmbed();
            embed.setColor(`#09fffc`)
                .setTimestamp();
            if (message.guild.iconURL !== null) {
                embed.setAuthor(`${message.guild.me.displayName}`, `${message.guild.iconURL}`)
                    .setThumbnail('http://manx7-database.weebly.com/uploads/9/8/9/9/98994168/powerup_1_orig.png');
            }

            embed.addField("Main Commands",  // here. You had .addfield(NAME).addField(NAME) instead of .addField(Name, Content)
                    "`info`          Shows the information for the bot!\n" +
					"`report`           Sends a report to our server!\n" +
                    "`server`   Returns our Minecraft server IP and Port!\n" +
                    "`echo`           Repeats what you said!\n" +
                    "`embed` (OFFLINE) Sends an Embed with the given message!\n" +
                    "`ban`           Bans the pinged user!\n" +
                    "`kick`           Kicks the pinged user!\n" +
					"`support`           Sends a Mini help menu into the server chat!\n")
            embed.addField("Music Commands", //something to help me see better
                    "`play`          Plays a song!\n" +
                    "`stop`          Stops the Playback and wipes the queue!\n" +
                    "`queue`           Shows the servers queue!\n" +
                    "`reset`           Resets the servers queue!\n" +
                    "`pause`           Pauses the Playback, if playing!\n" +
                    "`resume`           Resumes the Playback, if paused!");
            message.author.send({
                embed
            });
        } else {

        }
    }
});

music(client, {
    prefix: 'm.', // Prefix of '-'.
    global: false, // Server-specific queues.
    maxQueueSize: 5, // Maximum queue size of 10.
    clearInvoker: true, // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
    channel: '' // Name of voice channel to join. If omitted, will instead join user's voice channel.
});
