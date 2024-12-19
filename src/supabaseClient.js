// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pkibkhelrihzgohrlrrz.supabase.co";
const supabaseAnonKey =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraWJraGVscmloemdvaHJscnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDc0MDQsImV4cCI6MjA0OTM4MzQwNH0.AsqILxO0lHdqp-oKKnlcMkzUSvUn8scmmHkY988KCEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

 
