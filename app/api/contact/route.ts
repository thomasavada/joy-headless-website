import { NextResponse } from 'next/server';

const AVADA_CRM_URL = 'https://avada-crm.web.app/publicApi/sync';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(AVADA_CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_name: body.shop_name,
        email: body.email,
        phone: body.phone,
        shop_url: body.shop_url,
        monthly_orders: parseInt(body.monthly_orders) || 117,
        ref_source: body.ref_source,
        description: body.description,
        ipAddress: '111.111.111.111'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to CRM');
    }

    const data = await response.json();

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}