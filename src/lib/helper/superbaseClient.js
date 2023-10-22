import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kqpiaexmobiuasgzdfeh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcGlhZXhtb2JpdWFzZ3pkZmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3ODM1MDMsImV4cCI6MjAxMjM1OTUwM30.5nbzbKCI3MfFjlSrVGq_QlZ2CfhilTAO6OcLPmw91tI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;