const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.sendFuelSMS = functions.firestore
  .document("fuel_vouchers/{id}")
  .onCreate(async (snap) => {

    const data = snap.data();

    const driver = await admin.firestore()
      .collection("drivers")
      .doc(data.driverId)
      .get();

    const phone = driver.data().phone;

    const message = `Pakisa Fuel
Code: ${data.code}
Amt: R${data.amountApproved}
Valid: Today`;

    await fetch("https://YOUR-INFObip-URL/sms/2/text/advanced", {
      method: "POST",
      headers: {
        "Authorization": "App YOUR_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{
          from: "Pakisa",
          destinations: [{ to: phone }],
          text: message
        }]
      })
    });

    return null;
  });
