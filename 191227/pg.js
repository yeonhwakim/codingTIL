const { Pool } = require('pg')
const pool = new Pool({
  user: 'yeonhwa',
  host: 'jummer.cupxpirjrt9s.ap-northeast-2.rds.amazonaws.com',
  database: 'jummer',
  password: 'qet135!#%',
  port: 5432,
})
const data  = {
  room: 'a',
  user: '1',
  id: 'ㄷ',
  prevId: 'ㄷ'
}

const query = 'WITH o AS (' +
'	SELECT id, COALESCE(COUNT(*), 0)'+
'	FROM once'+
'	WHERE  room = $1'+
'	GROUP BY id'+
') '+
'SELECT * FROM voteroom v LEFT JOIN o ON o.id = v.id 	WHERE  room = $2'

const selectAll = (data) => pool.query(query, [data.room, data.room])
  .then(res => console.log(res.rows))
  .catch(err => console.log(err))


const selectItem = (data) => pool.query('SELECT * FROM once WHERE room = $1 AND counter = $2', [data.room, data.user])
  .then(res => res.rows.length)
  .catch(err => console.log(err))

const selectItems = (data) => pool.query('SELECT id, COUNT(*) FROM once WHERE room = $1 GROUP BY id', [data.room])
  .then(res => res.rows)
  .catch(err => console.log(err))

const deleteItem = (data, prevId) => pool.query('DELETE FROM once WHERE room = $1 AND id = $2 AND counter = $3', [data.room, prevId ? data.prevId : data.id, data.user])
  .then(() => true)
  .catch(err => console.log(err))

const insertItem = (data) => pool.query('INSERT INTO once(room, id, counter) VALUES ($1, $2, $3)', [data.room, data.id, data.user])
  .then(() => true)
  .catch(err => console.log(err))


const vote = async data => {
  const checkDuplicate = await selectItem(data)
  if (checkDuplicate) {
    if(data.prevId &&  data.id === data.prevId){
      await deleteItem(data, false)
    }
    if(data.prevId &&  data.id !== data.prevId){
      await deleteItem(data, true)
      await insertItem(data)
    }
  } else {
    await insertItem(data)
  }

  const items = await selectItems(data)

  return console.log(items)
}

vote(data)
selectAll(data)