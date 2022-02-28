const config = {
    dev: {
        scope: 'user-read-email user-read-private user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-read-currently-playing',
        client_id: '542d072b2d344ea08f1e7944173e9453',
        client_secret: '49a288749a9f4a65b9583eb1f9595a75',
        redirect_uri: 'http://192.168.1.50/callback',
        pass: 'KontolBesar69420',
    },
    prod: {
        scope: 'user-read-email user-read-private user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-read-currently-playing',
        client_id: '170452a430ad4323beb60b9e871dcf77',
        client_secret: '57f4f7cc733b4950a274c422e4fa0ea0',
        redirect_uri: 'https://spotifinfo.neutrix-web.xyz/callback',
        pass: 'KontolBesar69420',
    },
}

export default config
