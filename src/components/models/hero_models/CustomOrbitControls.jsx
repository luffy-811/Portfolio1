import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function CustomOrbitControls({ isHovered, enableZoom = true, onInteraction, ...props }) {
  const controlsRef = useRef();
  const { camera, gl } = useThree();
  const [isEnabled, setIsEnabled] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  useEffect(() => {
    if (controlsRef.current) {
      // Enable/disable controls based on hover state
      controlsRef.current.enabled = isHovered;
      setIsEnabled(isHovered);
      
      // Update the controls when hover state changes
      if (isHovered) {
        controlsRef.current.update();
      }
    }
  }, [isHovered]);

  // Track orbit controls changes
  useEffect(() => {
    if (controlsRef.current) {
      const handleChange = () => {
        const currentTime = Date.now();
        setLastInteractionTime(currentTime);
        if (onInteraction) {
          onInteraction(currentTime);
        }
      };

      controlsRef.current.addEventListener('change', handleChange);
      
      return () => {
        if (controlsRef.current) {
          controlsRef.current.removeEventListener('change', handleChange);
        }
      };
    }
  }, [onInteraction]);

  // Handle mouse wheel zoom only when hovering
  useEffect(() => {
    const handleWheel = (event) => {
      if (!isHovered || !enableZoom) return;
      
      event.preventDefault();
      
      if (controlsRef.current) {
        // Calculate zoom factor
        const zoomSpeed = 0.1;
        const delta = event.deltaY > 0 ? 1 : -1;
        const zoomFactor = 1 + delta * zoomSpeed;
        
        // Apply zoom
        const distance = camera.position.distanceTo(controlsRef.current.target);
        const newDistance = Math.max(5, Math.min(20, distance * zoomFactor));
        
        // Update camera position
        const direction = camera.position.clone().sub(controlsRef.current.target).normalize();
        camera.position.copy(controlsRef.current.target.clone().add(direction.multiplyScalar(newDistance)));
        camera.lookAt(controlsRef.current.target);
        
        // Track interaction
        const currentTime = Date.now();
        setLastInteractionTime(currentTime);
        if (onInteraction) {
          onInteraction(currentTime);
        }
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [isHovered, enableZoom, camera, gl, onInteraction]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false} // We handle zoom manually
      maxDistance={20}
      minDistance={5}
      minPolarAngle={Math.PI / 5}
      maxPolarAngle={Math.PI / 2}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.5}
      {...props}
    />
  );
} 