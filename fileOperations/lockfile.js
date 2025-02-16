const fs = require('fs');
const fsExt = require('fs-ext');

fs.open("file.txt", "r+", (err, fd) => {
    if (err) throw err;

    fsExt.flock(fd, "ex", (err) => {
        if (err) throw err;

        // Correct usage of fstat() with fd
        fs.fstat(fd, (err, stats) => {
            if (err) throw err;
            const position = stats.size; // Get current file size for appending

            // Write at the end of the file
            fs.write(fd, Buffer.from("whats good"), 0, 10, position, (err) => {
                if (err) throw err;

                fsExt.flock(fd, 'un', (err) => { // Unlock file
                    if (err) throw err;

                    fs.close(fd, (err) => {
                        if (err) throw err;
                        console.log('File safely updated with async locking.');
                    });
                });
            });
        });
    });
});
