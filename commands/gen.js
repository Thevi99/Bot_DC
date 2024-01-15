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
    .setName('generate')
    .setDescription('generate keys')
    .addStringOption((option) => {
        option.setName('game').setDescription('just a choice of game').setRequired(true);
  
        for (var x of game) {
            option.addChoice(x.name, x.value);
        }
        return option;
      })
    .addStringOption((option) => option.setName('amount').setDescription('amount').setRequired(true)),
    async execute(interaction,con,NameHub,MadeBy,makeid,role,log,buyer,keymanager,keymanagername) {
    let interactionGame = interaction.options.getString('game');
    let interactiongen = interaction.options.getString('amount');
    if (!interaction.member.roles.cache.find(r => r.id === keymanager)) {
        const Embed1 = new discord.MessageEmbed()
		.setTitle('<:error:963346324026167327> : Invalid')
		.setColor('#fc4747')	
		.setDescription("**You not have permission to use this command.**")
		.setTimestamp()
		.setFooter('Deity Hub');
		interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
    } else {
		console.log(interactionGame)
            if (interactionGame == "PS" || interactionGame == "BloxFruit" || interactionGame == "KingLegacy" || interactionGame == "GrandPiece" || interactionGame == "A0nePieceG" || interactionGame == "KingLegacM" || interactionGame == "StandUPR" || interactionGame == "ADM" || interactionGame == "ShindoLife") {
                if (interactiongen.length <= 2) {
                    console.log('a')
                    if (interactiongen) {
                        if (typeof(interactiongen) == "string") {
                            let randomKey = ""
                            let fuckoff = []
                            for (var i = 0; i < interactiongen; i++){
                                fuckoff.push(`${makeid(15)}`)
                            }
                            let fuck = ""
							
								


                            fuckoff.forEach(ab => {
                                fuck = fuck + "" + ab.toString() + "\n"
                                con.query(`INSERT INTO datakey (RedeemKey,Used,Game,HWID,DiscordID) 
								           VALUES ('${ab}','False','${interactionGame}','Unknow','Unknow')`, function(err, results, fields) {
                                    if (err) return console.log(err);
                                })
                            })
							
							const Embed = new discord.MessageEmbed()
                                .setTitle("₊˚. ༘ ❝  Successfully˚✧", '')
                                .setColor('#ffffff')	
                                .setDescription("```\n" + fuck + "```")
								.addFields(
									{ name: '<:gameicon2:963341437582315530> : Game', value: interactionGame, inline: true },
									{ name: '<:__:963341448714018838> : Count', value: interactiongen, inline: true },
								)
                                .setTimestamp()
                                .setFooter(MadeBy);
                            interaction.followUp({ embeds: [Embed] ,  ephemeral: true }).then().catch(err => {});
        
                        }
                    }
                }
            } else {
				const Embed1 = new discord.MessageEmbed()
				.setTitle('<:error:963346324026167327> : Invalid')
				.setColor('#fc4747')	
				.setDescription("**Game Not Found!**")
				.setTimestamp()
				.setFooter('Deity Hub');
				interaction.followUp({ embeds: [Embed1] ,  ephemeral: true }).then().catch(err => {});
			}
        }
    }
}

// interaction.followUp({ embeds: [embedsty] ,  ephemeral: true }).then().catch(err => {});