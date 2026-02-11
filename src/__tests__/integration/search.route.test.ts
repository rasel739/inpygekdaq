import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/search/route';
import { NextRequest } from 'next/server';

const createSearchRequest = (query?: string, page?: string) => {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (page) params.set('page', page);

  return new NextRequest(`http://localhost:3000/api/search?${params.toString()}`);
};

describe('/api/search Route Handler', () => {
  it('returns 400 when query parameter is missing', async () => {
    const request = createSearchRequest();
    const response = await GET(request);

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Query parameter is required');
  });

  it('returns real search results for a valid query', async () => {
    const request = createSearchRequest('Inception');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('results');
    expect(body).toHaveProperty('page');
    expect(body).toHaveProperty('total_pages');
    expect(body).toHaveProperty('total_results');
    expect(body.results.length).toBeGreaterThan(0);

    const titles = body.results.map((m: { title: string }) => m.title.toLowerCase());
    expect(titles.some((t: string) => t.includes('inception'))).toBe(true);
  });

  it('supports the page parameter', async () => {
    const request = createSearchRequest('the', '2');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(2);
  });

  it('returns empty results for a nonsensical query', async () => {
    const request = createSearchRequest('xyznonexistent12345abc');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.results.length).toBe(0);
  });
});
