# Kenneth Heckeroth - Art Portfolio Website

This is the official repository for the personal art portfolio website of Kenneth Heckeroth.

**Live Site:** `[kheckeroth.com]`

## Core Technologies

* **Framework:** [React.js](https://reactjs.org/)
* **UI Components:** [Material-UI (MUI)](https://mui.com/)
* **Asset Hosting:** [Google Cloud Storage](https://cloud.google.com/storage)
* **Deployment:** [GitHub Pages / Netlify / Vercel] (Update with your provider)

## Getting Started & Local Development

To run this project on your local machine, follow these steps.

### Prerequisites

* Node.js (v16 or later recommended)
* npm (Node Package Manager)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/kheckeroth/dot-com.git](https://github.com/kheckeroth/dot-com.git)
    cd your-repository-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm start
    ```
    This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes, and you will see any lint errors in the console.

## Asset Management: Images & Videos

**Important:** To keep the repository lightweight and ensure fast load times, all media assets (images, videos, etc.) are **not** stored in this Git repository. All assets are hosted on **Google Cloud Storage**.

To add or update a media file for the website, follow this process:

1.  **Upload to Google Cloud Storage:** Upload the new image or video file to the designated project bucket on the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Set Public Access:** Ensure the file is publicly accessible. This is typically done by setting the entire bucket's permissions to allow `allUsers` the role of `Storage Object Viewer`.
3.  **Use the Public URL:** Once uploaded and public, copy the "Public URL" for the asset (e.g., `https://storage.googleapis.com/your-bucket-name/your-file-name.jpg`) and use this URL directly in the React code.

## Deployment

This project is configured for **Continuous Deployment**.

**Pushing changes to the `main` branch will automatically trigger a build process and deploy the updated site live to the production domain.**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

