"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Secure File Distribution
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">
            A centralized portal for accessing hosted files, releases, and
            digital resources. Designed with performance, clarity, and security
            in mind.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/downloads"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              View Downloads
            </Link>
            <Link
              href="/support"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Support
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">
              Structured Releases
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              Clearly versioned and organized file distribution for reliable
              access and tracking.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">
              Performance Focused
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              Optimized delivery with a minimal, responsive interface built for
              speed and clarity.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">
              Secure & Reliable
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              Hosted with secure standards and designed to ensure dependable
              file availability.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}