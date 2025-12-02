
import './App.css'
import Home from './Pages/home'
import { AnalyticsProvider } from './context/analyticsContext'
import AnalyticsPage from './Pages/analyticsPage'
import URLAnalyseForm from './Pages/analyseURL'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ExpiredPage from './Pages/expiredPage'
function App() {

  return (
    <AnalyticsProvider>
      <BrowserRouter>
           <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/analytics/:code/:shorturl' element={<AnalyticsPage/>}/>
            <Route path='/url/form' element={<URLAnalyseForm/>}/>
            <Route path='/expired' element={<ExpiredPage/>}/>
           </Routes>
      </BrowserRouter>
    </AnalyticsProvider>

  )
}

export default App
