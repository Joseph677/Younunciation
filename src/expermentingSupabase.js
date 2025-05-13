import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { data } from 'react-router'

dotenv.config()

const supabaseUrl = 'https://hpoxrybfubdbhxkurhjf.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const {data:URLs, error} = await supabase
        .from('URLs')
        .select('*')

let links = URLs.map((row) => row.link)
console.log(URLs[7].captions)