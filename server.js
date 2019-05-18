const tus = require('tus-node-server');
const decode = require('tus-metadata').decode;


const server = new tus.Server();
server.datastore = new tus.FileStore({
    path: '/files'
});

server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
	console.log("");
    console.log(`Received file:`);
    console.log(event);
    console.log("Decoded metadata:")
    console.log(decode(event.file.upload_metadata));
});

const host = '127.0.0.1';
const port = 1080;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});