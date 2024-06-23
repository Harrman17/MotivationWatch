import './index.css'
import Stopwatch from './components/Stopwatch'
import Header from './components/Header'
import Motivate from './components/Motivate'
import VideoDisplay from './components/VideoDisplay'


export default function App() {

    return (
        <div>
            <Header />
            <Stopwatch />
            <Motivate />
            <VideoDisplay />
        </div>
    )
}

