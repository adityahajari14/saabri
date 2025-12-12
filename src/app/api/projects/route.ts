import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://tm-backend-qfaf.onrender.com/api/projects';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';

    // Get the request body (filters)
    const body = await request.json();

    // Build the URL with query parameters
    const url = new URL(API_BASE_URL);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);

    // Forward the request to the backend API
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error:', response.status, errorText);
      return NextResponse.json(
        { 
          success: false, 
          message: `API error: ${response.status} ${response.statusText}`,
          data: [],
          error: errorText 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch properties',
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

