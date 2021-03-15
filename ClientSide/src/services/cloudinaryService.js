export const cloudinaryService = {
    uploadImg,

}
async function uploadImg(ev) {
    const CLOUD_NAME = "dsrtl41yz"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'ml_default');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.secure_url

    } catch (err) {
        console.log('Got Error uploading the img:', err);
    }

}