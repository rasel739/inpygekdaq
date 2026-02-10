# Movie Discovery App

A responsive movie browsing application built with Next.js, TypeScript, and Tailwind CSS, powered by The Movie Database (TMDB) API.

## Features

### Core Features

- **Home Page**: Top rated movies, popular movies per genre, genre browsing
- **Genre Page**: Movies by genre with sorting options (popularity, release date, rating, title)
- **Movie Details**: Poster, overview, rating, runtime, cast list, and similar movies
- **Recently Viewed**: Automatically tracks your browsing history
- **Watch Later**: Save movies to watch later with a single click
- **Search**: Search movies by title with real-time results

### Bonus Features

- **Dark/Light Mode**: Toggle between themes
- **SEO Optimization**: Dynamic meta tags, Open Graph support
- **Responsive Design**: Mobile, tablet, and desktop support
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error states with retry options

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **API**: TMDB API v3
- **State Management**: React Context + localStorage

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm
- TMDB API Key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd movie-discovery
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file with your TMDB API key:

```env
TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── genre/[id]/        # Genre page
│   ├── movie/[id]/        # Movie details page
│   ├── recently-viewed/   # Recently viewed page
│   ├── search/            # Search page
│   └── watch-later/       # Watch later page
├── components/
│   ├── layout/            # Header, Footer, ThemeToggle
│   └── ui/                # MovieCard, MovieGrid, Skeleton, etc.
├── lib/               # React Context providers
├── hooks/                 # Custom hooks
├── services/              # TMDB API service
├── types/                 # TypeScript interfaces
└── utils/                 # Helper utilities
```

## API Endpoints Used

- `GET /genre/movie/list` - Get genre list
- `GET /movie/top_rated` - Get top rated movies
- `GET /discover/movie` - Discover movies with filters
- `GET /movie/{id}` - Get movie details
- `GET /movie/{id}/similar` - Get similar movies
- `GET /search/movie` - Search movies

## Environment Variables

| Variable                          | Description         | Required |
| --------------------------------- | ------------------- | -------- |
| `TMDB_API_KEY`                    | Your TMDB API key   | Yes      |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` | TMDB image base URL | Yes      |

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment

The app can be deployed to Vercel, Netlify, or any platform supporting Next.js:

```bash
pnpm build
```

## License

MIT

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for the movie data API
- [Next.js](https://nextjs.org/) for the framework
