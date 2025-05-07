import supabase from './supabase.js';

//temp
// import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv'

// dotenv.config()

// const supabaseUrl = 'https://hpoxrybfubdbhxkurhjf.supabase.co'
// const supabaseKey = process.env.VITE_SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

const searchKeyword = (captions, keyword) => {
    let cap
    captions.forEach(caption => {
        let sentence = caption.text.split(" ")
        sentence.forEach(word => {
            if(word.toLowerCase().includes(keyword.toLowerCase())) {
                cap = caption
                return caption
            }
        })
    });
    return cap
}

const fetchUrl = async () => {
    let { data: URLs, error } = await supabase
        .from('URLs')
        .select('*')
    if(error) {
        console.log(error)
    }
    return [URLs[1].link, JSON.parse(URLs[1].captions)]
}

const fetchVideo = async(keyword) => {
    let timedURL
    let [url, captions] = await fetchUrl()
    
    let foundCaption = searchKeyword(captions, keyword)
    console.log(foundCaption)
    if(foundCaption) {
        timedURL = url + ";start=" + parseInt(foundCaption.start)
        console.log(timedURL)
        return timedURL
    }
    return timedURL
}

export default fetchVideo