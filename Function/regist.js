const axios = require('axios')
const cheerio = require('cheerio')

async function regist(cookies) {
    
    if(cookies.length !== 0) {
        
        const config = {
            method: 'get',
            url: 'https://ilmupedia.co.id/belipaket',
            headers: {
                'Cookie': cookies,
                'Host': 'ilmupedia.co.id',
                'Connection': 'keep-alive'
            }
        }

        const masuk = await axios(config)
        const html = masuk.data

        if(html) {
            const $ = cheerio.load(html)

            const cardName = $('.card-name')

            const name = cardName.find('p').eq(0).text()
            const phoneNumber = cardName.find('p').eq(1).text()

            return { name, phoneNumber }
            
        } else {
            return `Cookies expired / tidak valid!`
        }
    }
}

module.exports = regist