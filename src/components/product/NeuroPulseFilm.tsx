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
  { icon: Activity, label: "Real-time sEMG" },
  { icon: Wifi, label: "Local Wi-Fi link" },
  { icon: Gamepad2, label: "Guided biofeedback" },
  { icon: FileText, label: "60-second summary" },
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
    <section id="product-film" className="relative overflow-hidden border-y border-[#CAD8E4] bg-[#EEF4F8] text-[#082942]">
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-[2] bg-[#0067A0]" />
        <span className="flex-1 bg-[#00A6A6]" />
        <span className="w-16 bg-[#F2A900]" />
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <p className="ad-kicker flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#0067A0] sm:text-sm">
              <span className="h-px w-10 bg-[#00A6A6]" aria-hidden="true" />
              Human movement technology
            </p>
            <h2 className="ad-headline mt-4 max-w-4xl text-3xl font-black leading-[1.08] sm:text-5xl lg:text-6xl">
              Muscle intelligence.
              <span className="block text-[#0067A0]">Made visible.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#496477] sm:text-lg">
              Portable single-channel surface EMG visualization for education,
              research and supervised rehabilitation learning.
            </p>
          </div>

          <Link
            href="/checkout?product=neuropulseai"
            className="inline-flex h-11 items-center justify-center justify-self-start rounded-md bg-[#0067A0] px-6 text-sm font-bold text-white shadow-lg hover:bg-[#004F7C] lg:h-12 lg:justify-self-end"
          >
            Explore NeuroPulseAI
          </Link>
        </div>

        <div className="ad-film-frame relative mt-7 aspect-[850/478] w-full overflow-hidden rounded-t-md border border-[#9FB7C9] bg-black sm:mt-9">
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

        </div>

        <div className="flex flex-col gap-4 border-x border-b border-[#C4D4E0] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0 border-l-2 border-[#00A6A6] pl-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0067A0] sm:text-xs">
              NeuroPulseAI / Product film
            </p>
            <p className="mt-1 text-base font-bold text-[#082942] sm:text-lg">
              Precision feedback for human movement learning
              <span className="ml-3 text-xs font-semibold text-[#60798B] sm:text-sm">
                Designed and developed in India
              </span>
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={restart}
              aria-label="Restart product film"
              title="Restart"
              className="grid size-10 place-items-center rounded-full border border-[#B8CBD9] bg-[#F7FAFC] text-[#174966] hover:border-[#0067A0] hover:text-[#0067A0]"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause product film" : "Play product film"}
              title={isPlaying ? "Pause" : "Play"}
              className="grid size-10 place-items-center rounded-full border border-[#B8CBD9] bg-[#F7FAFC] text-[#174966] hover:border-[#0067A0] hover:text-[#0067A0]"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute product film" : "Mute product film"}
              title={isMuted ? "Unmute" : "Mute"}
              className="grid size-10 place-items-center rounded-full border border-[#B8CBD9] bg-[#F7FAFC] text-[#174966] hover:border-[#0067A0] hover:text-[#0067A0]"
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 border-x border-b border-[#C4D4E0] bg-[#F8FBFD] lg:grid-cols-4">
          {features.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className="flex min-h-16 items-center gap-3 border-b border-[#D8E3EB] px-4 py-3 [&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-4 lg:last:border-r-0"
            >
              <span className="font-mono text-xs font-bold text-[#668397]">0{index + 1}</span>
              <Icon className="size-4 shrink-0 text-[#00A6A6]" />
              <span className="text-sm font-semibold text-[#173E58]">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-[#657D8E]">
          Educational and research prototype. Not a certified medical or diagnostic device.
        </p>
      </div>
    </section>
  );
}
