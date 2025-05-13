import supabase from './supabase.js';

const searchKeyword = (URLs, keyword) => {
    let links = URLs.map((row) => row.link)
    let captions = URLs.map((row) => row.captions)
    let cap, link
    captions.forEach((caption, index) => {
        caption = JSON.parse(caption)
        for (let sentenceobj of caption) {
            let sentence = sentenceobj.text.replaceAll(/\.|\,/g, "") // remove full stops and commas from the caption
            sentence = sentence.split(/\n| /) // separate by spaces and \n
            for (let word of sentence) {
                if (word.toLowerCase().trim() === keyword.toLowerCase().trim()) {
                    cap = sentenceobj
                    link = links[index]
                    break
                }
            }
        }
    });
    return [cap, link]
}

const selectLang = async(lang) => {
    if(lang !== "all") {
        return await supabase
        .from('URLs')
        .select('*')
        .eq("lang", lang)
    }
    else {
        return await supabase
        .from('URLs')
        .select('*')
    }
} 

const fetchUrl = async(lang) => {
    let {data: URLs, error} = await selectLang(lang)
    if(error) {
        console.log(`Error: ${error}`)
    }
    return URLs
}

const fetchVideo = async(keyword, lang) => {
    let timedURL
    let URLs = await fetchUrl(lang)
    let [foundCaption, foundLink] = searchKeyword(URLs, keyword)

    console.log(foundCaption)
    if(foundCaption) {
        timedURL = foundLink + ";start=" + parseInt(foundCaption.start)
        console.log(timedURL)
        return timedURL
    }
    return timedURL
}

export default fetchVideo