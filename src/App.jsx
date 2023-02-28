import { CameraControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Bloom,
    EffectComposer,
    HueSaturation,
} from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import * as THREE from 'three';

function Model(props) {
    const { scene, animations } = useGLTF(props.path);

    // Here's the animation part
    // *************************
    let mixer;
    if (animations.length) {
        mixer = new THREE.AnimationMixer(scene);
        animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });
    }

    useFrame((state, delta) => {
        mixer?.update(delta * 1);
    });
    // *************************

    scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.side = THREE.FrontSide;
        }
    });

    return <primitive {...props} object={scene} />;
}

function HummingBird(props) {
    return <Model path={'/hummingbird/scene.gltf'} {...props} />;
}

function App() {
    return (
        <div className="w-screen h-screen bg-gradient-to-t from-orange-100 to-white">
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
                        <HummingBird position={[0, 0, 0]} />
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
                    <CameraControls />
                </Canvas>
            </div>
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="pt-96 pl-24 z-20 space-y-7 max-w-fit">
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

export default App;
