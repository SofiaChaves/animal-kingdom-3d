import { Canvas } from '@react-three/fiber';
import {
    Bloom,
    EffectComposer,
    HueSaturation,
} from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { HummingBird } from './components/HummingBird';

function HummingBirdCanvas() {
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute w-screen h-screen z-10">
                <Canvas
                    camera={{
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                        position: [-0.4, 0, -0.3],
                    }}
                >
                    <ambientLight color="#fff" intensity={0.2} />
                    <directionalLight
                        color="#89d8e8"
                        intensity={1}
                        position={[0, 1, 0]}
                    />
                    {/* <axesHelper args={[10]} /> */}
                    <Suspense fallback={null}>
                        <HummingBird />
                    </Suspense>
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.5}
                            luminanceSmoothing={0.5}
                            opacity={2}
                        />
                        <HueSaturation
                            hue={0} // hue in radians
                            saturation={0.5} // saturation in radians
                        />
                    </EffectComposer>
                    {/* <CameraControls /> */}
                </Canvas>
            </div>
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 3 }}
            >
                <div className="h-screen w-screen flex flex-col items-start justify-center pl-24 z-20 space-y-7 max-w-fit">
                    <h1 className="text-7xl uppercase font-black">
                        Animal Kingdom
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt
                        <br /> ut labore et dolore magna aliqua.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

function App() {
    return (
        <div>
            <HummingBirdCanvas />
            <HummingBirdCanvas />
        </div>
    );
}

export default App;
