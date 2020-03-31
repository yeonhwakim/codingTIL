const { GoogleSpreadsheet } = require('google-spreadsheet');
  
const doc = new GoogleSpreadsheet('1YcUCp8_nRbaiPhQ5IOXvWtoChl9qkevfyM_hma6u5bI');
const creds = require('./spreadsheet-272109-ad4fd27d7078.json');

module.exports = (req, res) => { 
  (async() => {
    await doc.useServiceAccountAuth(creds);  
    await doc.loadInfo(); 
  
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows();
  
    const list = rows.map(r => {
      return r._rawData
    })
    res.end(JSON.stringify(list))
  })();
}