"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface VantaWindow extends Window {
  THREE?: typeof THREE;
  VANTA?: {
    FOG: (options: {
      el: HTMLElement;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      highlightColor: number;
      midtoneColor: number;
      lowlightColor: number;
      baseColor: number;
      blurFactor: number;
      speed: number;
      zoom: number;
    }) => { destroy: () => void };
  };
}

export function RealisticFogBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScripts = async () => {
      const win = typeof window !== "undefined" ? (window as unknown as VantaWindow) : null;
      if (!win) return;

      win.THREE = THREE;

      if (!win.VANTA || !win.VANTA.FOG) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Vanta Fog"));
          document.body.appendChild(script);
        });
      }

      if (isMounted && containerRef.current && !vantaEffectRef.current) {
        const VANTA = win.VANTA;
        if (VANTA && VANTA.FOG) {
          vantaEffectRef.current = VANTA.FOG({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x0a0a0f, // very dark blue-gray
            midtoneColor: 0x1e3a8a,    // deep blue matching website color theme
            lowlightColor: 0x3b82f6,   // bright theme blue
            baseColor: 0x050508,       // matching background color of the hero section (#050508)
            blurFactor: 0.7,
            speed: 1.8,
            zoom: 0.9,
          });
        }
      }
    };

    loadScripts().catch((err) => console.error(err));

    return () => {
      isMounted = false;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-20"
      style={{ minHeight: "100%", minWidth: "100%" }}
    />
  );
}

export default RealisticFogBackground;
