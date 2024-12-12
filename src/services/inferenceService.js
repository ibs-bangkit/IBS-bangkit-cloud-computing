const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const classes = ['cardboard', 'glass', 'metal', 'organic', 'paper', 'plastic'];

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const accuracy = Math.max(...score) * 100;

        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];

        let suggestion, explanation, resource;

        if (label === 'cardboard') {
            suggestion = "📦 Wah, ini kardus! Simpan atau daur ulang ya!"
            explanation = "Kardus bisa diubah menjadi bahan baru seperti kertas daur ulang. Ayo, bantu mengurangi limbah!"
            resource = [
                "https://youtu.be/-fvlyHqSbZQ?si=YPJ_SgdrV6paaBQ3",
                "https://youtu.be/6BR15YEizCY?si=wioBk5sHrBXXdYCH"
            ]
        }

        if (label === 'glass') {
            suggestion = "🍶 Ini berbahan kaca! Jangan dibuang sembarangan!"
            explanation = "Sampah berbahan kaca bisa dilebur dan dibuat menjadi kaca baru tanpa kehilangan kualitas. Daur ulang itu keren!"
            resource = [
                "https://youtu.be/Ny8Af_ADvtg?si=szvuXJWNLUbnC1NA",
                "https://youtu.be/2AQFG1FJFTo?si=7gItjHEBvMVstEcd"
            ]
        }

        if (label === 'metal') {
            suggestion = "🔩 Wow, ini sampah berbahan logam/metal! Ayo daur ulang!"
            explanation = "Bahan metal sangat berharga dan bisa didaur ulang tanpa batas."
            resource = [
                "https://youtube.com/shorts/AhBsCNTTTPc?si=0_mmjmgpNsIj8ZIg",
                "https://m.youtube.com/watch?v=ajEECRjRQEE&pp=ygUSI2Vrc3BlcmltZW5wZW1hbmFz"
            ];
        }

        if (label === 'organic') {
            suggestion = "🍃 Ini sampah organik, komposin aja!"
            explanation = "Sampah organik bisa jadi pupuk alami untuk tanaman. Yuk, dukung pertanian berkelanjutan!"
            resource = [
                "https://youtu.be/kwajGch9cKA?si=PrztSz-lpIF1xAPb",
                "https://youtu.be/_hAv9wrPAvc?si=6EJxY0nGV_gGRKtv"
            ]
        }

        if (label === 'paper') {
            suggestion = "📜 Ini kertas! Mari selamatkan pohon!"
            explanation = "Kertas bisa didaur ulang hingga 5-7 kali. Dengan mendaur ulang, kita bisa menghemat banyak pohon."
            resource = [
                "https://youtu.be/1UoskWBm1h0?si=P5bXVS2DSm-U7T0d",
                "https://youtu.be/Z1DER7uUvu8?si=_fDbWEHiqVrJBDYt"
            ]
        }

        if (label === 'plastic') {
            suggestion = "🛍️ Plastik terdeteksi! Pilah dengan bijak."
            explanation = "Plastik tertentu seperti PET, HDPE, dan PVC bisa didaur ulang. Yuk, kurangi penggunaan plastik sekali pakai!"
            resource = [
                "https://youtu.be/sbYlSF3nBPk?si=-lLMxuG1MTkBB5GQ",
                "https://youtu.be/BeaIzeQLIis?si=eiXidzRLgF1bdgK6"
            ]
        }

        return { accuracy, label, suggestion, explanation, resource };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
};


module.exports = predictClassification;