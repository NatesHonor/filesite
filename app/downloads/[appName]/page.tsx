"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type VersionResponse = {
  latest: string;
  versions: string[];
};

export default function AppPage() {
  const params = useParams();
  const appName = Array.isArray(params?.appName) ? params.appName[0] : params?.appName;
  const [versions, setVersions] = useState<string[]>([]);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [changelogContent, setChangelogContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appName) return;

    const fetchVersions = async () => {
      try {
        const response = await fetch(
          `https://api.natemarcellus.com/version/${appName.toLowerCase()}`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch versions");
        const data: VersionResponse = await response.json();
        setVersions(data.versions || []);
        setLatestVersion(data.latest || null);

        const changelogResponse = await fetch(
          `/MarkDownFiles/${appName}Latest.md`
        );
        const changelogText = await changelogResponse.text();
        setChangelogContent(changelogText);
      } catch {
        setVersions([]);
        setLatestVersion(null);
        setChangelogContent("Unable to load changelog.");
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, [appName]);

  if (loading) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <h2 className="text-2xl font-semibold text-white">Loading...</h2>
        <p className="mt-4 text-neutral-400">
          Please wait while we fetch the latest information.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          {appName}
        </h1>
        <p className="mt-6 text-lg text-neutral-300">
          The ultimate automation tool designed to streamline operational workflows.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          {latestVersion && (
            <Link
              href={`/thank-you/${appName}/latest`}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              Download v{latestVersion}
            </Link>
          )}
          <a
            href="https://support.natemarcellus.com/docs/missionchief-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Browse Wiki
          </a>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">Changelog</h2>
        <div className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-p:text-neutral-300 prose-strong:text-white">
          <ReactMarkdown>{changelogContent}</ReactMarkdown>
        </div>
      </div>

      {versions.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-white">Previous Versions</h3>
          <div className="mt-6 flex flex-wrap gap-4">
            {versions.map((version) => (
              <Link
                key={version}
                href={`/thank-you/${appName}/${version}`}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Download v{version}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}