const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const path = require('path')
const fs = require('fs')
const cron = require('node-cron')

// Folder

const Folder = path.join(__dirname, './Cookies')


if (!fs.existsSync(Folder)) {
    fs.mkdirSync(Folder, { recursive: true })
}

// Function

// const login = require('./Function/erin')
// const users = require('./Function/getUser')
const regist = require('./Function/regist')
// const autoorder = require('./Function/cron')
const jadwal = require('./Function/schdule')

// Function

const getUser = require('./Function/getUser')
const Transaksi = require('./Function/erin')
const signIn = require('./Function/signin')

const client = new Client({
    authStrategy: new LocalAuth,
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
})

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('Scan QR diatas')
});

client.on('authenticated', () => {
    console.log('Client berhasil di autentikasi')
})

client.on('ready', () => {
    console.log('Client siap digunakan')
})

// Order disini

async function autoOrder() {

    try {
        const schedules = jadwal

        for (const schedule of schedules) {
            const { time, userId } = schedule
            
            let jam
            let menit
            let cookie
            let wa

            const savedUser = await getUser(userId)

            if (savedUser) {
                cookie = savedUser.cookie
            }

            const masuk = await signIn(cookie)
            const user = masuk.name
            const phoneNumber = masuk.phoneNumber

            console.log(user, phoneNumber, time, userId)

            const waktu = time.split(':')
            if (waktu) {
                jam = waktu[0]
                menit = waktu[1]
            }

            cron.schedule(`${menit} ${jam} * * *`, async () => {
                const beli = await Transaksi(cookie)

                console.log(beli)
                if(beli.responseData.success !== false) {
                    const transactionId = beli.logins_data.transactionId
                    const packageName = beli.logins_data.packageName
                    const nominal = beli.logins_data.response.nominal
                    const validity = beli.logins_data.response.validity
                    const messagex = beli.responseData.message

                    if(phoneNumber === '6282169986052') {
                        wa = '6285783523100@c.us'

                    } else if(phoneNumber === '6282193857367') {
                        wa = '6285161648180@c.us'
                    }

                    await client.sendMessage(wa, `Transaksi *#${transactionId}* Berhasil!\n\nPaket : ${packageName}\nHarga : Rp. ${nominal}\nAktif : ${validity} Hari\nPerpanjang otomatis : ${jam}:${menit} WIB\nPesan : ${messagex}`)

                } else {

                    await client.sendMessage(wa, `Transaksi *#${beli.logins_data.transactionId}* Gagal!\n\nPaket : ${beli.logins_data.packageName}\n\nPesan : ${beli.responseData.message}`)
                }

            }, {
                scheduled: true,
                timezone: "Asia/Jakarta"
            })
        }

    } catch (err) {
        console.log(err)
    }
}

autoOrder()

client.on('message', async (msg) => {
    const user = msg.from.replace('@c.us', '')

    if(msg.body.includes('.reg')) {
        const cookie = msg.body.split(' ')[1]

        const daftar = await regist(cookie)

        if(daftar !== 'Cookies expired / tidak valid!') {

            const userData = {
                user: user,
                cookie: cookie
            }
    
            const file_name = `${user}` + `_cookie.json`
            const folderFile = path.join(Folder, file_name)
    
            fs.writeFileSync(folderFile, JSON.stringify(userData), { flag: 'w'})

            await client.sendMessage(msg.from, `Cookies berhasil disimpan!\n\nUser : ${daftar.name}\nPhone number : ${daftar.phoneNumber}`)
        }
    }
})


client.initialize()