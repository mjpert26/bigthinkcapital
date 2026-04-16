"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface GradientBlobProps {
  width?: number | string;
  height?: number | string;
  speed?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  baseColor?: string;
  size?: number;
  morphIntensity?: number;
  enableCursorMorph?: boolean;
  breathe?: boolean;
  breatheDuration?: number;
  breatheDelay?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  metallic?: number;
  opacity?: number;
  rotationSpeed?: number;
  autoRotate?: boolean;
  touchEnabled?: boolean;
  quality?: "low" | "medium" | "high";
  maxFPS?: number;
  pauseWhenOffscreen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const GradientBlob: React.FC<GradientBlobProps> = ({
  width = "100%", height = "100%", speed = 1.0, primaryColor = "#5227FF",
  secondaryColor = "#FF9FFC", accentColor = "#B19EEF", baseColor = "#27C5FF",
  size = 1.0, morphIntensity = 0.5, enableCursorMorph = true, breathe = false,
  breatheDuration = 2.0, breatheDelay = 0.5, parallax = false, parallaxStrength = 0.5,
  metallic = 0.0, opacity = 1.0, rotationSpeed = 1.0, autoRotate = true,
  touchEnabled = true, quality = "medium", maxFPS = 60, pauseWhenOffscreen = true,
  className, children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const parallaxOffsetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const parallaxTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const hexToRgb = (hex: string) => {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return r ? { r: parseInt(r[1], 16) / 255, g: parseInt(r[2], 16) / 255, b: parseInt(r[3], 16) / 255 } : { r: 1, g: 1, b: 1 };
    };
    const primary = hexToRgb(primaryColor), secondary = hexToRgb(secondaryColor), accent = hexToRgb(accentColor), base = hexToRgb(baseColor);
    const rect = container.getBoundingClientRect();
    const actualWidth = rect.width, actualHeight = rect.height;
    const qualitySettings = {
      low: { pixelRatio: 1, marchSteps: 32, antialias: false },
      medium: { pixelRatio: Math.min(window.devicePixelRatio, 2), marchSteps: 64, antialias: true },
      high: { pixelRatio: Math.min(window.devicePixelRatio, 3), marchSteps: 96, antialias: true },
    };
    const settings = qualitySettings[quality];
    const renderer = new THREE.WebGLRenderer({ antialias: settings.antialias, alpha: true, powerPreference: "high-performance", stencil: false, depth: false });
    renderer.setClearColor(0x000000, 0);
    const pixelRatio = settings.pixelRatio;
    renderer.setSize(actualWidth, actualHeight, false);
    renderer.setPixelRatio(pixelRatio);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bW = actualWidth * pixelRatio, bH = actualHeight * pixelRatio;

    const uniforms = {
      iTime: { value: 0 }, iResolution: { value: new THREE.Vector3(bW, bH, 1.0) },
      iMouse: { value: new THREE.Vector2(bW * 0.5, bH * 0.5) },
      uPrimaryColor: { value: new THREE.Vector3(primary.r, primary.g, primary.b) },
      uSecondaryColor: { value: new THREE.Vector3(secondary.r, secondary.g, secondary.b) },
      uAccentColor: { value: new THREE.Vector3(accent.r, accent.g, accent.b) },
      uBaseColor: { value: new THREE.Vector3(base.r, base.g, base.b) },
      uBlobSize: { value: 3.0 * size }, uMorphIntensity: { value: morphIntensity },
      uEnableCursorMorph: { value: enableCursorMorph ? 1.0 : 0.0 },
      uBreathe: { value: breathe ? 1.0 : 0.0 }, uBreatheDuration: { value: breatheDuration },
      uBreatheDelay: { value: breatheDelay }, uParallaxOffset: { value: new THREE.Vector2(0, 0) },
      uMetallic: { value: metallic }, uOpacity: { value: opacity },
      uRotationSpeed: { value: rotationSpeed }, uAutoRotate: { value: autoRotate ? 1.0 : 0.0 },
      uMaxSteps: { value: settings.marchSteps },
    };

    const vertexShader = `void main(){gl_Position=vec4(position,1.0);}`;
    const fragmentShader = `
      uniform float iTime;uniform vec3 iResolution;uniform vec2 iMouse;
      uniform vec3 uPrimaryColor,uSecondaryColor,uAccentColor,uBaseColor;
      uniform float uBlobSize,uMorphIntensity,uEnableCursorMorph,uBreathe,uBreatheDuration,uBreatheDelay;
      uniform vec2 uParallaxOffset;uniform float uMetallic,uOpacity,uRotationSpeed,uAutoRotate;uniform int uMaxSteps;
      const vec3 LP=vec3(0,-5,-5);const vec3 CP=vec3(0,0,5);const float MD=100.0;const float ST=0.001;
      float ds(vec3 p,float r){return length(p)-r;}
      vec3 rp(vec3 p,float t){if(uAutoRotate<0.5)return p;float ax=sin(t*uRotationSpeed)*0.3,az=ax*2.0;
        float cx=cos(ax),sx=sin(ax),cz=cos(az),sz=sin(az);
        return vec3(p.x*cx-p.y*sx,p.x*sx+p.y*cx,p.y*sz+p.z*cz);}
      float sd(vec3 p){float b=ds(p,uBlobSize);vec2 nm=iMouse/iResolution.xy;
        float ci=uEnableCursorMorph*clamp(length(nm-vec2(0.5))*0.5,0.05,0.25);
        vec3 sp=p*2.0;float d=(cos(sp.x+iTime)*sin(sp.y+iTime*0.5)+sin(sp.z+iTime*0.7)*cos(sp.x-iTime)+cos(sp.y-iTime*0.3)*sin(sp.z+iTime*0.9))*0.33*ci*uMorphIntensity;
        if(uBreathe>0.5){float ct=uBreatheDuration+uBreatheDelay,bp=mod(iTime,ct);if(bp<uBreatheDuration)d+=sin(bp/uBreatheDuration*3.14159)*0.15*uMorphIntensity;}
        return b+d;}
      vec3 cn(vec3 p){vec3 r=rp(p,iTime);const float h=0.001;const vec2 k=vec2(1,-1);
        return normalize(k.xyy*sd(r+k.xyy*h)+k.yyx*sd(r+k.yyx*h)+k.yxy*sd(r+k.yxy*h)+k.xxx*sd(r+k.xxx*h));}
      vec3 bc(vec3 n){vec3 c=mix(uPrimaryColor,uSecondaryColor,smoothstep(0.3,0.7,n.x+0.45));
        c=mix(c,uAccentColor,smoothstep(0.3,0.7,n.y+0.3));c=mix(c,uBaseColor,smoothstep(0.9,1.2,n.y+0.3));return c;}
      vec3 gc(vec3 p){vec3 n=cn(p);vec3 g=mix(uPrimaryColor,uSecondaryColor,smoothstep(-1.0,1.0,n.x));
        g=mix(g,mix(uAccentColor,uBaseColor,smoothstep(1.0,3.0,n.y)),smoothstep(-1.0,1.0,n.y));return g;}
      vec3 rm(vec3 ro,vec3 rd){vec3 gp=ro+rd*3.0;vec3 gc2=gc(gp);float td=0.0;
        for(int i=0;i<96;i++){if(i>=uMaxSteps)break;vec3 cp=ro+rd*td;float d=sd(cp);
          if(d<ST){vec3 n=cn(cp);vec3 bc2=bc(n);vec3 ld=normalize(cp-LP);float df=max(0.0,dot(n,ld));
            vec3 vd=normalize(ro-cp);vec3 rfl=reflect(-ld,n);float sp=pow(max(dot(vd,rfl),0.0),32.0);
            vec3 lc=mix(bc2*df,bc2*(df+sp),uMetallic);float dc=length(cp.xy);
            if(dc>1.0)return mix(lc,gc2,smoothstep(1.0,2.3,dc));return lc;}
          td+=max(d,0.001);if(td>MD)break;}return gc2;}
      void main(){vec2 uv=(2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;uv+=uParallaxOffset*0.5;
        gl_FragColor=vec4(rm(CP,normalize(vec3(uv,-1.0))),uOpacity);}`;

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: opacity < 1.0, depthTest: false, depthWrite: false });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMove = (x: number, y: number) => {
      const r = container.getBoundingClientRect();
      if (enableCursorMorph) { mouseRef.current.set(x - r.left, y - r.top); uniforms.iMouse.value.set(x - r.left, y - r.top); }
      if (parallax) { parallaxTargetRef.current.set(((x - r.left - r.width / 2) / r.width) * parallaxStrength, -(((y - r.top - r.height / 2) / r.height) * parallaxStrength)); }
    };
    const onMM = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTM = (e: TouchEvent) => { if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY); };
    if (enableCursorMorph || parallax) {
      container.addEventListener("mousemove", onMM);
      if (touchEnabled) container.addEventListener("touchmove", onTM, { passive: true });
    }

    let observer: IntersectionObserver | null = null;
    if (pauseWhenOffscreen) { observer = new IntersectionObserver((entries) => { isVisibleRef.current = entries[0].isIntersecting; }, { threshold: 0 }); observer.observe(container); }

    startTimeRef.current = performance.now();
    lastFrameTimeRef.current = performance.now();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (pauseWhenOffscreen && !isVisibleRef.current) return;
      const now = performance.now();
      if (now - lastFrameTimeRef.current < 1000 / maxFPS) return;
      lastFrameTimeRef.current = now;
      uniforms.iTime.value = ((now - startTimeRef.current) / 1000) * speed;
      if (parallax) { parallaxOffsetRef.current.lerp(parallaxTargetRef.current, 0.1); uniforms.uParallaxOffset.value.copy(parallaxOffsetRef.current); }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const nr = container.getBoundingClientRect();
      renderer.setSize(nr.width, nr.height, false);
      uniforms.iResolution.value.set(nr.width * pixelRatio, nr.height * pixelRatio, 1.0);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (enableCursorMorph || parallax) { container.removeEventListener("mousemove", onMM); if (touchEnabled) container.removeEventListener("touchmove", onTM); }
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      scene.remove(mesh); geometry.dispose(); material.dispose(); renderer.dispose();
      if (renderer.domElement?.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [speed, primaryColor, secondaryColor, accentColor, baseColor, size, morphIntensity, enableCursorMorph, breathe, breatheDuration, breatheDelay, parallax, parallaxStrength, metallic, opacity, rotationSpeed, autoRotate, touchEnabled, quality, maxFPS, pauseWhenOffscreen]);

  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width: widthStyle, height: heightStyle }}>
      <div ref={containerRef} className="absolute inset-0" />
      {children && <div className="relative z-10 w-full h-full pointer-events-none">{children}</div>}
    </div>
  );
};

export default GradientBlob;
