# Mellon: Social Media Scheduling Tool

Mellon is an open-source web application designed to help content creators, agencies, freelancers, digital marketers, and everyday individuals schedule and manage social media posts. With Mellon, you can effortlessly create and schedule posts for platforms like X (formerly Twitter), LinkedIn, Facebook, Bluesky, and more.

---

## Features

- **Multi-platform Support**: Schedule posts for multiple social media platforms from one interface.
- **Unlimited Scheduling**: Create and schedule as many posts as you need.
- **Future Planning**: Schedule posts for later in the day or even weeks/months into the future.
- **User-friendly Interface**: Easy-to-navigate UI for seamless scheduling.
- **Open Source**: Customize and contribute to Mellon.

---

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (Located in `apps/mellon`)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Framework**: [Express.js](https://expressjs.com/) (Located in `apps/mellon-backend`)
- **Deployment**: [Render](https://render.com/)

### Monorepo
- **Tool**: [Turborepo](https://turbo.build/repo)

---

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm, Yarn, or pnpm
- A Render and Vercel account (for deployment)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mellon.git
   cd mellon
   ```

2. **Install dependencies**:
   ```bash
   # Using npm
   npm install
   
   # Using Yarn
   yarn install
   
   # Using pnpm
   pnpm install
   ```

3. **Set up environment variables**:
   - Create `.env` files in both `apps/mellon` and `apps/mellon-backend`.
   - Add necessary API keys and configurations for the platforms you intend to support (e.g., Twitter API, LinkedIn API).

4. **Start the development server**:
   ```bash
   # Start the frontend
   cd apps/mellon
   
   # Using npm
   npm run dev
   
   # Using Yarn
   yarn dev
   
   # Using pnpm
   pnpm dev

   # Start the backend
   cd ../mellon-backend
   
   # Using npm
   npm run dev
   
   # Using Yarn
   yarn dev
   
   # Using pnpm
   pnpm dev
   ```

5. **Access the app**:
   Open your browser and navigate to `http://localhost:3000` for the frontend.

---

## Deployment

### Frontend
1. Push the `apps/mellon` directory to a GitHub repository.
2. Connect the repository to your Vercel account.
3. Configure the necessary environment variables on Vercel.

### Backend
1. Push the `apps/mellon-backend` directory to a GitHub repository.
2. Connect the repository to your Render account.
3. Configure the necessary environment variables on Render.

---

## Contributing

We welcome contributions from the community! Here's how you can get involved:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.

---

## License

Mellon is open-source software licensed under the [MIT License](./LICENSE).

---

## Acknowledgments

Thank you to the open-source community and the developers of Next.js, Express, Turborepo, Vercel, and Render for making tools that enable projects like Mellon.

