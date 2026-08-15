"use client";

import { useState } from "react";
import { CATS, GROUP_ORDER, convert, formatNumber } from "@/liberty/units";

export default function UnitConverter() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [catKey, setCatKey] = useState<string>("length");
  const cat = CATS[catKey];
  const unitKeys = Object.keys(cat.units);

  const [fromUnit, setFromUnit] = useState<string>(unitKeys[0]);
  const [toUnit, setToUnit] = useState<string>(unitKeys[1] ?? unitKeys[0]);
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>(() =>
    formatNumber(convert("length", 1, unitKeys[0], unitKeys[1] ?? unitKeys[0]))
  );

  function selectCategory(key: string) {
    const c = CATS[key];
    const uks = Object.keys(c.units);
    const nf = uks[0];
    const nt = uks[1] ?? uks[0];
    setCatKey(key);
    setFromUnit(nf);
    setToUnit(nt);
    setFromValue("1");
    setToValue(formatNumber(convert(key, 1, nf, nt)));
  }

  function handleFromChange(v: string) {
    setFromValue(v);
    const num = parseFloat(v);
    setToValue(isNaN(num) ? "" : formatNumber(convert(catKey, num, fromUnit, toUnit)));
  }

  function handleToChange(v: string) {
    setToValue(v);
    const num = parseFloat(v);
    setFromValue(isNaN(num) ? "" : formatNumber(convert(catKey, num, toUnit, fromUnit)));
  }

  function handleFromUnitChange(u: string) {
    setFromUnit(u);
    const num = parseFloat(fromValue);
    setToValue(isNaN(num) ? "" : formatNumber(convert(catKey, num, u, toUnit)));
  }

  function handleToUnitChange(u: string) {
    setToUnit(u);
    const num = parseFloat(fromValue);
    setToValue(isNaN(num) ? "" : formatNumber(convert(catKey, num, fromUnit, u)));
  }

  function swap() {
    const nf = toUnit;
    const nt = fromUnit;
    const nfv = toValue || fromValue;
    setFromUnit(nf);
    setToUnit(nt);
    setFromValue(nfv);
    const num = parseFloat(nfv);
    setToValue(isNaN(num) ? "" : formatNumber(convert(catKey, num, nf, nt)));
  }

  function handleQuick(v: number) {
    setFromValue(String(v));
    setToValue(formatNumber(convert(catKey, v, fromUnit, toUnit)));
  }

  const fromLabel = cat.units[fromUnit]?.label.replace(/\s*\([^)]*\)/, "") ?? "";
  const toLabel = cat.units[toUnit]?.label.replace(/\s*\([^)]*\)/, "") ?? "";
  const tapeText =
    fromValue !== "" && toValue !== ""
      ? `${fromValue} ${fromLabel} — in ${toLabel.toLowerCase()} — reads ${toValue}`
      : "—";

  return (
    <div className={`unit-converter rounded-3xl transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-white" : ""}`}>

      {/* Masthead */}
      <div className={`text-white flex pb-4 mb-6 border-b-2 rounded-md ${isDarkMode ? "border-slate-800" : "border-blue-700"}`}>
        <div className="px-5 p-10 text-justify center ">
          <h1 className={`mb-6 font-bold text-sm leading-none tracking-wide sm:text-4xl text-center ${isDarkMode ? "text-white" : "text-white"}`}>
            GROUP 3 UNIT CONVERTER PROJECT
          </h1>
          <p className={`mt-1.5 max-w-[46ch] text-md leading-snug font-bold ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}>
            A unified converter for transforming measurements across mathematics, 
            physics, chemistry, computing, and everyday life.
          </p>
        </div>

        <div className={`ml-auto text-center font-bold uppercase leading-relaxed tracking-widest sm:block relative flex flex-col items-center justify-center pt-2 pb-6 h-12 w-12 flex-none rounded-full border-2 font-serif text-xl italic sm:h-[52px] sm:w-[52px] mt-9 mb-4 mr-10 ${isDarkMode ? "border-green-500 text-white" : "border-green-700 text-white"}`}>
          SI<span className="pointer-events-none absolute inset-[6px] rounded-full border border-orange-500" />
        </div>
      </div>

      <div className={`grid grid-cols-1 items-start md:grid-cols-[210px_1fr] rounded-3xl ${isDarkMode ? "bg-slate-900 text-white" : "bg-green-600/40 text-black"}`}>
        {/* Category rail */}
        <nav className={`flex gap-1.5 overflow-x-auto border-b pb-2 md:flex-col md:gap-4 md:overflow-visible md:border-b-0 md:pb-0 ${isDarkMode ? "border-slate-800" : "border-yellow-800"}`}>
          {GROUP_ORDER.map((group) => (
            <div key={group} className={`rounded contents md:block ${isDarkMode ? "bg-slate-800/60" : "bg-green-700"}`}>
              <h3 className={`ml-0.5 mb-1.5 hidden font-bold md:block ${isDarkMode ? "text-slate-300" : "text-black"}`}>
                {group}
              </h3>
              {Object.entries(CATS)
                .filter(([, c]) => c.group === group)
                .map(([key, c]) => (
                  <button
                    key={key}
                    onClick={() => selectCategory(key)}
                    className={`flex-none whitespace-nowrap border-b-2 px-2.5 py-1.5 text-left text-sm transition-colors md:whitespace-normal md:border-b-0 md:border-l-2 md:px-0 md:py-1 md:pl-2.5 ${
                      key === catKey
                        ? isDarkMode 
                          ? "border-yellow-400 font-semibold text-yellow-400" 
                          : "border-yellow-700 font-semibold text-black"
                        : isDarkMode
                          ? "border-transparent text-slate-400 hover:text-blue-400"
                          : "border-transparent text-white hover:text-blue-500"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        {/* Main panel */}
        <main className={`border rounded-md ${isDarkMode ? "border-slate-800" : "border-blue-400"}`}>
          {/* Header Info Box */}
          <div className={`border-b px-6 pb-3.5 pt-5 rounded-md ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-[#F9A8D4]/40 border-blue-500"}`}>
            <h2 className={`mb-1 font-bold ${isDarkMode ? "text-blue-400" : "text-blue-900"}`}>{cat.label}</h2>
            <p className={`text-sm leading-relaxed font-semibold ${isDarkMode ? "text-slate-300" : "text-black"}`}>{cat.desc}</p>
          </div>

          {/* FROM / TO Input Box */}
          <div className={`grid grid-cols-1 items-end gap-3.5 px-6 pb-2 pt-5 sm:grid-cols-[1fr_auto_1fr] rounded-sm ${isDarkMode ? "bg-slate-900" : "bg-[#D6DBE5]"}`}>
            <div>
              <label className={`mb-1.5 block font-bold uppercase tracking-[0.12em] ${isDarkMode ? "text-slate-300" : "text-black"}`}>
                From
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromChange(e.target.value)}
                className={`mb-2 w-full rounded-full px-2.5 py-2.5 font-bold focus:outline focus:outline-1 focus:outline-blue-700 ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "border-blue-900 bg-paper text-black"}`}
              />
              <select
                value={fromUnit}
                onChange={(e) => handleFromUnitChange(e.target.value)}
                className={`w-full rounded-full border px-2 py-2 font-sans text-sm cursor-pointer ${isDarkMode ? "bg-slate-800 border-slate-700 text-purple-400" : "border-blue-900 bg-paper2 text-purple-600"}`}
              >
                {unitKeys.map((uk) => (
                  <option key={uk} value={uk} className={isDarkMode ? "bg-slate-900 text-white" : ""}>
                    {cat.units[uk].label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={swap}
              aria-label="Swap units"
              title="Swap units"
              className={`mb-9 flex h-9 w-9 rotate-90 items-center justify-center justify-self-center rounded-full border-[1.5px] text-base transition-colors sm:rotate-0 ${isDarkMode ? "border-green-500 text-white hover:bg-green-900/40" : "border-green-900 hover:bg-green-300 hover:text-slate-950"}`}
            >
              ⇄
            </button>

            <div>
              <label className={`mb-1.5 block font-bold uppercase tracking-[0.12em] rounded-full ${isDarkMode ? "text-slate-300" : "text-black"}`}>
                To
              </label>
              <input
                type="number"
                value={toValue}
                onChange={(e) => handleToChange(e.target.value)}
                className={`mb-2 w-full rounded-full border-[1.5px] px-2.5 py-2.5 font-bold focus:outline focus:outline-1 focus:outline-blue-700 ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "border-accent2 text-black"}`}
              />
              <select
                value={toUnit}
                onChange={(e) => handleToUnitChange(e.target.value)}
                className={`w-full rounded-full border px-2 py-2 font-sans text-sm cursor-pointer ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "border-red-900 bg-paper2 text-black"}`}
              >
                {unitKeys.map((uk) => (
                  <option key={uk} value={uk} className={isDarkMode ? "bg-slate-900 text-white" : ""}>
                    {cat.units[uk].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tape readout */}
          <div className={`px-6 pb-1 pt-4 ${isDarkMode ? "bg-slate-900" : "bg-[#D6DBE5]"}`}>
            <div className={`tape-perf rounded-full px-4 py-3.5 font-bold text-sm leading-relaxed ${isDarkMode ? "bg-slate-800 text-slate-200" : "bg-pink-300/40 text-[#04070e]"}`}>
              <span className={`mb-1.5 block font-bold uppercase tracking-[0.12em] ${isDarkMode ? "text-blue-400" : "text-[#2c5fd6]"}`}>
                Reads as
              </span>
              {tapeText}
            </div>
          </div>

          {/* Quick chips with DARK MODE BUTTON at the right corner */}
          <div className={`flex flex-wrap items-center justify-between gap-2 px-6 pb-6 pt-5 ${isDarkMode ? "bg-slate-900" : "bg-[#D6DBE5]"}`}>
            <div className="flex items-center gap-2">
              <span className={`mr-1 font-bold uppercase tracking-[0.12em] ${isDarkMode ? "text-blue-400" : "text-blue-950"}`}>
                TRY:
              </span>
              {cat.quick.map((v) => (
                <button
                  key={v}
                  onClick={() => handleQuick(v)}
                  className={`rounded-full border px-2.5 py-1.5 font-bold transition-colors ${isDarkMode ? "border-slate-700 bg-slate-800 text-blue-400 hover:border-slate-500" : "border-yellow-600 bg-paper text-blue-500 hover:border-ink hover:text-green-600"}`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider border transition-all hover:scale-105 ${
                isDarkMode 
                  ? "bg-slate-800 border-yellow-500 text-yellow-400" 
                  : "bg-slate-900 border-slate-700 text-white"
              }`}
            >
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </main>
      </div>

      <footer className={`text-center font-bold tracking-wide mt-4 py-2 rounded-xl ${isDarkMode ? "bg-slate-900 text-slate-400" : "bg-[#86EFAC]/50 text-black"}`}>
        The all-in-one converter for scientific, digital, and everyday units.
        Values based on SI definitions.
      </footer>
    </div>
  );
}