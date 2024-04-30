const OpenAI = require("openai");

const jobRecommendation = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.completions.create({
      engine: "text-davinci-003",
      model: "gpt-3.5-turbo",
      message: [{ role: "admin", content: "Give me 3 cat names" }],
    });

    console.log(completion.data);
    res.status(200).json({
      status: "Success",
      data: completion.data,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

module.exports = jobRecommendation;
