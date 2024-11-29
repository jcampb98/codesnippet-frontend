# codesnippet-frontend

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Acknowledgments](#acknowledgments)

# 1. Overview

This project is a Full-Stack side project that I have built which is it's main purpose is to allow other developers to store/share with other developers their Code Snippets to help for less clutter in Slack/Microsoft Teams and help with productivity. The Front-End of the Application is built entirely in React.js and TypeScript and makes use of a 3rd Party API to display the Code Snippets and the rest of the application communicates to a RESTful PHP Laravel API as the back-end.

# 2. Installation

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Steps
To set up the project locally follow these steps:

1. Clone the repository:

``` git
git clone https://github.com/jcampb98/codesnippet-frontend.git
```

2. Navigate to the project directory:

```npm
cd codesnippet-frontend
```

3. Install dependencies:

```npm
npm install
```

4. Start the server:

```npm
npx vite --port=PORT
```
# 3. Tech Stack

- React.js
- TypeScript
- Axios
- Tailwind CSS
- Vite
- Highlight.js

# 4. Usage

1. Open the application in your browser.
2. Navigate to "/" in order to view the landing page
3. In order to create/view/edit code snippets you need to create an account by clicking on the register button then register with the details.
4. Then you would be redirected to the login page and re-enter the details Then you are going to be re-directed to the dashboard page.

# 5. Future Improvements

- Planning to deploy this application to vercel once the API is deployed to DigitalOcean as a droplet.
- I am planning to include a feature that would allow developer teams to view their code snippets as a shared collection instead of individually.
- Also planning to let developers share their code snippet on the website to a dedicated page for code reviews to let other developers comment and offer feedback on code snippets to help improve it.

# 6. Acknowledgments

- Highlight.js (https://highlightjs.org/) which inspired to develop this project.