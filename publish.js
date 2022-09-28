
const { Client } = require('ssh2');
const conn = new Client()
conn
  .on('ready', () => {
    console.log('Client :: ready')
    conn.exec("cd /data/caoshiyuan/server/pro-pc-project && git checkout . && git checkout task-dev && git pull  &&  pm2 start start.dev.json ",(err,stream)=>{
        if (err) throw err;
        stream.on('close', (code, signal) => {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', (data) => {
          console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
    })
  })
  .connect({
    host: '106.75.67.107',
    username: 'caoshiyuan',
    port: 22,
    password: 'csy@123'
  })

//   platform