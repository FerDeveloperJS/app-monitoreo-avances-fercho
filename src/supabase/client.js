import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vglsfhxerxpobosjovhw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnbHNmaHhlcnhwb2Jvc2pvdmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDk0MDYsImV4cCI6MjA5MzYyNTQwNn0.gazEQ-8cCXhBLu-Xnrk0XC394I2wuhqSAAhKRUNBBdM";

export const supabase = createClient(supabaseUrl, supabaseKey);
