
import { useContext, useEffect } from "react";
import axios from "axios";
import { AnalyticsContext } from "../context/analyticsContext";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";



export default function AnalyticsPage() {
    const {code,shorturl} = useParams();
    const {analyticsData}  = useContext(AnalyticsContext)
    const {setAnalyticsData} = useContext(AnalyticsContext)


    useEffect(()=>{
      const sendRequest = async() => {
        try {
        const response = await axios.get(`http://localhost:3000/analytics/${code}/${shorturl}`)
        setAnalyticsData(response.data.data)
     } catch (error) {
        console.log('Link Analysis Error: ',error)
     }
      }
      sendRequest()
    },[])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Data</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Analytics Summary</h2>

        <div>
          <span className="font-medium">Short URL:</span>
          <span className="text-purple-600 font-semibold">http://localhost:3000/{code}/{shorturl}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span className="font-medium">Link Count:</span>
          <span className="text-blue-600 font-semibold">{analyticsData?analyticsData.ClickCount:0}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">User Agent:</span>
          <span className="text-green-600 font-semibold">
            {analyticsData?analyticsData.userAgent:"Null"}
          </span>
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <button className="border p-2 rounded hover:bg-gray-50 cursor-pointer"><Link to="/">Create Short URL</Link></button>
          <button className="text-green-400 border p-2 rounded hover:bg-gray-50 cursor-pointer">Analyse Short URL</button>
        </div>
      </div>
    </div>
  );
}
