let SCRIPT = "https://deityhub.net/Loadder.lua";
let GPOSCRIPT = "https://deityhub.net/L0adder.lua";

const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
let game = [
    {
        name: 'Blox Fruit',
        description: "Scripts for Blox Fruit",
        value: 'BloxFruit',
    },
    {
        name: 'King Legacy',
        description: "Scripts for King Legacy",
        value: 'KingLegacy',
    },
    {
        name: 'A 0ne Piece Game',
        description: "Scripts for A 0ne Piece Game",
        value: 'A0nePieceG',
    },
    {
        name: 'Stand Up Right',
        description: "Scripts for Stand Up Right",
        value: 'StandUPR',
    },
    {
        name: 'Anime Dimension',
        description: "Scripts for Anime Dimension",
        value: 'ADM',
    },
    {
        name: 'Shindo Life',
        description: "Scripts for Shindo Life",
        value: 'ShindoLife',
    },
    {
        name: 'Grand Piece',
        description: "Scripts for Grand Piece",
        value: 'GrandPiece',
    },
    {
        name: 'Project Slayer',
        description: "Scripts for Project Slayer",
        value: 'PS',
    },
];

module.exports = {
  data: new SlashCommandBuilder()
      .setName('script')
      .setDescription('get script')
      .addStringOption((option) => {
          option.setName('game').setDescription('just a choice of game').setRequired(true);
          for (var x of game) {
              option.addChoice(x.name, x.value);
          }
          return option;
      }),
  async execute(interaction,con,NameHub,MadeBy,makeid,role,log,buyer,keymanager,keymanagername) {
      let interactionGame = interaction.options.getString('game');
      //if (interactionGame == 'BF') {
          con.query(`SELECT DiscordID,Game FROM datakey WHERE DiscordID = '${interaction.user.id}'`, function(err, results, fields) {
              if (results.length > 0) {
				let Game = results[0].Game
				con.query(`SELECT Game,RedeemKey,DiscordID FROM datakey WHERE Game = '${interactionGame}' AND DiscordID = '${interaction.user.id}'`, function(err, results, fields) {
					if (results.length > 0) {
						
						let key = results[0].RedeemKey
						
						/////////////////////////////////////////////////////////////////////////
						let channel = interaction.client.channels.cache.get('988376326614417420');
						const Embed10 = new discord.MessageEmbed()
						.setTitle('₊˚. ༘ ❝ Get Script˚✧ ')
						.setColor('#5edfff')	
						.setDescription("User : <@"+interaction.user.id+"> ("+interaction.user.id+") \n Game : " + interactionGame)
						.setTimestamp()
						.setFooter('Deity Hub');
						channel.send({ embeds: [Embed10] ,  ephemeral: true })
						/////////////////////////////////////////////////////////////////////////
						if (interactionGame == "GrandPiece") {
							const Embed1 = new discord.MessageEmbed()
							.setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
							.setColor('#5edfff')	
							.setDescription(".\n<:gameicon2:963341437582315530> | 𝗚𝗮𝗺𝗲\n> " + interactionGame + "\n\n<:__:963341448714018838> | 𝐈𝐧𝐟𝐨𝐦𝐚𝐭𝐢𝐨𝐧\n> Support : Synapse X, KRNL\n> ┖ If you find an error, you can contact support.\n\n```lua\n_G.Key = '" + key + "'\nif syn then request = syn.request end\nloadstring(request({['Url']='" + GPOSCRIPT +"',['Method']='GET'}).Body)()\n``` ")
							.setTimestamp()
							.setFooter('Deity Hub');
							interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});

						} else {
							const Embed1 = new discord.MessageEmbed()
							.setTitle('₊˚. ༘ ❝ Successfully˚✧ ')
							.setColor('#5edfff')	
							.setDescription(".\n<:gameicon2:963341437582315530> | 𝗚𝗮𝗺𝗲\n> " + interactionGame + "\n\n<:__:963341448714018838> | 𝐈𝐧𝐟𝐨𝐦𝐚𝐭𝐢𝐨𝐧\n> Support : Synapse X, KRNL\n> ┖ If you find an error, you can contact support.\n\n```lua\n_G.Key = '" + key + "'\nif syn then request = syn.request end\nloadstring(request({['Url']='" + SCRIPT +"',['Method']='GET'}).Body)()\n``` ")
							.setTimestamp()
							.setFooter('Deity Hub');
							interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
						}
					
					} else {
						const Embed1 = new discord.MessageEmbed()
						.setTitle('<:error:963346324026167327> : Invalid')
						.setColor('#fc4747')	
						.setDescription("**┖ Whitelist not found.**")
						.setTimestamp()
						.setFooter('Deity Hub');
						interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
					}
				})
			  } else {
					const Embed1 = new discord.MessageEmbed()
					.setTitle('<:error:963346324026167327> : Invalid')
					.setColor('#fc4747')	
					.setDescription("**┖ Whitelist not found.**")
					.setTimestamp()
					.setFooter('Deity Hub');
					interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
			  }
			  
			  /*
			  if (!results.length) {
                    interaction.followUp("no whitelist");
              } else {
                  con.query(`SELECT DiscordID,Game,Blacklist FROM datakey WHERE DiscordID = '${interaction.user.id}', Game = 'BF'`, function(err, results, fields) {
                      if (results[0].Blacklist === "True") {
                            interaction.followUp("Blacklist");
                      } else {
                          con.query(`SELECT Key1,Key2,Key3,DiscordID,Game FROM datakey WHERE DiscordID = '${interaction.user.id}', Game = 'BF'`, function(err, results, fields) {
                              let key = results[0].Key1 + "," + results[0].Key2 + "," + results[0].Key3
                              interaction.followUp(key);
                          })
                      }
                  })
              }
			  */
			  
			  
			  
          })
      //}
  },
};


// interaction.followUp({ embeds: [embedsty] ,  ephemeral: true }).then().catch(err => {});