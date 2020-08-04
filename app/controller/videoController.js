var router = require('express').Router();
var fileSystem = require('fs');

const WELLCOME_VIDEO_PATH = require('path').join(__dirname, '..', 'static', 'video', 'welcome_video_large.mp4');

router.get("",function (request, respond)
{
    const fileInfo = fileSystem.statSync(WELLCOME_VIDEO_PATH)
    const fileSize = fileInfo.size

    const range = request.headers.range

    if (range != null) 
    {
        const rangeValue = range.replace("bytes=", "").split("-");
        const start = parseInt(rangeValue[0], 10);
        const end = rangeValue[1] ? parseInt(rangeValue[1], 10) : fileSize - 1;
        const requestSize = (end - start) + 1;
        const file = fileSystem.createReadStream(WELLCOME_VIDEO_PATH, {start, end});

        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': requestSize,
            'Content-Type': 'video/mp4',
        }

        respond.writeHead(206, headers);
        file.pipe(respond);
    } 
    else 
    {
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }

        respond.writeHead(200, headers)
        fileSystem.createReadStream(WELLCOME_VIDEO_PATH).pipe(respond)
    }
});


module.exports = router