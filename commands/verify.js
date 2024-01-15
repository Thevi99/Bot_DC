const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('สำหรับยืนยันตัวตน'),
    async execute(interaction,con,NameHub,MadeBy,makeid,role,log,buyer,keymanager,keymanagername) {
        let interactionGame = interaction.options.getString('game');
        let interactiongen = interaction.options.getString('amount');
        if (interaction.member.roles.cache.find(r => r.id === '959180272455266344')) {
            const Embed1 = new discord.MessageEmbed()
            .setTitle('<:error:963346324026167327> : Invalid')
            .setColor('#fc4747')	
            .setDescription("**You has already verify.**")
            .setTimestamp()
            .setFooter('Deity Hub');
            interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
        } else {
            interaction.member.roles.add(interaction.guild.roles.cache.find(role => role.id === "959180272455266344")).then().catch(err => {});
            const Embed1 = new discord.MessageEmbed()
            .setTitle('<a:Verify:963501745600856094> : Successfully!!')
            .setColor('#94ff58')	
            .setDescription("**Verified.**")
            .setTimestamp()
            .setFooter('Deity Hub');
            interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
        }
    }
}

// interaction.followUp({ embeds: [embedsty] ,  ephemeral: true }).then().catch(err => {});