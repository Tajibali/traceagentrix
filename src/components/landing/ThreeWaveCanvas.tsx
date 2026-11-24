"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeWaveCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            55,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 14, 28);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const cols = 75;
        const rows = 40;
        const separation = 1.1;
        const positions = new Float32Array(cols * rows * 3);

        let i = 0;
        for (let ix = 0; ix < cols; ix++) {
            for (let iz = 0; iz < rows; iz++) {
                positions[i * 3] = (ix - cols / 2) * separation;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = (iz - rows / 2) * separation;
                i++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x6366f1, // Indigo glow matching your theme
            size: 0.22,
            transparent: true,
            opacity: 0.65,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let count = 0;
        let frameId: number;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const posAttr = geometry.attributes.position as THREE.BufferAttribute;

            let idx = 0;
            for (let ix = 0; ix < cols; ix++) {
                for (let iz = 0; iz < rows; iz++) {
                    const y =
                        Math.sin((ix + count) * 0.22) * 1.5 +
                        Math.cos((iz + count) * 0.22) * 1.5;
                    posAttr.setY(idx, y);
                    idx++;
                }
            }
            posAttr.needsUpdate = true;
            count += 0.035;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
        />
    );
}