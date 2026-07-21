const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {

    try {

        const alert = await Alert.create({
            userId: req.user._id,
            symbol: req.body.symbol,
            company: req.body.company,
            targetPrice: req.body.targetPrice,
            type: req.body.type
        });

        res.json({
            success: true,
            message: "Alert created successfully",
            alert
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAlerts = async (req, res) => {

    try {

        const alerts = await Alert.find({
            userId: req.user._id,
            triggered: false
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            alerts
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.deleteAlert = async (req, res) => {

    try {

        const alert = await Alert.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found"
            });
        }

        res.json({
            success: true,
            message: "Alert deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getNotifications = async (req, res) => {

    try {

        const alerts = await Alert.find({

            userId: req.user._id,
            triggered: true,
            seen: false

        });

        res.json({

            success: true,
            data: alerts

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false

        });

    }

};

exports.markNotificationSeen = async (req, res) => {

    try {

        await Alert.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            {
                seen: true
            }
        );

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });

    }

};