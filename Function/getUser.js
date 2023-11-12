const fs = require('fs').promises
const path = require('path')

async function getCookie(userId) {

    try {
        const Folder = path.join(__dirname, '../Cookies')
        const file_name = `${userId}_cookie.json`
        const folderFile = path.join(Folder, file_name)
        const content = await fs.readFile(folderFile, 'utf8')
        const userData = JSON.parse(content)
        
        return userData


    } catch (error) {
        console.error('Gagal mengambil cookie:', error)
        return null
    }
}

module.exports = getCookie