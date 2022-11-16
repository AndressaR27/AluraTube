import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://ymrgdebodqiodxjzmjls.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcmdkZWJvZHFpb2R4anptamxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzkyNjAsImV4cCI6MTk4Mzk1NTI2MH0.6Qzunq67sdT19UT0JHsusavk9wUfuhZYwSQKehlzcYE"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


export function videoService() {
  return {
    getAllVideos() {
       return supabase.from("video").select("*")
    },
  };
}
