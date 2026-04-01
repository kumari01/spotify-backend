const Imagekit = require('@imagekit/nodejs');

const ImageKitClient = Imagekit.default || Imagekit.ImageKit || Imagekit;

const imagekit = new ImageKitClient({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file) {
    const result = await imagekit.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder : "yt-complete-spotify-backend/music"
    });
    return result;
}
module.exports = { uploadFile };