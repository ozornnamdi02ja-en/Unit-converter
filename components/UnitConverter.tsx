"use client";

import { useState } from "react";
import { CATS, GROUP_ORDER, convert, formatNumber } from "@/liberty/units";

export default function UnitConverter() {
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
    <div className="unit-converter">

      {/* Masthead */}
      <div className="text-black flex items-end gap-4 pb-4 mb-6 border-b-2
       border-blue-700 rounded-md">
        <div className="relative flex h-12 w-12 flex-none items-center justify-center 
        rounded-full border-2
         border-green-700 font-serif text-xl italic sm:h-[52px] sm:w-[52px]">
          ≈<span className="  pointer-events-none absolute inset-[6px] rounded-full border
           border-blue-950" />
        </div>
        <div>
          <h1 className="font-bold text-sm leading-none tracking-wide sm:text-4xl">
            GROUP 3 UNIT CONVERTER PROJECT
          </h1>
          <p className="mt-1.5 max-w-[46ch] text-md leading-snug text-blue-700">
            One instrument for translating between the units of mathematics, physics,
            chemistry, computing, and everyday measure that is KNOWN.
          </p>
        </div>
        <div className="ml-auto hidden text-right font-bold
         uppercase leading-relaxed tracking-widest text-black sm:block">
          <br />
          Universal Scale
        </div>
      </div>

      <div className=" bg-green-600/40 text-black 
      grid grid-cols-1 items-start  md:grid-cols-[210px_1fr] 
       rounded-full">
        {/* Category rail */}
        <nav className="flex gap-1.5 overflow-x-auto border-b border-yellow-500 
        pb-2 md:flex-col md:gap-4 md:overflow-visible md:border-b-0 md:pb-0">
          {GROUP_ORDER.map((group) => (
            <div key={group} className="bg-green-300 rounded contents md:block">
              <h3 className="ml-0.5 mb-1.5 hidden font-bold 
               text-black md:block">
                {group}
              </h3>
              {Object.entries(CATS)
                .filter(([, c]) => c.group === group)
                .map(([key, c]) => (
                  <button
                    key={key}
                    onClick={() => selectCategory(key)}
                    className={`flex-none whitespace-nowrap border-b-2 px-2.5 py-1.5
                       text-left text-sm transition-colors md:whitespace-normal md:border-b-0 
                       md:border-l-2 md:px-0 md:py-1 md:pl-2.5 ${
                      key === catKey
                        ? "border-yellow-500 font-semibold text-black"
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
        <main className=" border border-blue-400 rounded-md">
          <div className=" bg-[#F9A8D4]/40 border-b border-blue-400 px-6 pb-3.5 pt-5 rounded-md">
            <h2 className="mb-1 font-bold ">{cat.label}</h2>
            <p className="text-sm leading-relaxed font-semibold text-black">{cat.desc}</p>
          </div>

          <div className="bg-[#D6DBE5] grid grid-cols-1 items-end gap-3.5 px-6 pb-2 pt-5 
          sm:grid-cols-[1fr_auto_1fr] rounded-sm">
            <div >
              <label className="mb-1.5 block font-bold uppercase tracking-[0.12em]
               text-black ">
                From
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromChange(e.target.value)}
                className="mb-2 w-full rounded-full border-blue-900
                 bg-paper px-2.5 py-2.5 font-bold text-black focus:outline focus:outline-1
                  focus:outline-blue-700"
              />
              <select
                value={fromUnit}
                onChange={(e) => handleFromUnitChange(e.target.value)}
                className="w-full rounded-full border border-blue-900 bg-paper2 px-2 py-2 
                font-sans text-sm text-purple-600 cursor-pointer"
              >
                {unitKeys.map((uk) => (
                  <option key={uk} value={uk}>
                    {cat.units[uk].label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={swap}
              aria-label="Swap units"
              title="Swap units"
              className="mb-9 flex h-9 w-9 rotate-90 items-center justify-center justify-self-center 
              rounded-full border-[1.5px] border-green-900 text-base transition-colors
               hover:bg-green-300 hover:text-panel sm:rotate-0"
            >
              ⇄
            </button>

            <div>
              <label className="mb-1.5 block font-bold 
               uppercase tracking-[0.12em] text-black rounded-full">
                To
              </label>
              <input
                type="number"
                value={toValue}
                onChange={(e) => handleToChange(e.target.value)}
                className="mb-2 w-full rounded-full border-[1.5px]
                 border-accent2 px-2.5 py-2.5 font-bold
                  text-black focus:outline focus:outline-1 focus:outline-blue-700"
              />
              <select
                value={toUnit}
                onChange={(e) => handleToUnitChange(e.target.value)}
                className="w-full rounded-full border border-red-900
                 bg-paper2 px-2 py-2 font-sans text-sm text-black cursor-pointer"
              >
                {unitKeys.map((uk) => (
                  <option key={uk} value={uk}>
                    {cat.units[uk].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tape readout — the signature element */}
          <div className="px-6 pb-1 pt-4 bg-[#D6DBE5] ">
            <div className="tape-perf rounded-full bg-pink-300/40 px-4 py-3.5 font-bold
            text-sm leading-relaxed text-[#04070e]">
              <span className="mb-1.5 block font-bold uppercase tracking-[0.12em]
               text-[#2c5fd6]">
                Reads as
              </span>
              {tapeText}
            </div>
          </div>

          {/* Quick chips */}
          <div className="bg-[#D6DBE5] flex flex-wrap items-center gap-2 px-6 pb-6 pt-5">
            <span className="mr-1 font-bold uppercase tracking-[0.12em] text-blue-950">
              Try:
            </span>
            {cat.quick.map((v) => (
              <button
                key={v}
                onClick={() => handleQuick(v)}
                className="rounded-full border border-yellow-600 bg-paper
                 px-2.5 py-1.5 font-bold text-blue-500 transition-colors
                  hover:border-ink hover:text-green-600"
              >
                {v}
              </button>
            ))}
          </div>
        </main>
      </div>

      <footer className=" bg-[#86EFAC]/50 text-center font-bold tracking-wide text-black">
        Every figure above is computed live · Values based on SI definitions
      </footer>
    </div>
  );
}
