import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Cliente Supabase para usar no app (componentes cliente e servidor).
 * Use nas páginas: import { supabase } from "@/lib/supabase"
 *
 * Para conectar:
 * 1. Crie um projeto em https://app.supabase.com
 * 2. Em Settings > API copie "Project URL" e "anon public"
 * 3. Crie .env.local com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
