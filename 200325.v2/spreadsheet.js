const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./spreadsheet-272109-ad4fd27d7078.json');
 
const doc = new GoogleSpreadsheet('1YcUCp8_nRbaiPhQ5IOXvWtoChl9qkevfyM_hma6u5bI');

doc.useServiceAccountAuth(creds);

const sheet = async function add() {
  return await doc.addSheet({ headerValues: ['name', 'email'] });
}
console.log(sheet()) 