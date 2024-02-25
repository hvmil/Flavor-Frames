import { useState, useEffect } from "react";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import "./App.css";


const App = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const fetchUIResponse = async () => {
    setIsLoading(true);
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "You are a professional chef. Based on the ingredients in the picture, suggest a dish that I can make. List ingredients with (-) and instructions with numbers (ex: 1. 2. 3.)" },
              {
                type: "image_url",
                image_url: {
                  "url": imageUrl,
                },
              },
            ],
          },
        ],
        "max_tokens": 1500
      });
      if (result && result.choices && result.choices.length > 0 && result.choices[0].message) {
        setResponse(result.choices[0].message.content);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLinkChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUIResponse();
    setImageUrl('')
  };

  return (
    <div>
      <div>
      <h3 className="header">Hi! UI Expert Here</h3>

      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageLinkChange}
          placeholder="Paste the image link here"
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : response ? (
        <div className="feedback-container">
          <h3 className="ai-feedback">My Feedback:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : (

        <p className="no-response">No response received.</p>
      )}
    </div>
  );
};

export default App;
