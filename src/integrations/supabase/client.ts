// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wrkseoaruzdvtgvyllyw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indya3Nlb2FydXpkdnRndnlsbHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDI3NzIsImV4cCI6MjA1OTE3ODc3Mn0.H5CxHhlYyx1oMo5D1yH-JoYjoyDSaMsutyiPyNPfzMs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);