import axios from "axios";
export const fetchFact = async (req, res) => {
  const { transcript } = req.body;

  try {
    const url =
      "https://api.langflow.astra.datastax.com/lf/08a89bc2-4398-422a-bcfb-4955f89eb942/api/v1/run/a6458244-a682-4494-b2c2-f67932a41be1?stream=false";
    const token = process.env.LANGFLOW_API_TOKEN;
    const payload = {
      input_value: transcript,
      output_type: "fact",
      input_type: "text",
      tweaks: {
        /* Your tweaks here */
      },
    };

    // Call the LangFlow API
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.json({ fact: response.data });
  } catch (error) {
    console.error(
      "Error fetching data from API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Error fetching fact from API" });
  }
};
export const fetchSummary = async (req, res) => {
  const { transcript } = req.body;

  try {
    const url = "https://api.langflow.astra.datastax.com/lf/08a89bc2-4398-422a-bcfb-4955f89eb942/api/v1/run/f0679efb-2974-4349-a6e9-eb216ee862a8?stream=false";
    const token = process.env.LANGFLOW_API_TOKEN_SUMMARY;

    const payload = {
      input_value: transcript,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-1hM0o": {},
        "ChatOutput-W1Oiw": {},
        "Prompt-9keSa": {},
        "Prompt-ZCNBB": {},
        "GroqModel-tUziJ": {},
      },
    };

    // Call LangFlow API
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json({ summary: response.data });
  } catch (error) {
    console.error("Error fetching summary:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching summary from LangFlow API" });
  }
};
export const fetchQuiz = async (req, res) => {
  const { transcript } = req.body;

  try {
    const url = "https://api.langflow.astra.datastax.com/lf/08a89bc2-4398-422a-bcfb-4955f89eb942/api/v1/run/3b47b837-a6f4-4e57-be0a-8d45627380b5?stream=false";
    const token = process.env.LANGFLOW_API_TOKEN_QUIZ;

    const payload = {
      input_value: transcript,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-8iYrJ": {},
        "ChatOutput-WnZTV": {},
        "Prompt-wKqyU": {},
        "GroqModel-97VSD": {},
      },
    };

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json({ quiz: response.data });
  } catch (error) {
    console.error("Error fetching quiz:", error.response?.data || error.message);
    
    if (error.response?.data?.detail === "Flow identifier not found") {
      res.status(400).json({ error: "Invalid flow identifier or the flow was not found" });
    } else {
      res.status(500).json({ error: "Error fetching quiz from LangFlow API" });
    }
  }
};

