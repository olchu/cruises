import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseUrl = 'https://gjntlypfndvhwnivvopf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbnRseXBmbmR2aHduaXZ2b3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNDQyNTgsImV4cCI6MTk5MDkyMDI1OH0.hkqSEkDtRHHiNW50w9qyMxSen8yZKrWUzHnXb1KGMaI';

// console.log('supabaseUrl', supabaseUrl);
// console.log('supabaseKey', supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
