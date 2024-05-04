// controllers/webhook.controller.js

// Import your Resource model and any other dependencies
import { Resource } from "../models/resouce.model.js";

// Function to handle video resource requests
export async function handleVideoResourceRequest(parameters) {
  try {
    // Extract parameters from the request
    const { subcategory } = parameters;

    // Query the database for video resources based on the subcategory
    const videoResources = await Resource.find({
      type: "video",
      tag: subcategory,
    });

    // Construct a response
    const response = {
      fulfillmentText: `Here are some videos on ${subcategory}:`,
      fulfillmentMessages: [
        {
          text: {
            text: videoResources
              .map((resource) => `${resource.title}: ${resource.url}`)
              .join("\n"),
          },
        },
      ],
    };

    return response;
  } catch (error) {
    console.error("Error handling video resource request:", error);
    // Handle errors and return an appropriate response
    return {
      fulfillmentText:
        "An error occurred while handling your request. Please try again later.",
    };
  }
}

// Function to handle article resource requests
export async function handleArticleResourceRequest(parameters) {
  // Similar logic as above, but for article resources
  try {
    // Extract parameters from the request
    const { subcategory } = parameters;

    // Query the database for video resources based on the subcategory
    const videoResources = await Resource.find({
      type: "article",
      tag: subcategory,
    });

    // Construct a response
    const response = {
      fulfillmentText: `Here are some videos on ${subcategory}:`,
      fulfillmentMessages: [
        {
          text: {
            text: videoResources
              .map((resource) => `${resource.title}: ${resource.url}`)
              .join("\n"),
          },
        },
      ],
    };

    return response;
  } catch (error) {
    console.error("Error handling article resource request:", error);
    // Handle errors and return an appropriate response
    return {
      fulfillmentText:
        "An error occurred while handling your request. Please try again later.",
    };
  }
}
