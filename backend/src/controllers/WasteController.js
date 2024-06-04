/**
 * Waste Management Controller
 * Handles business logic for waste record operations.
 */
const WasteModel = require('../models/WasteModel');

exports.getAllWaste = async (req, res) => {
    try {
        const userId = req.params.userId;
        const waste = await WasteModel.findByUserId(userId);
        res.status(200).json(waste);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving waste records', error: error.message });
    }
};

exports.createWaste = async (req, res) => {
    try {
        const newRecord = await WasteModel.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: 'Error creating waste record', error: error.message });
    }
};

exports.updateWaste = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRecord = await WasteModel.update(id, req.body);
        if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: 'Error updating waste record', error: error.message });
    }
};

exports.deleteWaste = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await WasteModel.delete(id);
        if (!deleted) return res.status(404).json({ message: 'Record not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting waste record', error: error.message });
    }
};
