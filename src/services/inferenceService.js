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
            resource = "https://www.youtube.com/watch?v=-fvlyHqSbZQ"
        };

        if (label === 'glass') {
            suggestion = "🍶 Ini berbahan kaca! Jangan dibuang sembarangan!"
            explanation = "Sampah berbahan kaca bisa dilebur dan dibuat menjadi kaca baru tanpa kehilangan kualitas. Daur ulang itu keren!"
            resource = "https://www.youtube.com/watch?v=Ny8Af_ADvtg"

        };

        if (label === 'metal') {
            suggestion = "🔩 Wow, ini sampah berbahan logam/metal! Ayo daur ulang!"
            explanation = "Bahan metal sangat berharga dan bisa didaur ulang tanpa batas."
            resource = "https://youtube.com/shorts/AhBsCNTTTPc?si=0_mmjmgpNsIj8ZIg"
        };

        if (label === 'organic') {
            suggestion = "🍃 Ini sampah organik, komposin aja!"
            explanation = "Sampah organik bisa jadi pupuk alami untuk tanaman. Yuk, dukung pertanian berkelanjutan!"
            resource = "https://www.youtube.com/watch?v=kwajGch9cKA"
        };

        if (label === 'paper') {
            suggestion = "📜 Ini kertas! Mari selamatkan pohon!"
            explanation = "Kertas bisa didaur ulang hingga 5-7 kali. Dengan mendaur ulang, kita bisa menghemat banyak pohon."
            resource = "https://www.youtube.com/watch?v=1UoskWBm1h0"

        };

        if (label === 'plastic') {
            suggestion = "🛍️ Plastik terdeteksi! Pilah dengan bijak."
            explanation = "Plastik tertentu seperti PET, HDPE, dan PVC bisa didaur ulang. Yuk, kurangi penggunaan plastik sekali pakai!"
            resource = "https://www.youtube.com/watch?v=sbYlSF3nBPk"

        };

        return { accuracy, label, suggestion, explanation, resource };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
};


module.exports = predictClassification;