# Collaborative Comments with Velt and Auth0

A minimal example that shows how to add real-time collaboration—Figma-style comments, live cursors, and user presence—to a React app using Velt. Auth0 handles authentication, while Velt manages the collaboration layer.

You can [check out its demo on YouTube](https://youtu.be/_-nZDj-y8Yw?si=ewExjiKHcSx3mn2G).

## Tech Stack

- **Framework**: React with Vite and TypeScript
- **Routing**: TanStack Router
- **Auth**: Auth0 SDK for login and user identity
- **Collaboration**: Velt SDK for comments, presence, and identity
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Velt account ([velt.dev](https://velt.dev))
- An Auth0 tenant ([auth0.com](https://auth0.com))

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Studio1HQ/velt-auth0.git
cd velt-auth0
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root and add the following:

```env
VITE_VELT_API_KEY=your_velt_api_key
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```

4. Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173` to try it out.

## Project Structure

```
src/
├── components/
│   ├── AuthButtons.tsx
│   ├── CommentDemo.tsx
│   └── VeltProviderWithAuth.tsx
├── pages/
│   └── index.tsx
├── routes/
│   └── root.tsx
├── main.tsx
└── vite-env.d.ts
```

## How It Works

- **Auth0** manages authentication. Logged-in users are identified with `useAuth0()`.
- **VeltProvider** is wrapped with user identity from Auth0.
- **VeltCursor** and **VeltPresence** enable live cursors and user presence.
- **VeltCommentTool** enables comment threads tied to UI elements.

## Commenting Features

- Toggle the comment tool using the floating button
- Leave comments on any UI element (like cards or buttons)
- See teammates' cursors and comment threads in real time
- All interactions sync instantly, with built-in user avatars and names
