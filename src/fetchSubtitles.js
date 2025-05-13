// this is not integrated with the app. this puts captions to the database.
import { getSubtitles } from "youtube-captions-scraper";
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = 'https://hpoxrybfubdbhxkurhjf.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchSubtitles(vidId) {
    const captions = await getSubtitles({
        videoID: vidId, // youtube video id
        lang: 'en' // default: `en`
      }).then(captions => {
        return JSON.stringify(captions)
      }).catch(error => {
        console.log(`ERROR: ${error}`)
      })
      return captions
}

let { data: URLs, error } = await supabase
  .from('URLs')
  .select('*')
  .eq('id', 4)
if (error) {
  console.log(error)
}

URLs.forEach(async row => {
  let url = row.link
  let vidID = url.substring(url.indexOf("embed/")+6, url.indexOf("?si="))
  let caption = await fetchSubtitles(vidID)
  const { data, error } = await supabase
  .from('URLs')
  .update({captions: caption})
  .eq('id', row.id)
  .select()
  if(error) {
    console.log(`Error updating captions value: ${error}`)
  }
  console.log(`Updated successfully: ${JSON.stringify(data)}`)
})