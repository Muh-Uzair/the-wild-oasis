import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://adblcxcghegkjycpllmw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYmxjeGNnaGVna2p5Y3BsbG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxNjMzOTksImV4cCI6MjAzNTczOTM5OX0.Q4fzeoKOXsM56969L6sNSRqzCLhgBKh9CHtzEyy3yfE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
