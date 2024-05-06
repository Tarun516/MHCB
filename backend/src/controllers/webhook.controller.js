import { asyncHandler } from "../utils/asyncHandler.js";
import { Resource } from "../models/resouce.model.js";

const handleSleepArticlesIntent = asyncHandler(async (parameters) => {
  try {
    const sleepArticlesParam = parameters.sleep_articles || [];

    // Query the database to find the top two articles related to sleep
    const sleepResources = await Resource.find({
      tag: { $in: sleepArticlesParam },
    }).limit(2);

    // Extract the title and URL of each resource
    const articlesData = sleepResources.map((resource) => ({
      title: resource.title,
      url: resource.link,
    }));

    // Construct the fulfillment text
    let fulfillmentText = "Here are the top two sleep-related articles:\n";
    articlesData.forEach((article) => {
      fulfillmentText += `${article.title}: ${article.url}\n`;
    });

    return { fulfillmentText };
  } catch (error) {
    console.error("Error handling sleep articles intent:", error);
    throw new Error("Failed to fetch sleep articles."); // Throw an error to be caught by asyncHandler
  }
});

const handleSleepVideosIntent = asyncHandler(async (parameters) => {
  const sleepVideosParam = parameters.sleep_videos || [];
  const sleepResources = await Resource.find({
    tag: { $in: sleepVideosParam },
  }).limit(2);

  const sleepResourceData = sleepResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage = "Here are some sleep-related videos for you:";
  const fulfillmentText = `${customMessage}\n${sleepResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

const handleDepressionArticlesIntent = asyncHandler(async (parameters) => {
  const depressionArticlesParam = parameters.depression_articles || [];
  const depressionResources = await Resource.find({
    tag: { $in: depressionArticlesParam },
  }).limit(2);

  const depressionResourceData = depressionResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage = "Here are some depression-related articles for you:";
  const fulfillmentText = `${customMessage}\n${depressionResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

const handleDepressionVideosIntent = asyncHandler(async (parameters) => {
  const depressionVideosParam = parameters.depression_videos || [];
  const depressionResources = await Resource.find({
    tag: { $in: depressionVideosParam },
  }).limit(2);

  const depressionResourceData = depressionResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage = "Here are some depression-related videos for you:";
  const fulfillmentText = `${customMessage}\n${depressionResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

const handleGeneralArticlesIntent = asyncHandler(async (parameters) => {
  const generalArticlesParam = parameters.general_articles || [];
  const generalResources = await Resource.find({
    tag: { $in: generalArticlesParam },
  }).limit(2);

  const generalResourceData = generalResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage = "Here are some general articles for you:";
  const fulfillmentText = `${customMessage}\n${generalResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

const handleGeneralVideosIntent = asyncHandler(async (parameters) => {
  const generalVideosParam = parameters.general_videos || [];
  const generalResources = await Resource.find({
    tag: { $in: generalVideosParam },
  }).limit(2);

  const generalResourceData = generalResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage = "Here are some general videos for you:";
  const fulfillmentText = `${customMessage}\n${generalResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

const handleStressAnxietyArticlesIntent = asyncHandler(async (parameters) => {
  const stressAnxietyArticlesParam = parameters.stress_anxiety_articles || [];
  const stressAnxietyResources = await Resource.find({
    tag: { $in: stressAnxietyArticlesParam },
  }).limit(2);

  const stressAnxietyResourceData = stressAnxietyResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage =
    "Here are some stress and anxiety-related articles for you:";
  const fulfillmentText = `${customMessage}\n${stressAnxietyResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

const handleStressAnxietyVideosIntent = asyncHandler(async (parameters) => {
  const stressAnxietyVideosParam = parameters.stress_anxiety_videos || [];
  const stressAnxietyResources = await Resource.find({
    tag: { $in: stressAnxietyVideosParam },
  }).limit(2);

  const stressAnxietyResourceData = stressAnxietyResources.map((resource) => ({
    title: resource.title,
    url: resource.link,
  }));

  const customMessage =
    "Here are some stress and anxiety-related videos for you:";
  const fulfillmentText = `${customMessage}\n${stressAnxietyResourceData
    .map((resource) => `${resource.title}: ${resource.url}`)
    .join("\n")}`;

  return { fulfillmentText };
});

export {
  handleSleepArticlesIntent,
  handleSleepVideosIntent,
  handleDepressionArticlesIntent,
  handleDepressionVideosIntent,
  handleGeneralArticlesIntent,
  handleGeneralVideosIntent,
  handleStressAnxietyArticlesIntent,
  handleStressAnxietyVideosIntent,
};
