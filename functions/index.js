const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

const INFOBIP_KEY = functions.config().infobip.key;

exports.sendSMSVoucher = functions.firestore
  .document("fuel_vouchers/{id}")
  .onCreate(async (snap) => {

    const data = snap.data();

    const driverDoc = await admin.firestore()
      .collection("drivers")
      .doc(data.driverId)
      .get();

    const driver = driverDoc.data();

    if (!driver || !driver.phone) {
      console.log("No phone number found");
      return null;
    }

    const message = `Pakisa Fuel
Code: ${data.code}
Amt: R${data.amountApproved}
Valid: Today`;

    try {
      const res = await fetch("https://2yxk3p.api.infobip.com/sms/2/text/advanced", {
        method: "POST",
        headers: {
          "Authorization": `App ${INFOBIP_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          messages: [{
            from: "Pakisa",
            destinations: [{ to: driver.phone }],
            text: message
          }]
        })
      });

      const result = await res.json();
      console.log("SMS response:", result);

    } catch (err) {
      console.error("SMS ERROR:", err);
    }

    return null;
  });
