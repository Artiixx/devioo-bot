const { MessageEmbed } = require("discord.js");
const prodGuild = require('../../config.json').guilds.prodGuildID
const logChannel = require('../../config.json').channels.logsID

module.exports = {
    name: 'guildScheduledEventCreate',
    once: false,
    async execute(client, event) {
        if (event.guild.id !== prodGuild) return;

        client.guilds.cache.get(event.guild.id).channels.cache.get(logChannel).send({
            embeds: [
                new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Un événement a été créé')
                    .addFields(
                        { name: '🎈 Nom', value: event.name, inline: true },
                        { name: '🏷️ ID', value: `\`${event.id}\``, inline: true },
                        { name: '🔗 Lien', value: `[Event](${event.url})`, inline: true },
                        { name: '📖 Description', value: event.description },
                        { name: '👤 Créateur', value: `<@${event.creatorId}>`, inline: true },
                        { name: '🚗 Création', value: `<t:${parseInt(event.createdTimestamp / 1000)}:f>`, inline: true },
                    )
                    .setTimestamp()
                    .setThumbnail(event.guild.iconURL({ dynamic: true }))
                    .setFooter({
                        text: `ID: ${event.id}`,
                        iconURL: event.guild.iconURL({ dynamic: true })
                    })
            ]
        })
    }
}
