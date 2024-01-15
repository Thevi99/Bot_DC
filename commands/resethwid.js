const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const cooldown = new Set();

  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('resethwid')
      .setDescription('Resethwid 1ครั้ง/2 ชม.'),
    async execute(interaction,con,NameHub,MadeBy,makeid,role,log,buyer,keymanager,keymanagername) {
      if (cooldown.has(interaction.user.id)) {
        const Embed1 = new discord.MessageEmbed()
        .setTitle('<:error:963346324026167327> : Invalid')
        .setColor('#fc4747')	
        .setDescription("**┖ Cooldown.**")
        .setTimestamp()
        .setFooter('Zeta Hub');
        interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
          }else{
              con.query(`SELECT Game,DiscordID FROM datakey Where DiscordID = '${interaction.user.id}'`, function(err, results, fields) {
                if(results.length) {
                  if (results[0].DiscordID == interaction.user.id){
                    con.query(`Update datakey SET HWID = 'Unknow' WHERE DiscordID = '${interaction.user.id}'`, function (err, res) {
                      if (err) throw err;
                          if (res.warningCount === 0) {
                              const Embed1 = new discord.MessageEmbed()
                              .setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
                              .setColor('#5edfff')	
                              .setDescription("Reseted Hardware ID.")
                              .setTimestamp()
                              .setFooter('Zeta Hub');
                            interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                      }
                    })
                    }else{
                      const Embed1 = new discord.MessageEmbed()
                      .setTitle('<:error:963346324026167327> : Invalid')
                      .setColor('#fc4747')	
                      .setDescription("**┖ You not have Whitelist.**")
                      .setTimestamp()
                      .setFooter('Zeta Hub');
                      interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                    }
                  }
              })
            cooldown.add(interaction.user.id);
            setTimeout(()=>{
              cooldown.delete(interaction.user.id)
            },7200 ); //259200000
          }
        
    },
};

  
  
  
  // interaction.followUp({ embeds: [embedsty] ,  ephemeral: true }).then().catch(err => {});