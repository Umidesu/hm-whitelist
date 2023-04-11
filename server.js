Config = {}
Config.token = 'Token Here'
Config.guild = 'Server Id Here'
Config.role = 'Role Id Here'

const { Client } = require('discord.js')
const client = new Client({intents:[3276799]})

var ready = false

client.on('ready', () => {
    ready = true
    console.log('Whitelist bot is active!')
})

on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()
    if(!ready) return deferrals.done("Server Is Starting Up!")

    const player = global.source;

    setTimeout(() => {
        deferrals.update(`Hello ${name}. Your discord ID is being checked.`)

        let discord_id = null

        for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
            const identifier = GetPlayerIdentifier(player, i);

            if (identifier.includes('discord:')) {
                discord_id = identifier.slice(8)
            }
        }

        // pretend to be a wait
        setTimeout(() => {
            var guild = client.guilds.cache.get(Config.guild)
            var member = guild.members.cache.get(discord_id)
            if (!member.roles.cache.has(Config.role)) {
                deferrals.done("You don't have a Whitelist.")
            } else {
                deferrals.done()
            }
        }, 0)
    }, 0)
})

client.login(Config.token)