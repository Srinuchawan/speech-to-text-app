// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// ✅ Put your URL and anon key inside quotes!
const supabaseUrl = "https://urqqbkugcdgnulenqewa.supabase.co"; // from Supabase
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVycXFia3VnY2RnbnVsZW5xZXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzMyNTMsImV4cCI6MjA4NTUwOTI1M30.znPpwDBOp9CTW4igmm-HKB0qFwQ4J4G3GFPJ4-Hgx4w"; // from Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
