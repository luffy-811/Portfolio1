import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import * as THREE from "three";

import { CameraFollowRoom } from "./CameraFollowRoom";
import { CustomOrbitControls } from "./CustomOrbitControls";
import { CameraHomeState } from "./CameraHomeState";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isHovered, setIsHovered] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const handleInteraction = (time) => {
    setLastInteractionTime(time);
  };

  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 45 }}
      shadows
      gl={{ 
        antialias: true,
        shadowMap: true,
        shadowMapType: THREE.PCFSoftShadowMap
      }}
    >
      {/* Physics and lighting setup */}
      <fog attach="fog" args={['#1a1a40', 10, 50]} />
      
      {/* Enhanced lighting with shadows */}
      <ambientLight intensity={0.3} color="#1a1a40" />
      
      {/* Main directional light with shadows */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light for better illumination */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.8}
        color="#4a90e2"
        castShadow
      />
      
      {/* Rim light for depth */}
      <directionalLight
        position={[0, -10, 10]}
        intensity={0.5}
        color="#ff6b6b"
      />
      
      {/* Camera home state management */}
      <CameraHomeState isHovered={isHovered}>
        {/* Custom OrbitControls that only work when hovering */}
        <CustomOrbitControls 
          isHovered={isHovered}
          enableZoom={!isTablet}
          onInteraction={handleInteraction}
        />

        <Suspense fallback={null}>
          <HeroLights />
          <Particles count={100} />
          
          {/* Ground plane for shadows */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -5, 0]}
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color="#2a2a2a" 
              transparent 
              opacity={0.3}
            />
          </mesh>
          
          <group
            scale={isMobile ? 0.7 : 1}
            position={[0, -3.5, 0]}
            castShadow
            receiveShadow
          >
            <CameraFollowRoom 
              onPointerEnter={() => setIsHovered(true)}
              onPointerLeave={() => setIsHovered(false)}
            />
          </group>
        </Suspense>
      </CameraHomeState>
    </Canvas>
  );
};

export default HeroExperience;
