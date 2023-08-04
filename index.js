// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const cors = require('cors'); // Import the cors module

// const app = express();
// const port = 3000;

// // OpenAI API key (You should get this from OpenAI)
// const apiKey = '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';

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors()); // Use the cors middleware to enable CORS

// app.use(express.static(__dirname));

// // Handle POST request for generating content
// app.post('/generate', async (req, res) => {
//   const { category, keyword } = req.body;
//   const prompt = `Category: ${category}\nKeyword: ${keyword}\n\nGenerate content:`;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt,
//         max_tokens: 100, // Adjust the max_tokens value as per your requirement
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const generatedContent = response.data.choices[0].text;
//     res.json({ content: generatedContent });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to generate content. Please try again later.' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// OpenAI API key (You should get this from OpenAI)
const apiKey = process.env.chatApiKey;

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  const { category, keyword } = req.body;
  const prompt = `Category: ${category}\nKeyword: ${keyword}\n\nGenerate content:`;

  try {
    const chat_completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const generatedContent = chat_completion.data.choices[0].message.content;
    res.json({ content: generatedContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate content. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running`);
});
