const { addReportAndCheck } = require('../services/reportService');

exports.handleReport = async (req, res) => {
    try {
        const { userId, latitude, longitude, severity } = req.body;

        if ( !userId || !latitude || !longitude || !severity) {
            return res.status(400).json({ message: "Missing data" });
        }

        const result = await addReportAndCheck({
            userId, 
            latitude,
            longitude, 
            severity,
            credibility: 1
             });
        


        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};