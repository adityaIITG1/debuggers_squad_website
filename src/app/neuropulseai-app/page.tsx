'use client';

import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Download,
  Info,
  LockKeyhole,
  ShieldCheck,
  Share2,
  Smartphone,
  Star,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';

const apkPath = '/NeuroPulseAI_App_v2.apk';
const apkUrl = 'https://www.debuggerssquad.com/NeuroPulseAI_App_v2.apk';
const appPageUrl = 'https://www.debuggerssquad.com/neuropulseai-app';

const release = {
  versionName: '2.0.0',
  fileSizeBytes: 95166594,
  androidMinVersion: '8.0 (Oreo)',
  releaseDate: '2026-08-08',
  sha256Checksum: '0F52B5A028C09AF1689C7C55E23A23AAE1C4076D2F552494035E4901CC29AAAA',
};

const screenshots = [
  {
    src: '/images/neuropulseai/app-gallery/wireless-emg-overview.jpeg',
    alt: 'NeuroPulseAI wireless surface EMG monitoring system with phone app',
    label: 'Wireless EMG overview',
  },
  {
    src: '/images/neuropulseai/app-gallery/progress-analytics.jpeg',
    alt: 'NeuroPulseAI progress analytics app screen',
    label: 'Progress analytics',
  },
  {
    src: '/images/neuropulseai/app-gallery/clinics-home-use.jpeg',
    alt: 'NeuroPulseAI clinical workspace and home use app screen',
    label: 'Clinics and home use',
  },
  {
    src: '/images/neuropulseai/app-gallery/knee-test-setup.jpeg',
    alt: 'NeuroPulseAI 60-second knee test setup screen',
    label: '60-second knee test',
  },
  {
    src: '/images/neuropulseai/app-gallery/left-right-symmetry.jpeg',
    alt: 'NeuroPulseAI left versus right symmetry comparison screen',
    label: 'Left vs right symmetry',
  },
  {
    src: '/images/neuropulseai/app-gallery/wireless-emg-designed-for.jpeg',
    alt: 'NeuroPulseAI wireless EMG designed for rehabilitation and clinics',
    label: 'Designed for care',
  },
  {
    src: '/images/neuropulseai/app-gallery/wireless-emg-features.jpeg',
    alt: 'NeuroPulseAI wireless EMG feature overview',
    label: 'Wireless device features',
  },
  {
    src: '/images/neuropulseai/app-gallery/device-app-connectivity.jpeg',
    alt: 'NeuroPulseAI device app connectivity overview',
    label: 'Device and app connectivity',
  },
  {
    src: '/images/neuropulseai/app-gallery/realtime-muscle-biofeedback.jpeg',
    alt: 'NeuroPulseAI real-time muscle biofeedback overview',
    label: 'Real-time biofeedback',
  },
  {
    src: '/images/neuropulseai/app-gallery/wireless-emg-use-cases.jpeg',
    alt: 'NeuroPulseAI wireless EMG use case overview',
    label: 'Use cases',
  },
  {
    src: '/images/neuropulseai/app-gallery/kit-box-contents.jpeg',
    alt: 'NeuroPulseAI kit box contents',
    label: 'Kit box contents',
  },
  {
    src: '/images/neuropulseai/app-gallery/app-connected-device.jpeg',
    alt: 'NeuroPulseAI app connected device overview',
    label: 'App connected device',
  },
  {
    src: '/images/neuropulseai/app-gallery/device-specs.jpeg',
    alt: 'NeuroPulseAI wireless device specifications',
    label: 'Device specifications',
  },
  {
    src: '/images/neuropulseai/app-gallery/compact-device-feedback.jpeg',
    alt: 'NeuroPulseAI compact device real muscle feedback overview',
    label: 'Compact device feedback',
  },
  {
    src: '/images/neuropulseai/app-gallery/wireless-emg-monitoring.jpeg',
    alt: 'NeuroPulseAI wireless EMG monitoring overview',
    label: 'Wireless monitoring',
  },
];

