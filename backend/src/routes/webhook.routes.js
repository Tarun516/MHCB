import express from "express";
import { Resource } from "../models/resouce.model.js";
import { Contact } from "../models/emergencycontact.model.js";

const router = express.Router();

const intentHandlerMap = {
  "Stress and Anxiety Articles Intent": "stress_articles",
  "Stress and Anxiety Videos Intent": "stress_videos",
  "General Articles Intent": "general_articles",
  "General Videos Intent": "general_videos",
  "Depression Articles Intent": "depression_articles",
  "Depression Videos Intent": "depression_videos",
  "Sleep Articles Intent": "sleep_articles",
  "Sleep Videos Intent": "sleep_videos",
  "Contact Request Intent": "contact_fetch",
};

router.post("/", async (req, res) => {
  try {
    const intent = req.body.queryResult.intent.displayName;
    const tag = intentHandlerMap[intent];

    if (intent === "Contact Request Intent") {
      try {
        // Query all contacts from the database
        const contacts = await Contact.find({});

        // Sort the contacts (example: by name)
        contacts.sort((a, b) => a.name.localeCompare(b.name));

        // Select the top 3 contacts
        const top3Contacts = contacts.slice(0, 3);

        // Format the response message with the top 3 contacts
        let responseMessage = "Here are the top 3 contacts:\n";
        top3Contacts.forEach((contact, index) => {
          responseMessage += `${index + 1}. Name: ${contact.name}, Phone: ${
            contact.phoneNumber
          }, Phone: ${contact.phone}\n`;
        });

        // Send the response back to the chatbot user
        res.send({ fulfillmentText: responseMessage });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }

    if (!tag) {
      throw new Error(`No tag found for intent: ${intent}`);
    }

    // Fetch resources based on the tag
    const resources = await Resource.find({ tag }).limit(2);

    // Prepare response with fetched resources
    const fulfillmentText = `Here are some resources: ${resources
      .map(
        (resource, index) =>
          `${index + 1}. Title: ${resource.title} URL: ${resource.url}`
      )
      .join("\n")}`;

    res.send({ fulfillmentText: fulfillmentText });
  } catch (error) {
    console.error(`Error handling intent ${intent}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
