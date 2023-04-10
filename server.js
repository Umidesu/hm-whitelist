Config = {}
Config.token = 'Token here'
Config.guild = 'Guild id here'
Config.role = 'Whitelist role id here'

const { Client } = require('discord.js')
const client = new Client({intents:[3276799]})

clğient.on('ready', () => {
    
})

client.login(Config.token)