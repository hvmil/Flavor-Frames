import { useState, useCallback } from "react";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import { useDropzone } from "react-dropzone";
import "./App.css";
import { recipe } from "./recipe";
const App = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = new FileReader();
    file.onload = () => {
      setPreview(file.result);
      setFileUploaded(true);
    };
    console.log(acceptedFiles[0]);
    file.readAsDataURL(acceptedFiles[0]);

  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const fetchUIResponse = async (imageUrl) => {
    setIsLoading(true);
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "You are a professional chef. Based on the ingredients in the picture, suggest a dish that I can make. List ingredients with (-) and instructions with numbers (ex: 1. 2. 3.)",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1500,
      });
      if (
        result &&
        result.choices &&
        result.choices.length > 0 &&
        result.choices[0].message
      ) {
        setResponse(result.choices[0].message.content);
        setImageUrl("");
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (typeof acceptedFiles[0] === "undefined") return;
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "tde7u3xk");
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dvr6suq9d/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    console.log(results);
    fetchUIResponse(results.secure_url);
  };
  return (
    <div>
      <div className="head">
        <h3 className="header">Flavor Frames</h3>
        <div className="description-box">
          <div></div>
          <div>
            <h5 className="description">
              A web application that leverages the power of OpenAI GPT-4 Vision
              to transform images of ingredients into creative and delicious
              recipes. Whether you're a professional chef seeking inspiration or
              a home cook looking to explore new culinary horizons, Flavor
              Frames is designed to spark your imagination and guide you through
              the art of cooking with AI.
            </h5>
          </div>
          <div></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {!fileUploaded && (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className="drop-text">Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        )}
        <img src={preview} alt="" />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : response ? (
        <div className="feedback-container">
          <h3 className="ai-feedback">My Feedback:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : null}
    </div>
  );
};

export default App;
