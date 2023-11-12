const cron = require('node-cron')
const getUser = require('./getUser')
const Transaksi = require('./erin')

async function autoOrder(schedules) {

    try {
        
        for (const schedule of schedules) {
            const { time, pkg, userId } = schedule

            console.log(time, pkg, userId)
            
            let jam
            let menit
            let cookie

            const savedUser = await getUser(userId)

            if (savedUser) {
                cookie = savedUser.cookie
            }

            let id
            let derived_id

            if (pkg === '10GB1D') {
                id = '1056'
                derived_id = '7524'
            }

            const waktu = time.split(':')
            if (waktu) {
                jam = waktu[0]
                menit = waktu[1]
            }

            cron.schedule(`${menit} ${jam} * * *`, async () => {
                const beli = await Transaksi(cookie, id, derived_id)

                console.log(beli)
                return beli

            }, {
                scheduled: true,
                timezone: "Asia/Jakarta"
            })
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = autoOrder
