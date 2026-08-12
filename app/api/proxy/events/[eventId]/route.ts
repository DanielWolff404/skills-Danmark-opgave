import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ eventId: string }>;
};

const eventsEndpoint =
  'http://mb3.web.videndjurs.dk/skillscompetition/api.php/events';

export async function PUT(request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const body = await request.text();

  try {
    const response = await fetch(`${eventsEndpoint}/${encodeURIComponent(eventId)}`, {
      method: 'PUT',
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
    const message = error instanceof Error ? error.message : 'Could not reach events API.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
