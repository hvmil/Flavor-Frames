
![App Screenshot](https://i.ibb.co/1m9YRWT/Screenshot-2024-02-25-at-4-49-07-PM.png)


## Features

- Ingredient Recognition: Simply upload an image of your available ingredients, and let OpenAI GPT4 Vision analyze and recognize them.
- AI-Powered Recipe Suggestions: Based on the ingredients identified, GPT4 suggests a unique recipe, including a list of ingredients and step-by-step cooking instructions.
- User-Friendly Interface: This UI makes uploading an image a breeze, simply drag and drop then hit submit.




## Technical Overview

- **Framework**: Built with React.
- **AI Integration**: Uses OpenAI's GPT-4 model for image recognition and recipe generation
- **State Management**: Utilizes React's `useState` and `useEffect` hooks for state management.
- **Cloudinary API**: to upload images and extract URL for GPT4 Vision queries



## Demo

![](https://i.giphy.com/02p42MiXWBnUWeB5nK.webp)

## Installation

1. Clone the repository

```bash
  git clone <repository-url> 
```
2. Install dependencies:
```bash
  npm install

```
3. Set up the OpenAI API and Cloudinary API Key in your environment variables:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key_here
```
4. Run the application:
```
npm start
```
    
## Usage/Examples

- To submit an image, simply drag and drop a picture of ingredients and press "Submit".
- The application will display AI-generated feedback based on the provided image.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://cs.newpaltz.edu/~dimapanh1/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hamil-dimapanat-1b6057167/)


## License

[MIT](https://choosealicense.com/licenses/mit/)

