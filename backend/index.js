require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

// Create an Express app
const app = express();
const port = process.env.PORT || 3002;

// Use CORS middleware
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Configure OpenAI API key from environment variable
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

// In-memory storage for chat histories
const chatHistories = {};

// Function to generate a random chatId
const generateChatId = () => {
  return Math.random().toString(36).substring(2);
};

async function getCompletionFromMessages(
  messages = [],
  model = "gpt-3.5-turbo-0125",
  temperature = 0,
  maxTokens = 50,
  masterPrompt = "Assume that you are Darshana Perera who is the marketing manager of ABC company. And your company is a soap company which produces lix, sunlight."
) {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content:
            "Assume that you are Darshana Perera who is the marketing manager of ABC company. And your company is a soap company which produces lix, sunlight. Provide simple short answers",
        }, // Add master prompt as system message
        ...messages, // Include user/system messages after the master prompt
      ],
      temperature: temperature,
      max_tokens: maxTokens,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching completion:", error);
    throw error;
  }
}

// Define an endpoint to get the entire chat history for a given chatId
app.get("/chatHistory/:chatId", (req, res) => {
  const { chatId } = req.params;

  // Check if chatHistory exists for the provided chatId
  if (chatHistories.hasOwnProperty(chatId)) {
    const chatHistory = chatHistories[chatId];
    res.json({ chatHistory });
  } else {
    res
      .status(404)
      .json({ error: `Chat history for chatId ${chatId} not found` });
  }
});

// Define an endpoint to get all chatIds
app.get("/chatIds", (req, res) => {
  const allChatIds = Object.keys(chatHistories);
  console.log(allChatIds);
  res.json({ chatIds: allChatIds });
});

// Define an endpoint to handle user messages and get completions
app.post("/sendMessage", async (req, res) => {
  const { chatId, message } = req.body;

  // Initialize chat history if not exists
  if (!chatHistories.hasOwnProperty(chatId)) {
    chatHistories[chatId] = [
      //   {
      //     role: "system",
      //     content: "Welcome to the chat!",
      //   },
    ];
  }

  // Add user message to chat history
  chatHistories[chatId].push({ role: "user", content: message });

  try {
    // Get AI assistant response
    const completion = await getCompletionFromMessages(
      chatHistories[chatId],
      "gpt-3.5-turbo-0125",
      0.7,
      150,
      "Welcome to the chat!"
    );

    // Add assistant response to chat history
    chatHistories[chatId].push({ role: "assistant", content: completion });

    // Send response to client
    res.json({
      chatHistory: chatHistories[chatId],
      assistantResponse: completion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/allChatHistory", (req, res) => {
  const allChatHistories = Object.keys(chatHistories).map((chatId) => ({
    chatId,
    messages: chatHistories[chatId],
  }));

  res.json({ chatHistories: allChatHistories });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
