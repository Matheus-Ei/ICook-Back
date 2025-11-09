# ICook - Backend

ICook is a comprehensive recipe management application that allows users to create, share, and discover recipes. The backend is built using Node.js and Express, with PostgreSQL as the database. This document provides an overview of the setup instructions, and key features.

# Setup instructions
1. **Clone the repository**:
   ```bash
   git clone
   ```

2. **Navigate to the project directory**:
   ```bash
   cd ICook-Back
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up the PostgreSQL database**:
   ```shell
   docker compose up -d
   ```

5. **Run database migrations and seeders**:
   ```bash
   npm run migrate
   npm run seed
   ```

6. **Start the server**:
   ```bash
   npm run dev
   ```
  The server will run on `http://localhost:5000` by default.
