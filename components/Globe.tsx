import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import {TextureLoader, Mesh} from 'three';

import mapTextureImage from '../assets/kunimunes-authagraph.png'

export default function Globe(props: any) {
  const {clock} = useThree()
  const meshRef = useRef<Mesh>(null!);
  const mapTexture = useLoader(TextureLoader, mapTextureImage);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = 0.2 * clock.getElapsedTime();
    }
  })

  return (
    <mesh ref={meshRef} visible userData={{ hello: 'world' }} position={[0,0,0]} >
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial map={mapTexture} />
  </mesh>
  );
}