import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ resource: string }>;
};

const apiBase = 'http://mb3.web.videndjurs.dk/skillscompetition/api.php';
const allowedResources = new Set(['classes', 'teams', 'events', 'schools', 'results']);

export async function POST(request: Request, context: RouteContext) {
  const { resource } = await context.params;

  if (!allowedResources.has(resource)) {
    return NextResponse.json({ error: 'Unsupported API resource.' }, { status: 404 });
  }

  const body = await request.text();

  try {
    const response = await fetch(`${apiBase}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        Accept: 'application/json',
      },
      body,
      cache: 'no-store',
    });

    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not reach competition API.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
