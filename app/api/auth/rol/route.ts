import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ rol: null, autenticado: false })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const authHeader = request.headers.get('Authorization')

  if (!authHeader) {
    return NextResponse.json({ rol: null, autenticado: false })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return NextResponse.json({ rol: null, autenticado: false })
  }

  const { data: perfil } = await supabase
    .from('profiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  return NextResponse.json({
    rol: perfil?.rol ?? 'cliente',
    autenticado: true,
    email: user.email
  })
}
