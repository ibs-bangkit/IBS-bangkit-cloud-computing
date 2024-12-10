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
        const confidenceScore = Math.max(...score) * 100;

        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];

        let suggestion, explanation;

        if (label === 'cardboard') {
            suggestion = "  Ini adalah sampah berbahan kardus"
            explanation = "Bahan ini bisa didaur ulang"
        }

        if (label === 'glass') {
            suggestion = "Ini adalah sampah berbahan kaca"
            explanation = "Bahan ini bisa didaur ulang"
        }

        if (label === 'metal') {
            suggestion = "Ini adalah sampah berbahan metal"
            explanation = "Bahan ini bisa didaur ulang"
        }

        if (label === 'organic') {
            suggestion = "Ini adalah sampah organik"
            explanation = "Sampah ini bisa didaur ulang"
        }

        if (label === 'paper') {
            suggestion = "Ini adalah sampah berbahan kertas"
            explanation = "Bahan ini bisa didaur ulang"
        }

        if (label === 'plastic') {
            suggestion = "Ini adalah sampah berbahan plastik"
            explanation = "Bahan ini bisa didaur ulang jika masuk ke kategori PET, HDPE, dan PVC"
        }

        return { confidenceScore, label, suggestion, explanation };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
};


module.exports = predictClassification;