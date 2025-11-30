import axios from "axios"
import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import AlertBox from "../components/AlertBox"



function Home() {
const  [OriginalUrl, setOriginalUrl] = useState("")
const [customAlias, setCustomAlias] = useState("")
const [shortUrl,setshortUrl] = useState("")
const [alert,setAlert] = useState<string | null>(null)
const navigate = useNavigate()

async function sendUrl() {
     try {
        const body = { OriginalUrl, customAlias }
        if(!OriginalUrl){
            setAlert("Please enter a valid URL")
        }
        const response = await axios.post('http://localhost:3000/LA/shorten',body)
        setshortUrl(response.data.ShortUrl)
     } catch (error) {
        if (axios.isAxiosError(error)) {
              
              console.log('Request Failed:',error.response?.data)
        }else {
            console.log("Unexpected Error: ",error)
        }
     }
}

const shorturl_slicing = shortUrl;
const sliced_shortUrl = shorturl_slicing.slice(22)

// copy to clipboard function
const copyToClipBoard = async() => {
    try {
        if(!shortUrl){
           setAlert("No Short URL to Copy");
           return;
        }
        await navigator.clipboard.writeText(shortUrl)
        setAlert("Short URL Copied to Clipboard!")
    } catch (error) {
        console.log("Failed To Copy:",error)
    }
}

// handle link analysis navigation
const handleLinkAnalysis = async() => {
    if(!sliced_shortUrl){
        setAlert("No Short URL to Analyse");
        return;
    }
    navigate(`/analytics/${sliced_shortUrl}`)
}

function navigateToFormPage(){
    navigate('/url/form')
}

return(
    <>
    {alert && <AlertBox Msg={alert} onClose={() => setAlert(null)}/>}
<div className="min-h-screen bg-linear-to-b from-red-100 via-red-50 to-white flex items-center justify-center p-6">
<main className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10">
<header className="flex items-start justify-between gap-4">
<div>
<h1 className="text-2xl sm:text-3xl font-extrabold text-red-700">URL Shortener</h1>
<p className="mt-1 text-sm text-gray-600">Paste your long URL and get a short one — analytics</p>
</div>
<div className="hidden sm:flex items-center gap-2">
<button onClick={navigateToFormPage} className="px-3 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">Show Analysis</button>
</div>
</header>


<section className="mt-6">
<div className="grid grid-cols-1 sm:grid-cols-[1fr,140px] gap-3 items-center">
<label htmlFor="longurl" className="sr-only">Enter Long URL</label>
<input
id="longurl"
type="url"
placeholder="Enter Long URL.."
className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
aria-label="Long URL"
value={OriginalUrl}
onChange={e=>{setOriginalUrl(e.target.value)}}
/>
<input
id="customAlias"
type="code"
placeholder="Enter Alias(optional).."
className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
aria-label="Alias"
value={customAlias}
onChange={e=>{setCustomAlias(e.target.value)}}
/>


<div className="flex gap-2">
<button onClick={ sendUrl } className="w-full px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">Shorten</button>
</div>
</div>


{/* Short URL result placeholder */}
<div className="mt-4">
<div className="flex flex-col sm:flex-row sm:items-center gap-3">
    
<div className="wrap-break-word text-sm sm:text-base px-3 py-2 rounded-md bg-red-50 border border-red-100 text-red-800">
    <a href={shortUrl}>{sliced_shortUrl? sliced_shortUrl : "URL will be showed here."}</a>
</div>
<div className="ml-auto flex gap-2">
<button onClick={copyToClipBoard} className="px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm">Copy</button>
<button onClick={handleLinkAnalysis} className="px-3 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700">View Analytics</button>
</div>
</div>
</div>


{/* Mobile Show Analysis button */}
<div className="mt-6 sm:hidden">
<button onClick={navigateToFormPage}  className="w-full px-4 py-3 rounded-md bg-red-600 text-white font-medium hover:bg-red-700">Show Analysis</button>
</div>
</section>


<footer className="mt-8 text-center text-xs text-gray-500">@2025</footer>
</main>
</div>
</>
    )
}
export default Home