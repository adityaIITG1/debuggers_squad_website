"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  FileText,
  Gamepad2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Wifi,
} from "lucide-react";

const features = [
  { icon: Activity, label: "Live muscle signals" },
  { icon: Wifi, label: "App-connected" },
  { icon: Gamepad2, label: "Biofeedback games" },
  { icon: FileText, label: "1-minute reports" },
];

export function NeuroPulseFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const restart = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    await video.play();
  };

  return (
    <section id="product-film" className="relative overflow-hidden border-y border-[#202A3A] bg-[#06080D] text-white">
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-[#00AEEF]" />
        <span className="flex-1 bg-[#ED168C]" />
        <span className="flex-1 bg-[#FFB000]" />
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <p className="ad-kicker flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#45C8F5] sm:text-sm">
              <span className="h-px w-10 bg-[#45C8F5]" aria-hidden="true" />
              A NeuroPulseAI product film
            </p>
            <h2 className="ad-headline mt-4 text-3xl font-black leading-[1.08] sm:text-5xl lg:text-6xl">
              Feel the signal.
              <span className="block text-[#45C8F5]">See the science.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#B9C6D8] sm:text-lg">
              Your muscles already speak. NeuroPulseAI turns their electrical activity
              into live, visible feedback.
            </p>
          </div>

          <Link
            href="/checkout?product=neuropulseai"
            className="inline-flex h-11 items-center justify-center justify-self-start rounded-md bg-white px-6 text-sm font-bold text-[#071525] shadow-lg hover:bg-[#E9F7FF] lg:h-12 lg:justify-self-end"
          >
            Get NeuroPulseAI
          </Link>
        </div>

        <div className="ad-film-frame relative mt-7 aspect-[850/478] w-full overflow-hidden rounded-t-md border border-white/20 bg-black sm:mt-9">
          <video
            ref={videoRef}
            className="absolute left-1/2 top-1/2 h-[177.824%] w-[56.235%] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-contain"
            src="/videos/neuropulseai-promo.mp4"
            aria-label="NeuroPulseAI surface EMG product demonstration"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="ad-scanline pointer-events-none absolute inset-x-0 top-0 h-px bg-[#45C8F5]/70" aria-hidden="true" />

        </div>

        <div className="flex flex-col gap-4 border-x border-b border-white/20 bg-[#0A0E15] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0 border-l-2 border-[#45C8F5] pl-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8ADFFF] sm:text-xs">
              Single-channel surface EMG
            </p>
            <p className="mt-1 text-lg font-black sm:text-xl">
              NeuroPulse<span className="text-[#45C8F5]">AI</span>
              <span className="ml-3 text-xs font-semibold text-[#B9C6D8] sm:text-sm">
                Because every movement matters.
              </span>
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={restart}
              aria-label="Restart product film"
              title="Restart"
              className="grid size-10 place-items-center rounded-full border border-white/30 bg-black/60 text-white hover:border-[#45C8F5] hover:text-[#45C8F5]"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause product film" : "Play product film"}
              title={isPlaying ? "Pause" : "Play"}
              className="grid size-10 place-items-center rounded-full border border-white/30 bg-black/60 text-white hover:border-[#45C8F5] hover:text-[#45C8F5]"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute product film" : "Mute product film"}
              title={isMuted ? "Unmute" : "Mute"}
              className="grid size-10 place-items-center rounded-full border border-white/30 bg-black/60 text-white hover:border-[#45C8F5] hover:text-[#45C8F5]"
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 border-x border-b border-white/15 bg-[#0D111A] lg:grid-cols-4">
          {features.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className="flex min-h-16 items-center gap-3 border-b border-white/10 px-4 py-3 [&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-4 lg:last:border-r-0"
            >
              <span className="font-mono text-xs font-bold text-[#5DD5FF]">0{index + 1}</span>
              <Icon className="size-4 shrink-0 text-[#FFB000]" />
              <span className="text-sm font-semibold text-[#E8EEF7]">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-[#8290A4]">
          For education, research, innovation and supervised rehabilitation learning. Not for diagnosis.
        </p>
      </div>
    </section>
  );
}
