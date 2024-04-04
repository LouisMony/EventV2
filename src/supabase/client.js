import { createClient } from "@supabase/supabase-js";

const projectURL = 'https://glxexmxqxatabcxentxr.supabase.co';
const projectKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdseGV4bXhxeGF0YWJjeGVudHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMTY5MTEsImV4cCI6MjAyNzc5MjkxMX0.JSnL7tYVcAhLh680j1u5_7vhTWzDnOP6cqcs4SxnMRo';

export const supabase = createClient(projectURL, projectKey);