import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh} from 'three';
import mapTextureImage from '../assets/kunimunes-authagraph.png'
import { useTexture } from '@react-three/drei';

export default function Globe(props: any) {
  const { clock } = useThree()
  const meshRef = useRef<Mesh>(null!);
  // const mapTexture = useLoader<Texture, string | string[], LoaderProto<T>, LoaderReturnType<T, L>>(TextureLoader, mapTextureImage);
  const mapTextureTwo = useTexture({map: mapTextureImage});

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = 0.2 * clock.getElapsedTime();
    }
  })

  return (
    <mesh ref={meshRef} visible userData={{ hello: 'world' }} position={[0,0,0]} >
    <sphereGeometry args={[1, 16, 16]} />
    {!Array.isArray(mapTextureTwo)  ? <meshBasicMaterial {...mapTextureTwo} /> : <></>}
    
  </mesh>
  );
}