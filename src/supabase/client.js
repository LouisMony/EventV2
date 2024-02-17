import { createClient } from "@supabase/supabase-js";

const projectURL = 'https://aehddizvuliqpwsxwzod.supabase.co';
const projectKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaGRkaXp2dWxpcXB3c3h3em9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNTM3MTQsImV4cCI6MjAyMzcyOTcxNH0.Ux2EGWf8Nw7Iq-rAIxFWdPDOhY9sky7mKcON_UyKkgw';

export const supabase = createClient(projectURL, projectKey);