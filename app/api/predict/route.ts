export async function POST(request: Request) {
  try {
    const { input: {image} } = await request.json();

    const response = await fetch('http://localhost:5000/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: { image } })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prediction');
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    // Handle errors and send an appropriate response
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}