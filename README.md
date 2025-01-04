# Mellon: Social Media Scheduler

Mellon helps schedule social media posts for platforms like X, LinkedIn, Facebook, Bluesky, and more. Designed for content creators, agencies, freelancers, and anyone managing social media.

---

## Features

- Schedule posts for multiple platforms.
- Unlimited post scheduling.
- Simple, user-friendly interface.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (in `apps/mellon`)
- **Backend**: [Express.js](https://expressjs.com/) (in `apps/mellon-backend`)
- **Monorepo**: [Turborepo](https://turbo.build/repo)
- **Deployment**: Vercel (frontend), Render (backend)

---

## Setup

### Prerequisites
- Node.js (v16+)
- npm, Yarn, or pnpm

### Steps

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/mellon.git
   cd mellon
   ```
2. Install dependencies:
   ```bash
   # With npm
   npm install
   
   # With Yarn
   yarn install
   
   # With pnpm
   pnpm install
   ```
3. Add environment variables:
   - Create `.env` in `apps/mellon` and `apps/mellon-backend`.
   - Add API keys and configs for platforms.
4. Start the app:
   ```bash
   # Frontend
   cd apps/mellon && npm run dev
   
   # Backend
   cd ../mellon-backend && npm run dev
   ```
5. Open `http://localhost:3000`.

---

## Deployment

- **Frontend**: Deploy `apps/mellon` on [Vercel](https://vercel.com/).
- **Backend**: Deploy `apps/mellon-backend` on [Render](https://render.com/).

---

## Contributing

1. Fork the repo.
2. Create a branch.
3. Submit a pull request.

---

## License

MIT License. See [LICENSE](./LICENSE).


## Acknowledgments

Thank you to the open-source community and the developers of Next.js, Express, Turborepo, Vercel, and Render for making tools that enable projects like Mellon.

