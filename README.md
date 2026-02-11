# 🎬 Movie Discovery App

<div align="center">

![Movie Discovery App](public/images/movie-discovery-app-logo.png)

**A modern, responsive movie browsing application built with Next.js 16+, TypeScript, and Tailwind CSS**

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

Movie Discovery App is a feature-rich web application that allows users to explore, search, and organize movies. Powered by The Movie Database (TMDB) API, it provides a seamless experience for discovering new movies, managing watchlists, and tracking viewing history.

### Why This Project?

- **Modern Stack**: Built with the latest web technologies (Next.js 15, React 19, TypeScript)
- **Performance-First**: Optimized for speed with server-side rendering, image optimization, and efficient caching
- **User Experience**: Intuitive interface with dark/light mode, responsive design, and smooth animations
- **Real-World Application**: Production-ready code with proper error handling, testing, and deployment strategies

---

## ✨ Features

### Core Features

- 🎥 **Browse Movies**: Explore top-rated and popular movies
- 🔍 **Advanced Search**: Real-time search with debouncing and pagination
- 🎭 **Genre Filtering**: Browse movies by genre with multiple sorting options
- 📄 **Movie Details**: Comprehensive movie information including cast, crew, and similar movies
- 🔖 **Watch Later**: Save movies for later viewing with persistent storage
- 🕐 **Recently Viewed**: Automatic tracking of browsing history

### Enhanced Features

- 🌓 **Dark/Light Mode**: Toggle between themes with system preference support
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- ⚡ **Performance**: Image optimization, lazy loading, and efficient caching
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- ♿ **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- 🔐 **SEO Optimized**: Dynamic meta tags, Open Graph support, and sitemap

---

## 🎯 Demo

### Live Demo

