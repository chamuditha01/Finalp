import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    process.env.REACT_APP_SUPERBASE_URL,
   process.env.REACT_APP_SUPERBASE_ANON_KEY
);