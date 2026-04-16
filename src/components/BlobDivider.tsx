'use client';

import dynamic from 'next/dynamic';

const GradientBlob = dynamic(() => import('@/components/reactbits/GradientBlob'), { ssr: false });

export default function BlobDivider() {
  return (
    <div className="relative h-[300px] md:h-[400px] -my-20 md:-my-28 z-0">
      <GradientBlob
        width="100%"
        height="100%"
        speed={0.6}
        primaryColor="#1a6df5"
        secondaryColor="#6366f1"
        accentColor="#338dff"
        baseColor="#06b6d4"
        size={0.8}
        morphIntensity={0.6}
        breathe={true}
        breatheDuration={3}
        breatheDelay={1}
        metallic={0.3}
        opacity={0.6}
        rotationSpeed={0.5}
        quality="medium"
        enableCursorMorph={true}
        parallax={true}
        parallaxStrength={0.3}
      />
      {/* Fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
    </div>
  );
}
