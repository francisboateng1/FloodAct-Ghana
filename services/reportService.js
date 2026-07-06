const db = require('../config/firebase');
const { isNearby } = require('../utils/geoUtils');
const { triggerAlert } = require('./alertService');




function isDuplicateReport(existingReports, newReport) {
    return existingReports.some(r =>
        r.userId === newReport.userId &&
        (Date.now() - r.timestamp) < 5 * 60 * 1000
    );
}









async function addReportAndCheck(report) {
    const newReport = {
         ...report,
         time: Date.now()
         };



         

   
    // 1. Fetch recent reports (last ~30 mins)
    const snapshot = await db.collection('reports')
        .where('time', '>', Date.now() - 30 * 60 * 1000)
        .get();

    const reports = snapshot.docs.map(doc => doc.data());




        // 2. CHECK DUPLICATE
    const isDuplicate = reports.some(r =>
        r.userId === newReport.userId &&
        Math.abs(r.latitude - newReport.latitude) < 0.001 &&
        Math.abs(r.longitude - newReport.longitude) < 0.001
    );

    if (isDuplicate) {
        return {
            success: false,
            message: "Duplicate report blocked (wait before reporting again)"
        };
    }




     // 3. Save to Firestore
    await db.collection('reports').add(newReport);







    // 4. Filter nearby
    const nearbyReports = reports.filter(r =>
        isNearby(r, newReport, 500) // 500 meters radius
        
    );
    
    

    



    // 5. Trigger alert
    const highSeverityReports = nearbyReports.filter(r => r.severity === "high");

if (nearbyReports.length >= 3 || highSeverityReports.length >= 2) {
    triggerAlert("⚠️ Flood reported nearby. Avoid this route.");
}

    return {
        message: "Report stored",
        nearbyCount: nearbyReports.length
    };
}




module.exports = { addReportAndCheck };