# Chess Frontend (Standalone)

Extracted from [code100x/chess](https://github.com/code100x/chess) monorepo. 
Monorepo packages (`@repo/store`, `@repo/ui`) are inlined into `src/_repo/`.

## Setup

1. Configure your backend URL in `src/_repo/store/atoms/user.ts`:
   ```ts
   export const BACKEND_URL = 'http://localhost:3000'; // change this
   ```

2. Configure your WebSocket URL in `src/hooks/useSocket.ts`

3. Install and run:
   ```bash
   npm install
   npm run dev
   ```

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + Radix UI
- Recoil (state management)
- chess.js (game logic)
- WebSocket (real-time moves)
