export type LinearUnit = { label: string; f: number };

export type LinearCategory = {
  type: "linear";
  label: string;
  group: string;
  base: string;
  desc: string;
  units: Record<string, LinearUnit>;
  quick: number[];
};

export type SpecialUnit = { label: string };

export type SpecialCategory = {
  type: "special";
  label: string;
  group: string;
  base: string;
  desc: string;
  units: Record<string, SpecialUnit>;
  toBase: (v: number, u: string) => number;
  fromBase: (b: number, u: string) => number;
  quick: number[];
};

export type Category = LinearCategory | SpecialCategory;

/* =========================================================
   UNIT DATA
   Linear categories store factor = value of 1 unit expressed
   in the stated SI base unit. Special categories (temperature,
   fuel economy) define their own toBase / fromBase functions
   because the relationship isn't a simple multiplier.
========================================================= */

export const CATS: Record<string, Category> = {
  // ==========================================
  // 📐 MATHEMATICS & GEOMETRY
  // ==========================================
  angle: {
    type: "linear",
    label: "Angle",
    group: "Mathematics",
    base: "radian",
    desc: "Rotation and inclination, in the language of geometry.",
    units: {
      radian: { label: "Radian (rad)", f: 1 },
      degree: { label: "Degree (°)", f: 0.0174532925 },
      arcminute: { label: "Arcminute (′)", f: 0.0002908882 },
      arcsecond: { label: "Arcsecond (″)", f: 0.0000048481 },
      gradian: { label: "Gradian (grad)", f: 0.0157079633 },
      revolution: { label: "Revolution (turn)", f: 6.2831853072 },
    },
    quick: [1, 45, 90],
  },

  area: {
    type: "linear",
    label: "Area",
    group: "Mathematics",
    base: "square metre",
    desc: "Two-dimensional extent, from crop fields to continents.",
    units: {
      sqMillimetre: { label: "Square millimetre (mm²)", f: 1e-6 },
      sqCentimetre: { label: "Square centimetre (cm²)", f: 1e-4 },
      sqMetre: { label: "Square metre (m²)", f: 1 },
      hectare: { label: "Hectare (ha)", f: 10000 },
      sqKilometre: { label: "Square kilometre (km²)", f: 1e6 },
      sqInch: { label: "Square inch (in²)", f: 0.00064516 },
      sqFoot: { label: "Square foot (ft²)", f: 0.09290304 },
      sqYard: { label: "Square yard (yd²)", f: 0.83612736 },
      acre: { label: "Acre (ac)", f: 4046.8564224 },
      sqMile: { label: "Square mile (mi²)", f: 2589988.110336 },
    },
    quick: [1, 10, 100],
  },

  // ==========================================
  // 🔬 PHYSICS & ENGINEERING
  // ==========================================
  length: {
    type: "linear",
    label: "Length",
    group: "Physics",
    base: "metre",
    desc: "Distance, from the atomic to the astronomical.",
    units: {
      nanometre: { label: "Nanometre (nm)", f: 1e-9 },
      micrometre: { label: "Micrometre (µm)", f: 1e-6 },
      millimetre: { label: "Millimetre (mm)", f: 0.001 },
      centimetre: { label: "Centimetre (cm)", f: 0.01 },
      metre: { label: "Metre (m)", f: 1 },
      kilometre: { label: "Kilometre (km)", f: 1000 },
      inch: { label: "Inch (in)", f: 0.0254 },
      foot: { label: "Foot (ft)", f: 0.3048 },
      yard: { label: "Yard (yd)", f: 0.9144 },
      mile: { label: "Mile (mi)", f: 1609.344 },
      nauticalMile: { label: "Nautical mile (nmi)", f: 1852 },
      angstrom: { label: "Ångström (Å)", f: 1e-10 },
      astronomicalUnit: { label: "Astronomical unit (AU)", f: 1.495978707e11 },
      lightYear: { label: "Light-year (ly)", f: 9.4607304725808e15 },
      parsec: { label: "Parsec (pc)", f: 3.0856775814913673e16 },
    },
    quick: [1, 10, 100],
  },

  mass: {
    type: "linear",
    label: "Mass",
    group: "Physics",
    base: "kilogram",
    desc: "Quantity of matter, from particles to planets.",
    units: {
      microgram: { label: "Microgram (µg)", f: 1e-9 },
      milligram: { label: "Milligram (mg)", f: 1e-6 },
      gram: { label: "Gram (g)", f: 0.001 },
      kilogram: { label: "Kilogram (kg)", f: 1 },
      tonne: { label: "Tonne / metric ton (t)", f: 1000 },
      ounce: { label: "Ounce (oz)", f: 0.028349523125 },
      pound: { label: "Pound (lb)", f: 0.45359237 },
      stone: { label: "Stone (st)", f: 6.35029318 },
      shortTon: { label: "US ton (short ton)", f: 907.18474 },
      longTon: { label: "Imperial ton (long ton)", f: 1016.0469088 },
      carat: { label: "Carat (ct)", f: 0.0002 },
      atomicMassUnit: { label: "Atomic mass unit (u)", f: 1.66053906660e-27 },
    },
    quick: [1, 10, 100],
  },

  speed: {
    type: "linear",
    label: "Speed",
    group: "Physics",
    base: "metre/second",
    desc: "Rate of travel, from a walking pace to light itself.",
    units: {
      metrePerSecond: { label: "Metre/second (m/s)", f: 1 },
      kilometrePerHour: { label: "Kilometre/hour (km/h)", f: 0.277777778 },
      milePerHour: { label: "Mile/hour (mph)", f: 0.44704 },
      footPerSecond: { label: "Foot/second (ft/s)", f: 0.3048 },
      knot: { label: "Knot (kn)", f: 0.514444444 },
      mach: { label: "Mach (at 20°C air)", f: 343 },
      speedOfLight: { label: "Speed of light (c)", f: 299792458 },
    },
    quick: [1, 10, 100],
  },

  force: {
    type: "linear",
    label: "Force",
    group: "Physics",
    base: "newton",
    desc: "Push and pull, as felt by objects and structures.",
    units: {
      newton: { label: "Newton (N)", f: 1 },
      dyne: { label: "Dyne (dyn)", f: 1e-5 },
      kilogramForce: { label: "Kilogram-force (kgf)", f: 9.80665 },
      poundForce: { label: "Pound-force (lbf)", f: 4.4482216153 },
      poundal: { label: "Poundal (pdl)", f: 0.138254954376 },
    },
    quick: [1, 10, 100],
  },

  pressure: {
    type: "linear",
    label: "Pressure",
    group: "Physics",
    base: "pascal",
    desc: "Force distributed over area, from weather to welding.",
    units: {
      pascal: { label: "Pascal (Pa)", f: 1 },
      kilopascal: { label: "Kilopascal (kPa)", f: 1000 },
      bar: { label: "Bar", f: 100000 },
      atmosphere: { label: "Standard atmosphere (atm)", f: 101325 },
      psi: { label: "Pound/sq inch (psi)", f: 6894.757293 },
      torr: { label: "Torr", f: 133.3223684 },
      mmHg: { label: "Millimetre of mercury (mmHg)", f: 133.3223684 },
    },
    quick: [1, 10, 100],
  },

  torque: {
    type: "linear",
    label: "Torque",
    group: "Physics",
    base: "newton-metre",
    desc: "Rotational force, as applied by wrenches and engines.",
    units: {
      newtonMetre: { label: "Newton-metre (N·m)", f: 1 },
      kilogramForceMetre: { label: "Kilogram-force metre (kgf·m)", f: 9.80665 },
      poundFoot: { label: "Pound-foot (lb·ft)", f: 1.3558179483 },
      poundInch: { label: "Pound-inch (lb·in)", f: 0.1129848290 },
    },
    quick: [1, 10, 100],
  },

  density: {
    type: "linear",
    label: "Density",
    group: "Physics",
    base: "kilogram/cubic metre",
    desc: "Mass packed into a given volume of matter.",
    units: {
      kgPerM3: { label: "Kilogram/m³ (kg/m³)", f: 1 },
      gPerCm3: { label: "Gram/cm³ (g/cm³)", f: 1000 },
      gPerML: { label: "Gram/mL (g/mL)", f: 1000 },
      kgPerL: { label: "Kilogram/litre (kg/L)", f: 1000 },
      lbPerFt3: { label: "Pound/ft³ (lb/ft³)", f: 16.01846337 },
      lbPerIn3: { label: "Pound/in³ (lb/in³)", f: 27679.90471 },
    },
    quick: [1, 10, 100],
  },

  power: {
    type: "linear",
    label: "Power",
    group: "Physics",
    base: "watt",
    desc: "Energy delivered per second, from bulbs to engines.",
    units: {
      watt: { label: "Watt (W)", f: 1 },
      kilowatt: { label: "Kilowatt (kW)", f: 1000 },
      megawatt: { label: "Megawatt (MW)", f: 1e6 },
      horsepower: { label: "Horsepower (hp)", f: 745.699872 },
      btuPerHour: { label: "BTU/hour", f: 0.29307107 },
      footPoundPerMinute: { label: "Foot-pound/minute", f: 0.0225969658 },
    },
    quick: [1, 10, 100],
  },

  frequency: {
    type: "linear",
    label: "Frequency",
    group: "Physics",
    base: "hertz",
    desc: "Cycles per second, from rotations to radio waves.",
    units: {
      hertz: { label: "Hertz (Hz)", f: 1 },
      kilohertz: { label: "Kilohertz (kHz)", f: 1000 },
      megahertz: { label: "Megahertz (MHz)", f: 1e6 },
      gigahertz: { label: "Gigahertz (GHz)", f: 1e9 },
      rpm: { label: "Revolution/minute (rpm)", f: 0.0166666667 },
    },
    quick: [1, 10, 100],
  },

  // ==========================================
  // 🧪 CHEMISTRY
  // ==========================================
  amount: {
    type: "linear",
    label: "Amount of Substance",
    group: "Chemistry",
    base: "mole",
    desc: "The chemist's count of particles — atoms, ions, or molecules.",
    units: {
      mole: { label: "Mole (mol)", f: 1 },
      millimole: { label: "Millimole (mmol)", f: 0.001 },
      micromole: { label: "Micromole (µmol)", f: 1e-6 },
      kilomole: { label: "Kilomole (kmol)", f: 1000 },
      atomsAvogadro: { label: "× Avogadro's number (particles)", f: 1 / 6.02214076e23 },
    },
    quick: [1, 10, 100],
  },

  concentration: {
    type: "linear",
    label: "Molar Concentration",
    group: "Chemistry",
    base: "mole/litre",
    desc: "Solute per solution volume, as read on a titration flask.",
    units: {
      molarM: { label: "Molar (mol/L)", f: 1 },
      millimolar: { label: "Millimolar (mmol/L)", f: 0.001 },
      micromolar: { label: "Micromolar (µmol/L)", f: 1e-6 },
      molPerM3: { label: "Mole/m³ (mol/m³)", f: 0.001 },
      molPerCm3: { label: "Mole/cm³ (mol/cm³)", f: 1000 },
    },
    quick: [1, 10, 100],
  },

  energy: {
    type: "linear",
    label: "Energy",
    group: "Chemistry",
    base: "joule",
    desc: "Capacity to do work, from a calorie to a kilowatt-hour.",
    units: {
      joule: { label: "Joule (J)", f: 1 },
      kilojoule: { label: "Kilojoule (kJ)", f: 1000 },
      calorie: { label: "Calorie (cal)", f: 4.184 },
      kilocalorie: { label: "Kilocalorie / food Calorie (kcal)", f: 4184 },
      wattHour: { label: "Watt-hour (Wh)", f: 3600 },
      kilowattHour: { label: "Kilowatt-hour (kWh)", f: 3.6e6 },
      electronvolt: { label: "Electronvolt (eV)", f: 1.602176634e-19 },
      btu: { label: "British thermal unit (BTU)", f: 1055.05585262 },
      footPound: { label: "Foot-pound (ft·lb)", f: 1.3558179483 },
    },
    quick: [1, 10, 100],
  },

  // ==========================================
  // 💻 COMPUTING
  // ==========================================
  data: {
    type: "linear",
    label: "Data Storage",
    group: "Computing",
    base: "byte",
    desc: "Digital information, decimal and binary alike.",
    units: {
      bit: { label: "Bit (b)", f: 0.125 },
      byte: { label: "Byte (B)", f: 1 },
      kilobyte: { label: "Kilobyte (KB, 1000 B)", f: 1e3 },
      megabyte: { label: "Megabyte (MB, 1000² B)", f: 1e6 },
      gigabyte: { label: "Gigabyte (GB, 1000³ B)", f: 1e9 },
      terabyte: { label: "Terabyte (TB, 1000⁴ B)", f: 1e12 },
      kibibyte: { label: "Kibibyte (KiB, 1024 B)", f: 1024 },
      mebibyte: { label: "Mebibyte (MiB, 1024² B)", f: 1048576 },
      gibibyte: { label: "Gibibyte (GiB, 1024³ B)", f: 1073741824 },
      tebibyte: { label: "Tebibyte (TiB, 1024⁴ B)", f: 1099511627776 },
    },
    quick: [1, 10, 100],
  },

  // ==========================================
  // 🧬 BIOLOGY & HEALTH / EVERYDAY MEASURES
  // ==========================================
  volume: {
    type: "linear",
    label: "Volume",
    group: "Biology & Everyday",
    base: "cubic metre",
    desc: "Capacity and displacement, from a teaspoon to a reservoir.",
    units: {
      millilitre: { label: "Millilitre (mL)", f: 1e-6 },
      cubicCentimetre: { label: "Cubic centimetre (cm³)", f: 1e-6 },
      litre: { label: "Litre (L)", f: 0.001 },
      cubicMetre: { label: "Cubic metre (m³)", f: 1 },
      teaspoon: { label: "Teaspoon (tsp)", f: 4.92892159375e-6 },
      tablespoon: { label: "Tablespoon (tbsp)", f: 1.478676478125e-5 },
      fluidOunceUS: { label: "US fluid ounce (fl oz)", f: 2.95735295625e-5 },
      cupUS: { label: "US cup", f: 2.365882365e-4 },
      pintUS: { label: "US pint (pt)", f: 4.73176473e-4 },
      quartUS: { label: "US quart (qt)", f: 9.46352946e-4 },
      gallonUS: { label: "US gallon (gal)", f: 3.785411784e-3 },
      gallonImperial: { label: "Imperial gallon (gal)", f: 4.54609e-3 },
      cubicInch: { label: "Cubic inch (in³)", f: 1.6387064e-5 },
      cubicFoot: { label: "Cubic foot (ft³)", f: 0.028316846592 },
      barrelOil: { label: "Oil barrel (bbl)", f: 0.158987294928 },
    },
    quick: [1, 10, 100],
  },

  time: {
    type: "linear",
    label: "Time",
    group: "Biology & Everyday",
    base: "second",
    desc: "Duration, from nanoseconds to centuries.",
    units: {
      nanosecond: { label: "Nanosecond (ns)", f: 1e-9 },
      microsecond: { label: "Microsecond (µs)", f: 1e-6 },
      millisecond: { label: "Millisecond (ms)", f: 0.001 },
      second: { label: "Second (s)", f: 1 },
      minute: { label: "Minute (min)", f: 60 },
      hour: { label: "Hour (h)", f: 3600 },
      day: { label: "Day (d)", f: 86400 },
      week: { label: "Week (wk)", f: 604800 },
      month: { label: "Month (avg., 30.44 d)", f: 2629800 },
      year: { label: "Year (365.25 d)", f: 31557600 },
      decade: { label: "Decade", f: 315576000 },
      century: { label: "Century", f: 3155760000 },
    },
    quick: [1, 10, 100],
  },

  temperature: {
    type: "special",
    label: "Temperature",
    group: "Biology & Everyday",
    base: "celsius",
    desc: "Thermal state, translated between four historical scales.",
    units: {
      celsius: { label: "Celsius (°C)" },
      fahrenheit: { label: "Fahrenheit (°F)" },
      kelvin: { label: "Kelvin (K)" },
      rankine: { label: "Rankine (°R)" },
    },
    toBase: (v, u) => {
      switch (u) {
        case "celsius":
          return v;
        case "fahrenheit":
          return ((v - 32) * 5) / 9;
        case "kelvin":
          return v - 273.15;
        case "rankine":
          return ((v - 491.67) * 5) / 9;
        default:
          return v;
      }
    },
    fromBase: (c, u) => {
      switch (u) {
        case "celsius":
          return c;
        case "fahrenheit":
          return (c * 9) / 5 + 32;
        case "kelvin":
          return c + 273.15;
        case "rankine":
          return ((c + 273.15) * 9) / 5;
        default:
          return c;
      }
    },
    quick: [0, 20, 100],
  },

  fuelEconomy: {
    type: "special",
    label: "Fuel Economy",
    group: "Biology & Everyday",
    base: "litres/100km",
    desc: "Efficiency of travel, an inverse relationship by nature.",
    units: {
      litresPer100km: { label: "Litres/100 km (L/100km)" },
      kmPerLitre: { label: "Kilometres/litre (km/L)" },
      mpgUS: { label: "Miles/gallon, US (mpg)" },
      mpgUK: { label: "Miles/gallon, Imperial (mpg)" },
    },
    toBase: (v, u) => {
      if (v === 0) return Infinity;
      switch (u) {
        case "litresPer100km":
          return v;
        case "kmPerLitre":
          return 100 / v;
        case "mpgUS":
          return 235.214583 / v;
        case "mpgUK":
          return 282.480936 / v;
        default:
          return v;
      }
    },
    fromBase: (b, u) => {
      if (b === 0) return Infinity;
      switch (u) {
        case "litresPer100km":
          return b;
        case "kmPerLitre":
          return 100 / b;
        case "mpgUS":
          return 235.214583 / b;
        case "mpgUK":
          return 282.480936 / b;
        default:
          return b;
      }
    },
    quick: [5, 8, 30],
  },
};

export const GROUP_ORDER = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computing",
  "Biology & Everyday",
];

/* =========================================================
   CONVERSION CORE
========================================================= */
export function convert(
  catKey: string,
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  const cat = CATS[catKey];
  if (cat.type === "linear") {
    const base = value * cat.units[fromUnit].f;
    return base / cat.units[toUnit].f;
  }
  const base = cat.toBase(value, fromUnit);
  return cat.fromBase(base, toUnit);
}

/* =========================================================
   FORMATTING
========================================================= */
export function formatNumber(n: number): string {
  if (!isFinite(n)) return "∞";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs < 1e-6 || abs >= 1e12) {
    return n.toExponential(5).replace(/e\+?/, " × 10^");
  }
  const out = parseFloat(n.toPrecision(8));
  if (Math.abs(out) < 1e-6 || Math.abs(out) >= 1e12) {
    return n.toExponential(5).replace(/e\+?/, " × 10^");
  }
  return out.toString();
}