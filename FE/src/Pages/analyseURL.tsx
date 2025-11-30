
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

function URLAnalyseForm(){

    const [inputUrl, setInputUrl] = useState("")
    const navigate = useNavigate()
    async function handleAnalyse(){    
       try {
        navigate(`/analytics/${inputUrl}`)
       } catch (error) {
        console.log("URL Analyse Error: ",error)
       }
    }





return(
<div className="min-h-screen bg-red-100 flex items-center justify-center px-4">
  <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg border border-red-200">

    <h1 className="text-3xl font-bold text-red-600">URL Analyser</h1>
    <p className="mt-1 text-sm text-gray-600">
      Paste your short URL to analyse — analytics
    </p>

    <div className="mt-6">
      <input
        type="text"
        placeholder="Enter URL to Analyse..(LA/xxxx)"
        value={inputUrl}
        onChange={e=>setInputUrl(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
      />
    </div>

    <button
    onClick={handleAnalyse}
      className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
    >
      Analyse
    </button>
  </div>
</div>

    )
}
export default URLAnalyseForm;