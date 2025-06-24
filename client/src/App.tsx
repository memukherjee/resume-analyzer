import { Route, Routes } from 'react-router';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ScreeningTool from './components/ScreeningTool';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<ResumeAnalyzer />} />
                <Route path="recruiter" element={<ScreeningTool />} />
            </Routes>
        </>
    );
}

export default App;
