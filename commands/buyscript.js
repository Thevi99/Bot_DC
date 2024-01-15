const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const truewalletapi = require('../lib/TrueWallet');
const wallet = new truewalletapi(process.env.WALLET_NUMBER);
let menu = [
  {
    name: 'Anime Dimensions | full farm (110 บาท)',
    description: " ",
    value: 'ADS-FF',
  },


];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('select menu')
    .addStringOption((option) => {
        option.setName('menu').setDescription('choice menu').setRequired(true);
  
        for (var x of menu) {
            option.addChoice(x.name, x.value);
        }
        return option;
      })
	.addStringOption((option) => option.setName('voucher').setDescription('put voucher').setRequired(true))
	.addStringOption((option) => option.setName('username').setDescription('put username').setRequired(true))
	.addStringOption((option) => option.setName('password').setDescription('put password').setRequired(true)),
    async execute(interaction,makeid,role) {
      let interactionMenu = interaction.options.getString('menu');
      let interactionLink = interaction.options.getString('voucher');
	  let interactionID = interaction.options.getString('username');
	  let interactionPASS = interaction.options.getString('password');



      if (!process.env.WALLET_NUMBER) return interaction.followUp("ERROR").then().catch(err => {});
      

        if (interactionLink) {
          if (!interactionLink.startsWith('https://gift.truemoney.com/campaign/?v=')) return interaction.followUp("ลิ้งอั่งเปาผิดพลาด!!").then().catch(err => {});
          let response = await wallet.redeem(interactionLink);
          try {
            if (response.data.voucher.member != 1) return interaction.followUp("กรุณาตั้งจำนวจผู้ใช้ป็น 1 คน !!");
			
			let redeem_amount = parseFloat(`${response.data.voucher.amount_baht}`.replace(/,/g, ''));
			if (interactionMenu === "ADS-FF") {
				if (redeem_amount < 10.00) return interaction.followUp("เงินไม่พอ!!");
				let channel = interaction.client.channels.cache.get('1010455886705217607');
				channel.send("@everyone");
				const Embed10 = new discord.MessageEmbed()
				.setTitle('<a:elpepehacker:972226451917111357> | แจ้งเตือนคิวใหม่ !!')
				.setColor('#5edfff')	
				.addFields( 
					{ name: 'ชื่อลูกค้า', value: '<@' + interaction.user.id+ "> ("+interaction.user.id+")", inline: true },
					{ name: 'ชื่อผู้ใช้', value: interactionID, inline: true },
					{ name: 'รหัสผ่าน', value: interactionPASS, inline: true },
					{ name: 'งาน', value: 'หาเคียว', inline: true },
					{ name: 'เกม', value: 'King Legacy', inline: true },
					{ name: 'จำนวนเงินที่ได้รับ', value: ' ' + redeem_amount+" บาท", inline: true },
					{ name: 'ลิ้งซองอั่งเปา', value: ' ' + interactionLink+"", inline: true },
				)
				.setTimestamp()
				.setFooter('Deity Store');
				channel.send({ embeds: [Embed10] ,  ephemeral: true })
			} else if (interactionMenu === "KL-FarmGem") {
				let channel = interaction.client.channels.cache.get('1010455886705217607');
				channel.send("@everyone");
				const Embed10 = new discord.MessageEmbed()
				.setTitle('<a:elpepehacker:972226451917111357> | แจ้งเตือนคิวใหม่ !!')
				.setColor('#5edfff')	
				.addFields( 
					{ name: 'ชื่อลูกค้า', value: '<@' + interaction.user.id+ "> ("+interaction.user.id+")", inline: true },
					{ name: 'ชื่อผู้ใช้', value: interactionID, inline: true },
					{ name: 'รหัสผ่าน', value: interactionPASS, inline: true },
					{ name: 'งาน', value: 'ฟาร์ม GEM ( 4 เวล 1 บาท )', inline: true },
					{ name: 'เกม', value: 'King Legacy', inline: true },
					{ name: 'จำนวนเงินที่ได้รับ', value: ' ' + redeem_amount+" บาท", inline: true },
					{ name: 'ลิ้งซองอั่งเปา', value: ' ' + interactionLink+"", inline: true },
				)
				.setTimestamp()
				.setFooter('Deity Store');
				channel.send({ embeds: [Embed10] ,  ephemeral: true })
			}

			
			
			
          } catch (err) {
            if (err.status === 400 || err.status === 404) return interaction.followUp("อินเตอร์เน็ตขัดข้อง โปรดลองอิกครั้งภายหลัง").then().catch(err => {});
            
            console.log(err);
            return interaction.followUp("uunknow error 2").then().catch(err => {});

          }

        }

    }
}