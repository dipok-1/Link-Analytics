
import './App.css'
import Home from './Pages/home'
import { AnalyticsProvider } from './context/analyticsContext'
import AnalyticsPage from './Pages/analyticsPage'
import URLAnalyseForm from './Pages/analyseURL'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {

  return (
    <AnalyticsProvider>
      <BrowserRouter>
           <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/analytics/:code/:shorturl' element={<AnalyticsPage/>}/>
            <Route path='/url/form' element={<URLAnalyseForm/>}/>
           </Routes>
      </BrowserRouter>
    </AnalyticsProvider>

  )
}

export default App
