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
    if(!ready) return deferrals.done("Sunucu Başlatılıyor!")

    const player = global.source;

    setTimeout(() => {
        deferrals.update(`Merhaba ${name}. Discord id kontrol ediliyor!.`)

        let discord_id = null

        for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
            const identifier = GetPlayerIdentifier(player, i);

            if (identifier.includes('discord:')) {
                discord_id = identifier.slice(8)
            }
        }

        if(!discord_id) {
            deferrals.done("Fivem'e bağlı bir discord hesabı bulunamadı!")
        }

        // pretend to be a wait
        setTimeout(() => {
            var guild = client.guilds.cache.get(Config.guild)
            var member = guild.members.cache.get(discord_id)

            if (!member) {
                deferrals.done("Sunucu discord'unda bulunmuyorsunuz! Katılmak için: discord.gg/redroleplay")
            } else {
                if (!member.roles.cache.has(Config.role)) {
                    deferrals.done("Whitelist rolüne sahip değilsiniz!.")
                } else {
                    deferrals.done()
                }
            }
        }, 0)
    }, 0)
})

client.login(Config.token)