# Settings Management System

A full-stack MERN application for managing configuration settings, built with Docker for easy deployment and consistency.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Infrastructure**: Docker & Docker Compose

## How to Run

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/sreenand4/Sree-DTwo-Technical-Assessment-Implementation.git
    cd Sree-DTwo-Technical-Assesment
    ```

2.  **Start the application**:
    Run the following command in the root directory:
    ```bash
    docker-compose up --build
    ```
    *This will build the images, install dependencies, and start all services.*

3.  **Access the App**:
    Open your browser and navigate to:
    [http://localhost:5173](http://localhost:5173)

## Usage Guide

### 1. Create a Setting
- If the database is empty, you will see the **Landing Page**.
- Enter a name (e.g., `Dark Mode Config`) and click **Create**.
- This will automatically create the setting, open the **Dashboard**, and enter **Edit Mode**.

### 2. Edit Configuration
- In the Dashboard, the newly created setting is selected.
- You will see a text editor. Enter valid JSON, for example:
    ```json
    {
      "theme": "dark",
      "notifications": true,
      "retryCount": 5
    }
    ```
- Click **Save**. The configuration is now stored in MongoDB.

### 3. Create More Settings
- Click the **"+ Create New"** button at the top of the sidebar.
- Enter a name and click Create.
- The new setting appears at the top of the list (sorted by newest).

### 4. Delete a Setting
- Select a setting from the sidebar.
- Click the **Delete** button (Red) in the top-right corner.
- **Note**: If you delete the last remaining setting, the application will automatically return to the Landing Page.

## Troubleshooting

- If you feel like something broke and want to restart, strictly run:
    ```bash
    docker-compose down -v
    docker-compose up --build
    ```
    *The `-v` flag clears the MongoDB volume to ensure a fresh state.*

- **Ports already in use**: Ensure ports `3000`, `5173`, and `27017` are free on your machine before running.
