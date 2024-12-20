const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(req, res) {
    const image = req.file.buffer;
    const { model } = req;
    const { accuracy, label, explanation, suggestion, resource } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "explanation": explanation,
        "resource": resource,
        "accuracy": accuracy,
        "createdAt": createdAt
    }

    await storeData(id, data);

    res.status(201).json({
        status: 'success',
        message: accuracy > 90 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    })
}

module.exports = postPredictHandler;