const Discord = require("discord.js")
require("dotenv").config()
const TOKEN = process.env.TOKEN

let client = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    },
    presence: {
        activity: {
            type: "WATCHING",
            name: "you! ;)"
        }
    }
})

client.on("ready", () => {
    console.log("I'm up!")
})
client.on("message", (msg) => {
    console.log("incoming message " + msg.content)
})
client.on("error", (e) => {
    console.log(e)
})

client.on("presenceUpdate", (_old, _new) => {
    if (_new != null && _new.activities != null) {
        if (_new.activities.length > 0) {
            for (let activity of _new.activities) {
                if (activity.type == "PLAYING") {
                    let gameName = activity.name
                    message = _new.user.username + " " + gameName + " khel raha, ajao!"
                    _new.guild.members.cache.forEach(async(m) => {
                        if (!m.user.fetch().bot) {
                            try {
                                let channel = m.user.dmChannel
                                if (channel == null) {
                                    channel = await m.user.createDM()
                                }
                                channel.send(message)
                            } catch (ex) {
                                console.log(ex)
                            }
                        }
                    })
                } else {

                }
            }
        }
    }
})

client.login(TOKEN).catch(e => {
    console.log(e)
})