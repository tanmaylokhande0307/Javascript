const chokidar = require('chokidar');

const watcher = chokidar.watch('file.txt', { persistent: true });

watcher
    .on('change', (path) => console.log(`File changed: ${path}`))
    .on('unlink', (path) => console.log(`File deleted: ${path}`));
