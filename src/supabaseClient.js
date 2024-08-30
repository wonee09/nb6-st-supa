import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zymjvrcnqoymmwcujzfu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bWp2cmNucW95bW13Y3VqemZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDk3ODEyMywiZXhwIjoyMDQwNTU0MTIzfQ.JlRjA1Yav3hGTUNV98w8yjmLIC-ZR8_J2q7eHV5oXFc";

export const supabase = createClient(supabaseUrl, supabaseKey);
