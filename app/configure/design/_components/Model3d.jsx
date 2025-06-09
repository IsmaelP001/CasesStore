"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useDesign } from "../hooks/useDesign-context";

export default function ModelScene() {
  const mountRef = useRef(null);
  const {canvasRef}=useDesign();
  useEffect(() => {
    if (!canvasRef.current) return; // Si no hay canvas, no se ejecuta

    // Crear escena, cámara y renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Crear la textura a partir del canvas global
    const canvasTexture = new THREE.CanvasTexture(canvasRef.current);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.RepeatWrapping;
    canvasTexture.repeat.set(1, 1);
    canvasTexture.flipY = false; // Evita invertir la imagen

    // Cargar el modelo GLTF y aplicar la textura a cada malla
    const loader = new GLTFLoader();
    loader.load("/phone-case.glb", (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh ) {
          // Usamos un nuevo material para asegurar que se aplique la textura completa
          child.material = new THREE.MeshStandardMaterial({
            map: canvasTexture,
            side: THREE.DoubleSide,
          });
        }
      });
      scene.add(model);
    });

    // Posicionar la cámara
    camera.position.set(0, 1, 5);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Actualizar la textura en cada frame para reflejar los cambios en el canvas
      canvasTexture.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup al desmontar
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [canvasRef.current]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
