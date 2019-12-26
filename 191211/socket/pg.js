const pg = new require('pg').Pool({
  user: 'yeonhwa',
  host: 'jummer.cupxpirjrt9s.ap-northeast-2.rds.amazonaws.com',
  database: 'jummer',
  password: 'qet135!#%',
  port: 5432,
})

pg.query('SELECT * FROM voteroom WHERE room=$1',['a'],(err, result)=>{
  if (err) console.log(err)
  console.log(result.rows)
})

