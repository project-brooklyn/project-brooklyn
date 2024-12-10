import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Display from './components/Display.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas>
        <Display />
    </Canvas>
)
