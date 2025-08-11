import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Room } from "./Room";
import * as THREE from "three";

export function CameraFollowRoom({ onPointerEnter, onPointerLeave, ...props }) {
  const roomRef = useRef();
  const { camera } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [targetRotation, setTargetRotation] = useState(new THREE.Euler());
  const [currentRotation, setCurrentRotation] = useState(new THREE.Euler());
  
  // Default rotation (original position from HeroExperience)
  const defaultRotation = new THREE.Euler(0, -Math.PI / 4, 0);
  
  // Damping factor for smooth rotation
  const dampingFactor = 0.05;
  const defaultDampingFactor = 0.03; // Slower return to default

  // Calculate target rotation to face camera
  useFrame(() => {
    if (roomRef.current) {
      let targetRot;
      let damping;
      
      if (isHovered) {
        // Get the direction from room to camera
        const roomPosition = new THREE.Vector3();
        roomRef.current.getWorldPosition(roomPosition);
        
        const cameraPosition = camera.position.clone();
        const direction = cameraPosition.sub(roomPosition).normalize();
        
        // Calculate the target rotation to face the camera
        const targetQuaternion = new THREE.Quaternion();
        const up = new THREE.Vector3(0, 1, 0);
        const matrix = new THREE.Matrix4();
        matrix.lookAt(roomPosition, cameraPosition, up);
        targetQuaternion.setFromRotationMatrix(matrix);
        
        // Convert to Euler angles (only Y rotation for horizontal facing)
        const targetEuler = new THREE.Euler();
        targetEuler.setFromQuaternion(targetQuaternion);
        
        // Only apply Y rotation to keep the room upright
        targetRot = new THREE.Euler(0, targetEuler.y, 0);
        damping = dampingFactor;
      } else {
        // Return to default rotation when not hovered
        targetRot = defaultRotation;
        damping = defaultDampingFactor;
      }
      
      setTargetRotation(targetRot);
      
      // Smooth interpolation
      const lerpRotation = new THREE.Euler();
      lerpRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetRot.x, damping);
      lerpRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetRot.y, damping);
      lerpRotation.z = THREE.MathUtils.lerp(currentRotation.z, targetRot.z, damping);
      
      setCurrentRotation(lerpRotation);
      roomRef.current.rotation.copy(lerpRotation);
      
      // Add subtle scale effect when hovered
      if (isHovered) {
        const targetScale = 1.02;
        const currentScale = roomRef.current.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
        roomRef.current.scale.setScalar(newScale);
      } else {
        const targetScale = 1.0;
        const currentScale = roomRef.current.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
        roomRef.current.scale.setScalar(newScale);
      }
    }
  });

  // Mouse event handlers
  const handlePointerEnter = (event) => {
    setIsHovered(true);
    if (onPointerEnter) {
      onPointerEnter(event);
    }
  };

  const handlePointerLeave = (event) => {
    setIsHovered(false);
    if (onPointerLeave) {
      onPointerLeave(event);
    }
  };

  return (
    <group
      ref={roomRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <Room />
    </group>
  );
} 