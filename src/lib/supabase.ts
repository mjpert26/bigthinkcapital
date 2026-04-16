import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dszokuvlulawjpmwromg.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzem9rdXZsdWxhd2pwbXdyb21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjE2MzAsImV4cCI6MjA5MTkzNzYzMH0.cgTDzTdDvJac2d1eQLQhfleRiq0P5bQ-3ht7rRwzvtM';

export const supabase = createClient(supabaseUrl, supabaseKey);
