import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backend_url } from '../../config/config';

export async function GET(request: NextRequest) {
  // 从 HttpOnly Cookie 中获取 token
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  //console.log(token)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const workspaceId = request.headers.get("workspace_id")
  //return NextResponse.json({cookie: token }, { status: 200 });
  const response = await fetch((backend_url+ "/api/projects/"+ workspaceId), {
    method: 'GET',
    headers: {
      'Authorization': ('Bearer '+token)
    },
    credentials:'include',  // Include credentials if needed
    //cache: "force-cache",
  })

  if(!response.ok){
    return NextResponse.json({message: "failed to get info from backend"}, { status: 401 })
  }
  const result = await response.json()
  //console.log(result.data)
  if(result.response_key != "SUCCESS"){
    return NextResponse.json({message: "failed to get info from backend"}, { status: 401 })
  }
  if (!result.data){
    return NextResponse.json({message: "failed to get info from backend"}, { status: 401 })
  }
  //console.log(result.data)
  return NextResponse.json(result.data, { status: 200 }) 
}