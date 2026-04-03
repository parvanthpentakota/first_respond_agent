const express = require("express");
const router = express.Router();
const db = require("../config/db");
const twilio = require("twilio");
require("dotenv").config();

const client = (process.env.TWILIO_SID && process.env.TWILIO_SID.startsWith("AC")) 
  ? new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)
  : null;

module.exports = (io) => {
  router.post("/", async (req, res) => {
    const { userId, location } = req.body;

    // Database is temporarily bypassed
    const mockUser = { name: "Mock User (No DB)" };
    const mockContacts = [{ contact_phone: "+1234567890" }];

    for (let c of mockContacts) {
      if (client) {
        try {
          await client.messages.create({
            body: `🚨 ${mockUser.name} needs help!\nLat/Lng: ${location.lat},${location.lng}`,
            from: process.env.TWILIO_NUMBER,
            to: c.contact_phone,
          });
        } catch (e) {
          console.error("Twilio Error:", e.message);
        }
      } else {
        console.log(`[Twilio Mock] SMS to ${c.contact_phone}: 🚨 ${mockUser.name} needs help!`);
      }
    }

    // Emit live alert to dashboard
    io.emit("emergencyAlert", { user: mockUser, location });

    res.send("🚨 Emergency Sent (DB Bypassed)");
  });

  return router;
};