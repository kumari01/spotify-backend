const Imagekit = require('@imagekit/nodejs');

const ImageKitClient = Imagekit.default || Imagekit.ImageKit || Imagekit;

const imagekit = new ImageKitClient({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file) {
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
        throw new Error('ImageKit env vars are missing. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT.');
    }

    const result = await imagekit.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder : "yt-complete-spotify-backend/music"
    });
    return result;
}
module.exports = { uploadFile };