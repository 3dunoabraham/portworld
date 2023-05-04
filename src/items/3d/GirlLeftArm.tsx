import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';

export default function Component (props) {
    const { scene } = useGLTF('/leftarm0.glb')
    useLayoutEffect(() => {
      scene.traverse(o => {
        if(o instanceof THREE.Mesh ) {
          o.receiveShadow = true
          o.castShadow = true
        }
      })
      // Set shadow properties for the object itself
      ref.current.castShadow = true
      ref.current.receiveShadow = true
    }, [])
  
    const ref:any = useRef();
  
  return <primitive ref={ref} position={[0,-0.8,0]} object={scene} {...props} />
}
