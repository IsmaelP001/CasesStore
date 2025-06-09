"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { Suspense } from "react";
import Model3d from "./Model3d";

export default function ModelScene() {
  return (
   <div>
     <Canvas gl={{ antialias: true }} dpr={[1, 1, 1.5]}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Center>
          <Model3d  />
        </Center>
      </Suspense>
    </Canvas>
   </div>
  );
}
