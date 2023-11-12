const axios = require('axios')

async function erin(cookie) {

    if(cookie.length !== 0){
        
        const cookieValue = cookie

        const payload = {
            'id': '1056',
            'derived_id': '7509',
            'purchase_mode': 'onetime',
            'channel': 'desktop|detail'
        }

        const config = {
            method: 'post',
            url: 'https://ilmupedia.co.id/belipaket/erin',
            headers: {
                'Cookie': cookieValue,
                'Host': 'ilmupedia.co.id',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43' 
            },
            data: payload
        }

        try {

            const logins = await axios(config)
            const logins_data = logins.data

            const transactionId = logins_data.transactionId
            
            try {

                const enpoint = 'https://ilmupedia.co.id/belipaket/commit-purchase'
                const payload = {
                    'transaction_id': transactionId
                }

                const headers = {
                    'Cookie': cookieValue,
                    'Host': 'ilmupedia.co.id',
                    'Connection': 'keep-alive',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43'
                }

                const response = await axios.post(enpoint, payload, { headers })
                const responseData = response.data
                
                return { responseData, logins_data }

            } catch (err) {
                console.log(err)
            }
    
        } catch (err) {
            console.log(err)
        }
        
    }
}


module.exports = erin