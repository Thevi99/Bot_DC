const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
    .setName('redeem')
    .setDescription('ใส่คีย์ที่ซื้อจากเว็ป')

    .addStringOption((option) => option.setName('key').setDescription('key').setRequired(true)),
    async execute(interaction,con,NameHub,MadeBy,makeid,role,log,buyer,keymanager,keymanagername) {

    let interactionredeem = interaction.options.getString('key');
    con.query(`SELECT RedeemKey,Used,Game,DiscordID FROM datakey WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
		if (res.length>0) {
			if (res[0].Used === "True") {
				const Embed1 = new discord.MessageEmbed()
				.setTitle('<:error:963346324026167327> : Invalid')
				.setColor('#fc4747')	
				.setDescription("┖**This key has already redeemed.**")
				.setTimestamp()
				.setFooter('Deity Hub');
				interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
			} else {
				let GameKey = res[0].Game
				//console.log(res[0]);
				con.query(`SELECT RedeemKey,Used,Game,DiscordID FROM datakey WHERE DiscordID = '${interaction.user.id}'`, function (err, ress) {
					if (ress.length>0) {
						if (ress[0].Game === GameKey) {
							const Embed1 = new discord.MessageEmbed()
							.setTitle('<:error:963346324026167327> : Invalid')
							.setColor('#fc4747')	
							.setDescription("┖**This game has already redeem.**")
							.setTimestamp()
							.setFooter('Deity Hub');
							interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
						} else {
							con.query(`Update datakey SET Used = 'True', DiscordID = '${interaction.user.id}' WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
								if (err) throw err;
                                        if (res.warningCount === 0) {
											interaction.member.roles.add(interaction.guild.roles.cache.find(role => role.id === "1010457656646979594")).then().catch(err => {});
                                            const Embed1 = new discord.MessageEmbed()
											.setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
											.setColor('#5edfff')	
											.setDescription("<:__:963341448714018838> : Thank you very much!\n┖Type `/script` command for get your script.")
											.setTimestamp()
											.setFooter('Deity Hub');
										/////////////////////////////////////////////////////////////////////////
										let channel = interaction.client.channels.cache.get('1010464152634007682');
										const Embed10 = new discord.MessageEmbed()
											.setAuthor(NameHub, 'https://cdn.discordapp.com/attachments/961353029326631063/962771159353544704/unknown.png', '')
											 
											.setColor('#68ff6e')
											.addField('Key', interactionredeem, true)
											.addField('Game', GameKey, true)
											.addField('Redeem By', "<@" + interaction.user.id + ">  (" + interaction.user.id + ")", true)
											//.setDescription("```yaml\n- User : " + interaction.user.id + "\n- Redeem Key : " + interactionredeem + " ```")
											.setTimestamp()
											.setFooter(MadeBy);
										channel.send({ embeds: [Embed10] ,  ephemeral: true })
										/////////////////////////////////////////////////////////////////////////
										// if ( GameKey == "GrandPiece") {
										// 	interaction.member.roles.add(interaction.guild.roles.cache.find(role => role.id === "988799577379438592")).then().catch(err => {});
										// }
                                        interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                                        }
							})
						}
					} else {
						con.query(`Update datakey SET Used = 'True', DiscordID = '${interaction.user.id}' WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
							if (err) throw err;
                                        if (res.warningCount === 0) {
											interaction.member.roles.add(interaction.guild.roles.cache.find(role => role.id === "1010457656646979594")).then().catch(err => {});
                                            const Embed1 = new discord.MessageEmbed()
											.setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
											.setColor('#5edfff')	
											.setDescription("<:__:963341448714018838> : Thank you very much!\n┖Type `/script` command for get your script.")
											.setTimestamp()
											.setFooter('Deity Hub');
											/////////////////////////////////////////////////////////////////////////
										let channel = interaction.client.channels.cache.get('1010464152634007682');
										const Embed10 = new discord.MessageEmbed()
											.setAuthor(NameHub, 'https://cdn.discordapp.com/attachments/961353029326631063/962771159353544704/unknown.png', '')
											 
											.setColor('#68ff6e')
											.addField('Key', interactionredeem, true)
											.addField('Game', GameKey, true)
											.addField('Redeem By', "<@" + interaction.user.id + ">  (" + interaction.user.id + ")", true)
											//.setDescription("```yaml\n- User : " + interaction.user.id + "\n- Redeem Key : " + interactionredeem + " ```")
											.setTimestamp()
											.setFooter(MadeBy);
										channel.send({ embeds: [Embed10] ,  ephemeral: true })
										/////////////////////////////////////////////////////////////////////////
                                        interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                                        }
						})
					}
				})
			}
		} else {
			const Embed1 = new discord.MessageEmbed()
			.setTitle('<:error:963346324026167327> : Invalid')
			.setColor('#fc4747')	
			.setDescription("┖**Key Not Found.**")
			.setTimestamp()
			.setFooter('Deity Hub');
			interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
		}
		/*
        if (res.length > 0) {
            con.query(`SELECT DiscordID,Game,RedeemKey,Used , Blacklist FROM datakey WHERE DiscordID = '${interaction.user.id}'`, function (err, res) {
                if (err) throw err;
                let fuckdead = 0
                let realdead = ""
                res.forEach(abc => {
                    fuckdead = fuckdead + 1
                    realdead = abc.Blacklist
                })
                if (res.length > 0) {
					console.log(res[0]);
                    if (res[0].Blacklist === "False") {
                        const Embed1 = new discord.MessageEmbed()
							.setTitle('<:error:963346324026167327> : Invalid')
							.setColor('#fc4747')	
							.setDescription("**┖ You are already whitelisted.**")
							.setTimestamp()
							.setFooter('Deity Hub');
							interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                    } else if (realdead === "True") {
                        con.query(`SELECT RedeemKey , DiscordID, Used FROM datakey WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
                            if (res.length > 0) {
                                if (res[0].Used === "False") {
                                    con.query(`Update datakey SET Used = 'True', DiscordID = '${interaction.user.id}',Used = 'True' WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
                                        if (err) throw err;
                                        if (res.warningCount === 0) {
                                            const Embed1 = new discord.MessageEmbed()
											.setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
											.setColor('#5edfff')	
											.setDescription("<:__:963341448714018838> : Thank you very much!\n┖Type `/script` command for get your script.")
											.setTimestamp()
											.setFooter('Deity Hub');
											/////////////////////////////////////////////////////////////////////////
										let channel = interaction.client.channels.cache.get('963134392975384656');
										const Embed10 = new discord.MessageEmbed()
											.setAuthor(NameHub, 'https://cdn.discordapp.com/attachments/961353029326631063/962771159353544704/unknown.png', '')
											 
											.setColor('#68ff6e')
											.addField('Key', interactionredeem, true)
											.addField('Game', interactionredeem, true)
											.addField('Redeem By', "<@" + interaction.user.id + ">  (" + interaction.user.id + ")", true)
											//.setDescription("```yaml\n- User : " + interaction.user.id + "\n- Redeem Key : " + interactionredeem + " ```")
											.setTimestamp()
											.setFooter(MadeBy);
										channel.send({ embeds: [Embed10] ,  ephemeral: true })
										/////////////////////////////////////////////////////////////////////////
                                        interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                                        }
                                    })
                                } else {
                                    const Embed1 = new discord.MessageEmbed()
									.setTitle('<:error:963346324026167327> : Invalid')
									.setColor('#fc4747')	
									.setDescription("┖**This key has already redeemed.**")
									.setTimestamp()
									.setFooter('Deity Hub');
									interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                                }
                            } else {
								const Embed1 = new discord.MessageEmbed()
								.setTitle('<:error:963346324026167327> : Invalid')
								.setColor('#fc4747')	
								.setDescription("┖**Key Not Found.**")
								.setTimestamp()
								.setFooter('Deity Hub');
								interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
							}
                        })
                    } else {
						
                    }
                } else {
                    con.query(`SELECT RedeemKey , DiscordID, Used FROM datakey WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
                        if (res.length > 0) {
                            if (res[0].Used === "False") {
                                con.query(`Update datakey SET Used = 'True', DiscordID = '${interaction.user.id}' WHERE RedeemKey = '${interactionredeem}'`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res)
                                    if (res.warningCount === 0) {
                                        const Embed1 = new discord.MessageEmbed()
										.setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
										.setColor('#5edfff')	
										.setDescription("<:__:963341448714018838> : Thank you very much!\n┖Type `/script` command for get your script.")
										.setTimestamp()
										.setFooter('Deity Hub');
										/////////////////////////////////////////////////////////////////////////
										let channel = interaction.client.channels.cache.get('963134392975384656');
										const Embed10 = new discord.MessageEmbed()
											.setAuthor(NameHub, '')
											 
											.setColor('#68ff6e')
											.addField('Key', interactionredeem, true)
											.addField('Game', interactionredeem, true)
											.addField('Redeem By', "<@" + interaction.user.id + ">  (" + interaction.user.id + ")", true)
											//.setDescription("```yaml\n- User : " + interaction.user.id + "\n- Redeem Key : " + interactionredeem + " ```")
											.setTimestamp()
											.setFooter(MadeBy);
										channel.send({ embeds: [Embed10] ,  ephemeral: true })
										/////////////////////////////////////////////////////////////////////////
                                        interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                                        try {
                                            const role = interactiongen.guild.roles.cache.find(role => role.id === buyer)
                                            if (role) { interactiongen.user.roles.add(role) }
                                        } catch {

                                        }
                                    }
                                })
                            } else {
								const Embed1 = new discord.MessageEmbed()
									.setTitle('<:error:963346324026167327> : Invalid')
									.setColor('#fc4747')	
									.setDescription("┖**This key has already redeemed.**")
									.setTimestamp()
									.setFooter('Deity Hub');
									interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                            }
                        } else {
                            const Embed1 = new discord.MessageEmbed()
							.setTitle('<:error:963346324026167327> : Invalid')
							.setColor('#fc4747')	
							.setDescription("┖**Key Not Found.**")
							.setTimestamp()
							.setFooter('Deity Hub');
							interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
                        }
                    })
                }
            })
        } else {
			const Embed1 = new discord.MessageEmbed()
			.setTitle('<:error:963346324026167327> : Invalid')
			.setColor('#fc4747')	
			.setDescription("┖**Key Not Found.**")
			.setTimestamp()
			.setFooter('Deity Hub');
			interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
		}
		
	*/
    })
	
    

    }
}



  
  
  // interaction.followUp({ embeds: [embedsty] ,  ephemeral: true }).then().catch(err => {});