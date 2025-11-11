# Ad Scene Generator App

A modern web application that transforms product ideas into vivid, actionable video ad concepts. Generate five detailed scenes that flow together into a perfect 60-second commercial using AI-powered scene generation.

## Features

- 🎬 **AI-Powered Scene Generation**: Create detailed ad scenes with camera angles, durations, and key beats
- 📝 **Product-Focused**: Input product name, description, and optional reference URLs
- 💾 **Concept History**: Save and revisit your generated ad concepts
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🔐 **User Authentication**: Secure authentication using Convex Auth

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Convex (serverless backend)
- **AI**: OpenAI GPT-4o-mini for scene generation
- **Authentication**: Convex Auth with Anonymous auth
- **UI Components**: Sonner (toast notifications)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Convex account (sign up at [convex.dev](https://convex.dev))
- OpenAI API key (or Convex OpenAI integration)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ad_scene_generator_app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```

4. Configure environment variables:
   - Set up your Convex deployment
   - Configure OpenAI API key in Convex dashboard (or use `CONVEX_OPENAI_API_KEY` and `CONVEX_OPENAI_BASE_URL`)

5. Start the development server:
```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Convex) servers.

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/        # React components
│   │   ├── AdSceneGenerator.tsx
│   │   ├── ConceptHistory.tsx
│   │   └── SceneCard.tsx
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── convex/                # Backend Convex functions
│   ├── adScenes.ts        # Ad scene generation logic
│   ├── auth.ts            # Authentication
│   ├── schema.ts          # Database schema
│   └── http.ts            # HTTP routes
└── package.json
```

## Usage

1. **Sign In**: Use the anonymous authentication to sign in
2. **Enter Product Details**: 
   - Product name (required)
   - Product description (required)
   - Reference URL (optional)
3. **Generate Scenes**: Click "Generate Ad Scenes" to create your 60-second ad concept
4. **View Results**: Browse through the 5 generated scenes with detailed descriptions, camera angles, and beats
5. **Save & Revisit**: Your concepts are automatically saved and can be accessed via the history feature

## Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend (Vite)
- `npm run dev:backend` - Start only the backend (Convex)
- `npm run build` - Build the frontend for production
- `npm run lint` - Run TypeScript type checking and build verification

## Authentication

This app uses [Convex Auth](https://auth.convex.dev/) with Anonymous authentication for easy sign-in. You may wish to change this to a different authentication provider before deploying to production.

## Deployment

### Frontend
Deploy the frontend to any static hosting service (Vercel, Netlify, etc.) after running `npm run build`.

### Backend
The Convex backend is automatically deployed when you run `npx convex deploy`. See the [Convex deployment docs](https://docs.convex.dev/production/) for more information.

## Environment Variables

Configure these in your Convex dashboard:
- `CONVEX_OPENAI_API_KEY` - Your OpenAI API key
- `CONVEX_OPENAI_BASE_URL` - OpenAI API base URL (optional, defaults to official API)

## License

This project is private and proprietary.

## Contributing

This is a private project. For questions or issues, please contact the repository owner.
