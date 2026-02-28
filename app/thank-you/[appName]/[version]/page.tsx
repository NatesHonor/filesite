"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ThankYou() {
  const params = useParams();
  const appName = params?.appName ?? "";
  const version = params?.version ?? "";

  const [countdown, setCountdown] = useState(5);
  const [amount, setAmount] = useState("");
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");

  const startDownload = useCallback(async () => {
    if (!appName || !version) return;

    const response = await fetch(
      `https://api.natemarcellus.com/download/${appName}/${version}`,
      { credentials: "include" }
    );

    if (!response.ok) return;

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${version}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }, [appName, version]);

  useEffect(() => {
    setCountdown(5);
    setDownloadStarted(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDownloadStarted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const downloadTimer = setTimeout(() => {
      startDownload();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(downloadTimer);
    };
  }, [startDownload]);

  useEffect(() => {
    if (!appName || !version) return;

    const filePath =
      version.toLowerCase() === "latest"
        ? `/MarkDownFiles/${appName}Latest.md`
        : `/MarkDownFiles/${appName}${version}.md`;

    fetch(filePath)
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text))
      .catch(() => {});
  }, [appName, version]);

  const sanitizedAmount = amount && Number(amount) > 0 ? amount : "";

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 shadow-xl">
          <h1 className="text-3xl font-semibold mb-4">
            Thank You for Downloading{" "}
            {version.toLowerCase() === "latest"
              ? `${appName} Latest`
              : `${appName} v${version}`}
          </h1>

          <p className="text-neutral-400">
            {countdown > 0
              ? `Your download will start in ${countdown} seconds...`
              : "Download is starting..."}
          </p>

          {downloadStarted && (
            <button
              onClick={startDownload}
              className="mt-4 px-6 py-2 rounded-xl bg-white text-black font-medium hover:opacity-80 transition"
            >
              Click here if it didn't start
            </button>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 shadow-xl space-y-6">
          <h2 className="text-xl font-semibold">Support development</h2>

          <div className="flex flex-wrap gap-3">
            {[5, 10, 20, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(String(val))}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
              >
                ${val}
              </button>
            ))}

            <input
              type="number"
              min="0"
              placeholder="Other amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <a
              href={
                sanitizedAmount
                  ? `https://paypal.me/natemarcellus/${sanitizedAmount}`
                  : "#"
              }
              target="_blank"
              className="px-6 py-2 rounded-xl bg-white text-black font-medium hover:opacity-80 transition"
            >
              PayPal
            </a>

            <a
              href={
                sanitizedAmount
                  ? `https://cash.app/$natejmar/${sanitizedAmount}`
                  : "#"
              }
              target="_blank"
              className="px-6 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
            >
              Cash App
            </a>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 shadow-xl prose prose-invert max-w-none">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}