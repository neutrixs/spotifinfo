const { readFileSync } = require('fs');

const { Client } = require('ssh2');

const cmd = [
    'cd repositories/spotifinfo_remote\n',
    'pwd\n',
    'export DEPLOYPATH=/home/neutrixw/spotifinfo.neutrix-web.xyz\n',
    '/bin/cp -r * $DEPLOYPATH\n',
    'cloudlinux-selector restart --json --interpreter nodejs --user neutrixw --app-root spotifinfo.neutrix-web.xyz\n'
]

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    conn.shell({cols:process.stdout.columns,rows:process.stdout.rows},(err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
            console.log('Stream :: close');
            conn.end();
        }).on('data', (data) => {
            process.stdout.write(data.toString());
        });

        cmd.forEach(c=>{
            stream.write(c)
        })

        stream.end('exit\n');
    });
}).connect({
    host: 'cpanel.neutrix-web.xyz',
    port: 22,
    username: 'neutrixw',
    privateKey: readFileSync('./ssh/id_rsa')
});