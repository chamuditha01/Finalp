import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjrjrvwfyjngatmeinsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcmpydndmeWpuZ2F0bWVpbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3ODQ4MTcsImV4cCI6MjAxMjM2MDgxN30.6gqrC0IfJVrgS-Bipm9kf0bYP_g3r2y4dk4mfUK7o-M'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;