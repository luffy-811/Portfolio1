import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CameraHomeState({ isHovered, children }) {
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [homePosition, setHomePosition] = useState(new THREE.Vector3(0, 0, 15));
  const [homeRotation, setHomeRotation] = useState(new THREE.Euler(0, 0, 0));
  
  const animationRef = useRef();
  const timeoutRef = useRef();
  
  // Animation duration and easing
  const animationDuration = 2000; // 2 seconds
  const inactivityTimeout = 3000; // 3 seconds
  const noInteractionTimeout = 5000; // 5 seconds
  
  // Store initial camera state
  useEffect(() => {
    setHomePosition(camera.position.clone());
    setHomeRotation(camera.rotation.clone());
  }, [camera]);
  
  // Handle interaction detection
  useEffect(() => {
    if (isHovered) {
      setLastInteractionTime(Date.now());
      setIsAnimating(false);
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isHovered]);
  
  // Set up inactivity timeout
  useEffect(() => {
    if (!isHovered && !isAnimating) {
      timeoutRef.current = setTimeout(() => {
        animateToHome();
      }, inactivityTimeout);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered, isAnimating]);
  
  // Check for no interaction timeout
  useEffect(() => {
    const checkNoInteraction = () => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      if (timeSinceLastInteraction >= noInteractionTimeout && !isAnimating) {
        animateToHome();
      }
    };
    
    const interval = setInterval(checkNoInteraction, 1000);
    return () => clearInterval(interval);
  }, [lastInteractionTime, isAnimating]);
  
  const animateToHome = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    const startPosition = camera.position.clone();
    const startRotation = camera.rotation.clone();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Ease-in-out function
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      // Interpolate position
      camera.position.lerpVectors(startPosition, homePosition, easeProgress);
      
      // Interpolate rotation
      camera.rotation.x = THREE.MathUtils.lerp(startRotation.x, homeRotation.x, easeProgress);
      camera.rotation.y = THREE.MathUtils.lerp(startRotation.y, homeRotation.y, easeProgress);
      camera.rotation.z = THREE.MathUtils.lerp(startRotation.z, homeRotation.z, easeProgress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        camera.position.copy(homePosition);
        camera.rotation.copy(homeRotation);
      }
    };
    
    animate();
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return <>{children}</>;
} 