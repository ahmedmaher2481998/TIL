import type { Database } from "./database.types";
import { createClient } from "@supabase/supabase-js";
const { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } = import.meta.env
const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase
