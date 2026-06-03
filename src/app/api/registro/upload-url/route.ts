import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function POST(req: Request) {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) return new Response("No autorizado", { status: 401 });

  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  const userId = payload.id as string;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
  const response = await fetch(`${supabaseUrl}/storage/v1/object/upload/sign/profile-images/${userId}/avatar.png`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  });

  const data = await response.json();
  return Response.json({ signedUrl: data.signedUrl });
}