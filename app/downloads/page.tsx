"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DownloadCounts = {
  [key: string]: number;
};

const downloadNames = [
  "NateLauncher",
  "MissionchiefBot",
  "MissionchiefBotX",
  "MilitaryChiefCLI",
];

export default function DownloadsPage() {
  const [downloadCounts, setDownloadCounts] = useState<DownloadCounts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const counts: DownloadCounts = {};

      for (const name of downloadNames) {
        try {
          const response = await fetch(
            `https://api.natemarcellus.com/download/info/${name}`,
            { credentials: "include" }
          );
          const data = await response.json();
          counts[name] = data.downloads ?? data.downloadCount ?? 0;
        } catch {
          counts[name] = 0;
        }
      }

      setDownloadCounts(counts);
      setLoading(false);
    };

    fetchDownloadCounts();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Downloads
        </h1>
        <p className="mt-6 text-lg text-neutral-300">
          Explore available tools and resources hosted on
          files.natemarcellus.com.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:bg-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Missionchief Bot X
            </h2>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              NEW
            </span>
          </div>

          <p className="mt-4 text-sm text-neutral-300">
            Automates tasks and transportation handling to streamline credit
            generation workflows.
          </p>

          <p className="mt-6 text-sm font-mono text-neutral-400">
            Downloads:{" "}
            {loading
              ? "Loading..."
              : downloadCounts["MissionchiefBotX"] ?? 0}
          </p>

          <Link
            href="/downloads/MissionchiefBotX"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
          >
            Download
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:bg-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Old Missionchief Bot
            </h2>
            <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
              OLD
            </span>
          </div>

          <p className="mt-4 text-sm text-neutral-300">
            Archived legacy version of the Missionchief Bot.
          </p>

          <p className="mt-6 text-sm font-mono text-neutral-400">
            Downloads:{" "}
            {loading
              ? "Loading..."
              : downloadCounts["MissionchiefBot"] ?? 0}
          </p>

          <Link
            href="/downloads/MissionchiefBot"
            className="mt-6 inline-block rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Download
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white">NateLauncher</h2>

          <p className="mt-4 text-sm text-neutral-300">
            Central launcher for managing and running supported tools.
            Recommended for Missionchief Bot usage.
          </p>

          <p className="mt-6 text-sm font-mono text-neutral-400">
            Downloads:{" "}
            {loading ? "Loading..." : downloadCounts["NateLauncher"] ?? 0}
          </p>

          <Link
            href="/downloads/NateLauncher"
            className="mt-6 inline-block rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Download
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white">
            MilitaryChiefCLI (WIP)
          </h2>

          <p className="mt-4 text-sm text-neutral-300">
            Work-in-progress CLI-based spin-off tailored for advanced
            operational workflows.
          </p>

          <p className="mt-6 text-sm font-mono text-neutral-400">
            Downloads:{" "}
            {loading
              ? "Loading..."
              : downloadCounts["MilitaryChiefCLI"] ?? 0}
          </p>

          <Link
            href="/downloads/MilitaryChiefCLI"
            className="mt-6 inline-block rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Download
          </Link>
        </div>
      </div>
    </section>
  );
}