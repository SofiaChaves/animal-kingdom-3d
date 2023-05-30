import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Model(props) {
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