Visit the live application: [Movie Discovery App](#) _(https://movie-discovery-apps.vercel.app/)_

### Screenshots

<details>
<summary>View Screenshots</summary>

#### Home Page

![Home Page](https://i.ibb.co.com/RkQW5TXg/home.png)

#### Movie Details

![Movie Details](https://i.ibb.co.com/mCMb7y1Z/movie-details.png)

#### Search Results

![Search Results](https://i.ibb.co.com/sJ6d8Yv9/search.png)

#### Genre Browsing

![Genre Browsing](https://i.ibb.co.com/sp0KT7sN/genre.png)

</details>

---

## 🛠 Tech Stack

### Frontend

| Technology                                                | Version | Purpose                      |
| --------------------------------------------------------- | ------- | ---------------------------- |
| [Next.js](https://nextjs.org/)                            | 16.1.6  | React framework with SSR/SSG |
| [React](https://react.dev/)                               | 19.2.3  | UI library                   |
| [TypeScript](https://www.typescriptlang.org/)             | 5.9.3   | Type safety                  |
| [Tailwind CSS](https://tailwindcss.com/)                  | 4.1.18  | Utility-first CSS            |
| [Lucide React](https://lucide.dev/)                       | 0.563.0 | Icon library                 |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6   | Theme management             |

### Development Tools

| Tool                                            | Purpose            |
| ----------------------------------------------- | ------------------ |
| [ESLint](https://eslint.org/)                   | Code linting       |
| [Vitest](https://vitest.dev/)                   | Unit testing       |
| [Testing Library](https://testing-library.com/) | Component testing  |
| [PNPM](https://pnpm.io/)                        | Package management |
| [Docker](https://www.docker.com/)               | Containerization   |

### External APIs

- **TMDB API v3**: Movie data, images, and metadata
  - [API Documentation](https://developers.themoviedb.org/3)
  - [Get API Key](https://www.themoviedb.org/settings/api)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 24.0.0 ([Download](https://nodejs.org/))
- **PNPM** >= 8.0.0 ([Install Guide](https://pnpm.io/installation))
- **TMDB API Key** ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

#### Option 1: Standard Installation

```bash
# 1. Clone the repository
git clone https://github.com/rasel739/inpygekdaq.git
cd movie-discovery-app

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Add your TMDB API key to .env.local
# TMDB_API_KEY=your_api_key_here

# 5. Run the development server
pnpm dev
```

#### Option 2: Docker Installation

```bash
# 1. Clone the repository
git clone https://github.com/rasel739/inpygekdaq.git
cd movie-discovery-app

# 2. Set up environment variables
cp .env.example .env.local

# 3. Build and run with Docker

docker build -t mda .


docker run -p 3000:3000 mda:latest



# The app will be available at http://localhost:3000
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# TMDB API Configuration
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3

# Image Configuration
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

```

#### Getting a TMDB API Key

1. Create an account at [TMDB](https://www.themoviedb.org/signup)
2. Go to [Settings > API](https://www.themoviedb.org/settings/api)
3. Request an API key (free for non-commercial use)
4. Copy your API key to `.env.local`

---

## 📁 Project Structure

```
movie-discovery-app/
├── public/                      # Static assets
│   ├── images/                 # Images and icons
│   └── *.svg                   # SVG icons
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── search/        # Search endpoint
│   │   ├── genre/[id]/        # Genre pages
│   │   ├── movie/[id]/        # Movie details pages
│   │   ├── recently-viewed/   # Recently viewed page
│   │   ├── search/            # Search page
│   │   ├── watch-later/       # Watch later page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading state
│   │   ├── error.tsx          # Error boundary
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── forms/             # Form components
│   │   ├── home/              # Home page components
│   │   ├── layouts/           # Layout components
│   │   ├── movie/             # Movie-related components
│   │   ├── shared/            # Shared components
│   │   └── ui/                # UI components
│   ├── constants/             # App constants
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and providers
│   ├── reducers/              # State reducers
│   ├── services/              # API services
│   ├── styles/                # Global styles
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── .env.local                 # Environment variables (create this)
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose setup
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies
├── pnpm-lock.yaml           # Lock file
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vitest.config.ts         # Vitest configuration
└── README.md                # This file
```

### Key Directories

- **`/app`**: Next.js 16+ App Router with file-based routing
- **`/components`**: Reusable React components organized by feature
- **`/services`**: API integration and data fetching logic
- **`/hooks`**: Custom React hooks for common patterns
- **`/lib`**: Context providers and utility libraries
- **`/types`**: TypeScript type definitions

---

## 🏗 Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
├─────────────────────────────────────────────────────────┤
│                     Next.js App                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │           App Router (SSR/SSG)                   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │           React Components                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────┐  │  │
│  │  │  Home Page │  │  Genre Page │  │  Search   │  │  │
│  │  └────────────┘  └────────────┘  └───────────┘  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │         Context Providers                         │  │
│  │  ┌──────────────┐  ┌──────────────┐             │  │
│  │  │ Theme Context │  │ Movie Context │             │  │
│  │  └──────────────┘  └──────────────┘             │  │
│  ├──────────────────────────────────────────────────┤  │
│  │              Local Storage                        │  │
│  │  ┌──────────────┐  ┌──────────────┐             │  │
│  │  │ Watch Later  │  │Recently Viewed│             │  │
│  │  └──────────────┘  └──────────────┘             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     API Layer                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Next.js API Routes                        │  │
│  │  ┌────────────┐                                   │  │
│  │  │   Search   │                                   │  │
│  │  └────────────┘                                   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │              TMDB Service                         │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐             │  │
│  │  │ Movies │  │ Genres │  │ Search │             │  │
│  │  └────────┘  └────────┘  └────────┘             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   External APIs                          │
│                   TMDB API v3                           │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Interaction**: User interacts with the UI
2. **Component State**: React components manage local state
3. **Context/Hooks**: Shared state via Context API and custom hooks
4. **API Layer**: Server-side data fetching via Next.js API routes
5. **External API**: TMDB API provides movie data
6. **Client Storage**: LocalStorage for persistent data

### State Management

- **React Context**: Global state for theme and movie lists
- **URL State**: Search params and pagination in URL
- **Local Storage**: Persistent storage for watch later and recently viewed
- **Server State**: Data fetching with Next.js built-in caching

---

## 📡 API Documentation

### Internal API Routes

#### Search Movies

```typescript
GET /api/search

Query Parameters:
- q: string (required) - Search query
- page: number (optional) - Page number (default: 1)

Response:
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### TMDB Service Methods

```typescript
// Get movie genres
getGenres(): Promise<Genre[]>

// Get top rated movies
getTopRatedMovies(page?: number): Promise<PaginatedResponse<Movie>>

// Discover movies by genre
discoverMoviesByGenre(
  genreId: number,
  page?: number,
  sortBy?: SortOption
): Promise<PaginatedResponse<Movie>>

// Get movie details
getMovieDetails(movieId: number): Promise<MovieWithCredits>

// Get similar movies
getSimilarMovies(movieId: number, page?: number): Promise<PaginatedResponse<Movie>>

// Search movies
searchMovies(query: string, page?: number): Promise<PaginatedResponse<Movie>>
```

### Error Handling

All API calls include comprehensive error handling:

```typescript
class TMDBError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'TMDBError';
  }
}
```

---

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:watch       # Run tests in watch mode

# Docker
docker-compose up     # Start with Docker
docker-compose down   # Stop Docker containers
```

### Development Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following the project structure
   - Add tests for new features
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   pnpm lint          # Check code style
   pnpm test          # Run tests
   pnpm build         # Ensure build succeeds
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **Naming**:
  - Components: PascalCase (e.g., `MovieCard.tsx`)
  - Files: kebab-case (e.g., `movie-card.tsx`)
  - Constants: UPPER_SNAKE_CASE
- **Imports**: Absolute paths using `@/` alias
- **Comments**: JSDoc for complex functions

---

## 🧪 Testing

### Test Structure

```
src/
└── __tests__/
    ├── components/
    ├── hooks/
    ├── services/
    └── utils/
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieCard from '@/components/ui/movie-card';

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      poster_path: '/test.jpg',
      vote_average: 8.5,
      release_date: '2024-01-01',
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Configure Environment**
   ```env
   TMDB_API_KEY=your_api_key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

### Docker Deployment

```bash
# Build image
docker build -t movie-discovery-app .

# Run container
docker run -p 3000:3000 \
  -e TMDB_API_KEY=your_key \
  movie-discovery-app
```

### Other Platforms

- **Netlify**: Use Next.js plugin
- **Railway**: One-click deployment
- **AWS**: Use AWS Amplify or EC2

---

## ⚡ Performance

### Optimization Strategies

1. **Image Optimization**
   - Next.js Image component with automatic optimization
   - Responsive images with proper sizing
   - Lazy loading for off-screen images

2. **Code Splitting**
   - Route-based code splitting
   - Dynamic imports for heavy components
   - Tree shaking for unused code

3. **Caching**
   - Server-side caching with revalidation
   - Client-side caching with SWR pattern
   - Browser caching for static assets

4. **Performance Metrics**
   - Lighthouse score: 95+
   - First Contentful Paint: < 1.5s
   - Time to Interactive: < 3.5s

### Bundle Size

```
Route                        Size      First Load JS
┌ ○ /                        5.2 kB    95.3 kB
├ ○ /genre/[id]              3.8 kB    93.9 kB
├ ○ /movie/[id]              4.1 kB    94.2 kB
├ ○ /recently-viewed         2.9 kB    92.0 kB
├ ○ /search                  3.5 kB    93.6 kB
└ ○ /watch-later            2.8 kB    91.9 kB
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### How to Contribute

1. **Fork the Repository**

2. **Create a Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow code style guidelines
   - Add tests for new features
   - Update documentation

4. **Commit Your Changes**

   ```bash
   git commit -m 'feat: add amazing feature'
   ```

5. **Push to Branch**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Maintenance tasks

## 📄 License

MIT

### Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TMDB](https://www.themoviedb.org/) - Movie database API
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Special Thanks

- The TMDB team for providing an excellent API
- The Next.js team for an amazing framework

### Frequently Asked Questions

<details>
<summary>How do I get a TMDB API key?</summary>

1. Create an account at [TMDB](https://www.themoviedb.org/signup)
2. Go to Settings > API
3. Request an API key (free for non-commercial use)
4. Copy the key to your `.env.local` file
</details>

<details>
<summary>Why are images not loading?</summary>

Ensure you have set the `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` environment variable correctly:

```env
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

</details>

<details>
<summary>How do I deploy to production?</summary>

See the [Deployment](#deployment) section for detailed instructions.

</details>

---

<div align="center">

**Made with by Rasel Hossain**

[⬆ Back to Top](#-movie-discovery-app)

</div>
