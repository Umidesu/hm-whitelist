Config = {}
Config.token = 'Token here'
Config.guild = 'Guild id here'
Config.role = 'Whitelist role id here'

const { Client } = require('discord.js')
const client = new Client({intents:[3276799]})

client.on('ready', () => {

    on('playerConnecting', (name, setKickReason, deferrals) => {
        deferrals.defer()
    
        const player = global.source;
    
        setTimeout(() => {
            deferrals.update(`Hello ${name}. Your discord ID is being checked.`)
    
            let discord_id = null;
    
            for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                const identifier = GetPlayerIdentifier(player, i);
    
                if (identifier.includes('discord:')) {
                    discord_id = identifier;
                    console.log(discord_id);
                }
            }
    
            // pretend to be a wait
            setTimeout(() => {
                if (discord_id === null) {
                    deferrals.done("You are not connected to Discord.")
                } else {
                    deferrals.done()
                }
            }, 0)
        }, 0)
    })
})

client.login(Config.token)