const safetyItems = [
  {
    icon: Wifi,
    title: 'Local device connection',
    summary: 'The Android app is designed to work with the NeuroPulseAI device over local Wi-Fi.',
    points: [
      'The app visualizes session-relative surface EMG signals from the device.',
      'No Supabase database is required for this public download page.',
      'The APK is hosted directly by the website as a static file.',
    ],
  },
  {
    icon: LockKeyhole,
    title: 'APK integrity',
    summary: 'Users can verify the downloaded APK with the published SHA-256 checksum.',
    points: [
      'Only download from www.debuggerssquad.com.',
      'Compare the APK checksum before sharing the installer.',
      'Avoid installing APK copies received from unknown sources.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Medical safety',
    summary: 'The app supports visualization and biofeedback, not clinical diagnosis.',
    points: [
      'Use under professional guidance for therapy or clinical workflows.',
      'Do not use app readings as nerve-conduction or diagnostic EMG results.',
      'Stop use and consult a clinician if symptoms worsen or feel unusual.',
    ],
  },
];

function formatBytes(bytes: number) {
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function NeuroPulseAppPage() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [copyMessage, setCopyMessage] = useState('');
  const currentScreenshot = screenshots[activeScreenshot];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScreenshot((current) => (current + 1) % screenshots.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const handleShare = async () => {
    if (typeof navigator === 'undefined') return;
    if (navigator.share) {
      await navigator.share({
        title: 'NeuroPulseAI App',
        text: 'Download the official NeuroPulseAI Android app.',
        url: appPageUrl,
      });
      return;
    }
    await navigator.clipboard.writeText(appPageUrl);
    setCopyMessage('Page link copied.');
  };

  const copyChecksum = async () => {
    await navigator.clipboard.writeText(release.sha256Checksum);
    setCopyMessage('Checksum copied.');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FF] pb-24 font-sans text-[#10233F]">
      <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-[#5E6F85]">
        <Link href="/" className="hover:text-[#0866E8]">Home</Link>
        <span> / </span>
        <Link href="/product" className="hover:text-[#0866E8]">Product</Link>
        <span> / </span>
        <span className="font-semibold text-[#062B5B]">NeuroPulseAI App</span>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-8 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <section className="rounded-3xl border border-[#DDE8F5] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-3xl shadow-lg shadow-blue-950/15 ring-1 ring-[#DDE8F5]">
                <Image
                  src="/images/neuropulseai/app-icon.svg"
                  alt="NeuroPulseAI app icon"
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-1">
                <span className="mb-3 inline-block rounded-full bg-[#E8F1FF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0866E8]">
                  Official Android APK
                </span>
                <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-[#062B5B]">NeuroPulseAI App</h1>
                <p className="mb-2 text-xl font-medium text-[#0866E8]">Wireless Surface EMG Biofeedback</p>
                <p className="text-sm font-medium text-[#5E6F85]">Debuggers Squad</p>

                <div className="mt-6 flex flex-wrap items-center gap-5 sm:gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-lg font-bold text-[#062B5B]">
                      New <Star className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" />
                    </div>
                    <span className="text-xs text-[#5E6F85]">Version {release.versionName}</span>
                  </div>
                  <div className="h-8 w-px bg-[#DDE8F5]" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-[#062B5B]">{formatBytes(release.fileSizeBytes)}</span>
                    <span className="text-xs text-[#5E6F85]">APK size</span>
                  </div>
                  <div className="h-8 w-px bg-[#DDE8F5]" />
                  <div className="flex flex-col">
                    <span className="rounded bg-[#F5F9FF] px-2 py-1 text-lg font-bold text-[#062B5B]">E</span>
                    <span className="text-xs text-[#5E6F85]">Everyone</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 hidden flex-col gap-4 sm:flex sm:flex-row">
              <a href={apkPath} download className="flex-1">
                <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0866E8] px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#1684FF]">
                  <Download className="h-6 w-6" />
                  Download APK
                </button>
              </a>
              <button type="button" onClick={handleShare} className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#DDE8F5] px-6 py-4 font-bold text-[#062B5B] transition-colors hover:bg-[#F5F9FF]">
                <Share2 className="h-5 w-5" /> Share
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-[#5E6F85]">
              <ShieldCheck className="h-4 w-4 text-[#20C878]" />
              Version {release.versionName} | {formatBytes(release.fileSizeBytes)} | Min Android {release.androidMinVersion}
            </p>
            {copyMessage && <p className="mt-2 text-xs font-semibold text-[#087A55]">{copyMessage}</p>}
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#DDE8F5] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-[#062B5B]">
                <Smartphone className="h-6 w-6 text-[#0866E8]" /> App Screenshots
              </h2>
              <div className="flex gap-2">
                <button type="button" onClick={() => setActiveScreenshot((current) => (current - 1 + screenshots.length) % screenshots.length)} aria-label="Previous screenshot" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE8F5] text-[#062B5B] hover:bg-[#F5F9FF]">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => setActiveScreenshot((current) => (current + 1) % screenshots.length)} aria-label="Next screenshot" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE8F5] text-[#062B5B] hover:bg-[#F5F9FF]">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative -mx-2 px-2">
              <div className="overflow-hidden rounded-[28px] bg-[#071B34] shadow-[0_24px_70px_-42px_rgba(6,43,91,0.75)] ring-1 ring-[#DDE8F5]">
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(-${activeScreenshot * 100}%)` }}
                >
                  {screenshots.map((screenshot, index) => (
                    <div key={screenshot.src} className="min-w-full bg-[#071B34] p-3 sm:p-5">
                      <div className="relative mx-auto aspect-[4/5] max-h-[620px] w-full overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 sm:aspect-[16/10]">
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          fill
                          sizes="(min-width: 1024px) 760px, 100vw"
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 border-t border-white/10 bg-[#062B5B] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-white">{currentScreenshot.label}</p>
                    <p className="mt-1 text-xs font-medium text-white/55">
                      {activeScreenshot + 1} of {screenshots.length}
                    </p>
                  </div>
                  <div className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:justify-end">
                    {screenshots.map((screenshot, index) => (
                      <button
                        key={screenshot.src}
                        type="button"
                        onClick={() => setActiveScreenshot(index)}
                        aria-label={`Show ${screenshot.label}`}
                        className={`h-2.5 flex-shrink-0 rounded-full transition-all ${
                          activeScreenshot === index ? 'w-9 bg-[#20E0D0]' : 'w-2.5 bg-white/35 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 hidden gap-3 overflow-hidden sm:flex">
                {screenshots.slice(0, 5).map((screenshot, index) => (
                  <button
                    key={screenshot.src}
                    type="button"
                    onClick={() => setActiveScreenshot(index)}
                    className={`relative aspect-[4/3] flex-1 overflow-hidden rounded-xl border bg-slate-50 transition ${
                      activeScreenshot === index ? 'border-[#20E0D0] shadow-lg shadow-cyan-500/15' : 'border-[#DDE8F5] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Image src={screenshot.src} alt="" fill sizes="140px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#DDE8F5] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#062B5B]">
              <Info className="h-6 w-6 text-[#0866E8]" /> About this app
            </h2>
            <div className="max-w-none leading-relaxed text-[#5E6F85]">
              <p>
                NeuroPulseAI is an Android companion application for the NeuroPulseAI compact wireless single-channel surface EMG system. It connects to the device through a local Wi-Fi connection and converts incoming muscle-activity signals into an understandable live visual experience.
              </p>
              <p className="mt-4">This download page is fully static. It does not require Supabase or any database to serve the APK.</p>
              <div className="mt-8 rounded-xl border border-orange-200 bg-[#FFF8E8] p-5">
                <h4 className="mb-2 font-bold text-orange-800">Medical Use Notice</h4>
                <p className="text-sm text-orange-700">
                  NeuroPulseAI provides surface EMG visualization and biofeedback support. It is not a substitute for professional medical diagnosis, nerve-conduction testing or clinical EMG interpretation.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#DDE8F5] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#062B5B]">
              <ShieldCheck className="h-6 w-6 text-[#0866E8]" /> Data Safety
            </h2>
            <div className="space-y-3">
              {safetyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <details key={item.title} className="group rounded-2xl border border-[#DDE8F5] bg-[#F9FCFF] p-5">
                    <summary className="flex cursor-pointer list-none items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0866E8]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-bold text-[#062B5B]">{item.title}</h3>
                          <ChevronRight className="h-5 w-5 flex-shrink-0 text-[#5E6F85] transition-transform group-open:rotate-90" />
                        </div>
                        <p className="mt-1 text-sm text-[#5E6F85]">{item.summary}</p>
                      </div>
                    </summary>
                    <ul className="mt-4 space-y-2 pl-0 text-sm text-[#5E6F85] sm:pl-[60px]">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <ClipboardCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#20C878]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-[#DDE8F5] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#062B5B]">
              <Smartphone className="h-6 w-6 text-[#0866E8]" /> How to Install
            </h2>
            <div className="space-y-4 text-[#5E6F85]">
              {['Tap Download APK and confirm the download.', 'Open the downloaded file from your browser.', 'If prompted, tap Settings and enable Allow from this source.', 'Tap Install and open NeuroPulseAI.'].map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] font-bold text-[#0866E8]">{index + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-[#DDE8F5] bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="mb-4 font-bold text-[#062B5B]">Scan APK Link</h3>
            <div className="mb-4 inline-block rounded-xl border border-[#DDE8F5] bg-white p-4">
              <div className="mx-auto flex h-48 w-48 items-center justify-center bg-white">
                <QRCodeCanvas value={apkUrl} size={180} level="H" includeMargin fgColor="#062B5B" />
              </div>
            </div>
            <p className="px-4 text-xs text-[#5E6F85]">Scan with your Android phone. Always confirm the page opens on www.debuggerssquad.com.</p>
          </div>

          <div className="rounded-3xl border border-[#DDE8F5] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="mb-6 font-bold text-[#062B5B]">Release Details</h3>
            <div className="space-y-4 text-sm text-[#5E6F85]">
              <div className="flex justify-between border-b border-[#DDE8F5] pb-2"><span>Version</span><span className="font-semibold text-[#10233F]">{release.versionName}</span></div>
              <div className="flex justify-between border-b border-[#DDE8F5] pb-2"><span>Updated</span><span className="font-semibold text-[#10233F]">{new Date(release.releaseDate).toLocaleDateString()}</span></div>
              <div className="flex justify-between border-b border-[#DDE8F5] pb-2"><span>Size</span><span className="font-semibold text-[#10233F]">{formatBytes(release.fileSizeBytes)}</span></div>
              <div className="flex flex-col gap-1 pt-2">
                <span>SHA-256 Checksum</span>
                <button type="button" onClick={copyChecksum} className="flex items-center justify-between gap-2 rounded-lg bg-[#F5F9FF] p-2 text-left font-mono text-xs hover:bg-[#E8F1FF]">
                  <span className="break-all">{release.sha256Checksum}</span>
                  <Copy className="h-4 w-4 flex-shrink-0 text-[#0866E8]" />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#DDE8F5] bg-[#062B5B] p-8 text-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Wifi className="mb-4 h-8 w-8 text-[#20E0D0]" />
            <h3 className="mb-2 font-bold">Direct Website Hosting</h3>
            <p className="text-sm leading-relaxed text-white/75">The APK is served from the website public folder. Supabase is not required for the download button.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DDE8F5] bg-white/90 p-4 shadow-[0_-10px_30px_rgb(0,0,0,0.05)] backdrop-blur-md sm:hidden">
        <a href={apkPath} download className="block w-full">
          <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0866E8] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#1684FF]">
            <Download className="h-5 w-5" /> Download APK v{release.versionName}
          </button>
        </a>
      </div>
    </div>
  );
}
