import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  FileText,
  Plus,
  Trash2,
  Send,
  Calculator,
  Upload,
  CheckCircle,
  ArrowRight,
  Car,
  Euro,
  Save,
  User,
  UserPlus,
  Loader,
  Pencil,
  X,
  MapPin,
  Calendar,
  Lock,
  Sparkles,
  AlertCircle,
  ShoppingCart,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";

// --- CONFIGURATIE ---
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwL3CNGGu6_GsCsJEYRSLegaFuft8TvKpHtw0Wddhsw3v--1-1SA3qDEq21HNB8DanP5A/exec";
const TOEGANGSCODE = "3521";

// --- HUISSTIJL CONFIGURATIE ---
// PLAK HIER DE LINK NAAR JE LOGO OF DE BASE64 STRING VAN 'The Declaratie Office.png'
const LOGO_URL =
  "data:image/png;base64,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";

const COLORS = {
  primary: "#003B95",
  secondary: "#2563EB",
  accent: "#F97316",
  bg: "#F3F4F6",
  textMain: "#1F2937",
  textLight: "#6B7280",
};

const GROOTBOEK_OPTIES = [
  { code: "4055", naam: "Kantinekosten" },
  { code: "4070", naam: "Representatie en verteer" },
  { code: "4075", naam: "Onbelaste reiskosten (23 ct per km)" },
  { code: "5520", naam: "Kantoorkosten" },
  { code: "5540", naam: "Verkoopkosten" },
  { code: "5570", naam: "Reis- en verblijfkosten" },
  { code: "5590", naam: "Software, tel, website" },
  { code: "7100", naam: "Inkoop derden (OOP)" },
];

const KM_VERGOEDING = 0.23;
const STANDAARD_MEDEWERKERS = [
  { id: 1, naam: "Joep Pennartz", email: "joep.pennartz@theexperienceoffice.nl" },
  { id: 2, naam: "Joep Heerings", email: "joep.heerings@theexperienceoffice.nl" },
  { id: 3, naam: "Kevin Schuurmans", email: "kevin.schuurmans@theexperienceoffice.nl" },
];

const MONEY_GIFS = [
  "https://media.giphy.com/media/l0Ex6kAKAoFRsFh6M/giphy.gif",
  "https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif",
  "https://media.giphy.com/media/9HQRIttS5C4Za/giphy.gif",
  "https://media.giphy.com/media/sDcfxFDozb3bO/giphy.gif",
  "https://media.giphy.com/media/LCdPNT81vlv3y/giphy.gif",
  "https://media.giphy.com/media/ND6xkVPaj8tHO/giphy.gif",
  "https://media.giphy.com/media/gJha9m3045fsOG0Zhk/giphy.gif",
  "https://media.giphy.com/media/LdOyjZ7io5Msw/giphy.gif",
];

// --- HULPFUNCTIES ---
const formatDateNL = (isoDate) => {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return isoDate;
};

const parseDecimalInput = (val) => {
  let cleaned = String(val).replace(/[^0-9.,]/g, "");
  let parseable = cleaned.replace(/,/g, ".");
  return { weergegevenWaarde: cleaned, rekenWaarde: parseFloat(parseable) };
};

async function scanWithBackend(base64Image) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      redirect: "follow",
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "scan_document",
        image: base64Image.split(",")[1],
        mimeType: "image/jpeg",
      }),
    });
    const json = await response.json();
    if (json.status === "success" && json.data) return json.data;
    else throw new Error(json.message || "Geen resultaat");
  } catch (error) {
    alert(`Scannen mislukt. Vul handmatig in.\n(Fout: ${error.message})`);
    return null;
  }
}

async function convertPdfToImage(pdfBase64) {
  if (typeof window.pdfjsLib === "undefined") {
    alert("PDF Tool nog niet geladen. Ververs de pagina.");
    return null;
  }
  try {
    const pdfData = atob(pdfBase64);
    const loadingTask = window.pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    return canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
  } catch (e) {
    console.error("PDF Convert Error", e);
    return null;
  }
}

// --- PROJECT DROPDOWN COMPONENT ---
const ProjectDropdown = ({ value, onChange, projecten, setProjecten, syncProjecten }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const actieveProjecten = projecten.filter((p) => p.actief);
  
  const gefilterdeProjecten = query === "" 
    ? actieveProjecten 
    : actieveProjecten.filter((p) => 
        p.naam.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  gefilterdeProjecten.sort((a, b) => {
    if (!a.lastUsed) return 1;
    if (!b.lastUsed) return -1;
    return new Date(b.lastUsed) - new Date(a.lastUsed);
  });

  const selectedProjectName = projecten.find(p => p.id === value)?.naam || "";

  const handleSelect = (id) => {
    const pName = projecten.find(p => p.id === id)?.naam || "";
    onChange(id, pName); // Fix: geef ook direct de naam mee!
    setQuery("");
    setIsOpen(false);
  };

  const handleCreate = async () => {
    if (!query) return;
    const newProject = {
      id: Date.now(),
      naam: query,
      actief: true,
      lastUsed: new Date().toISOString()
    };
    const updatedList = [...projecten, newProject];
    setProjecten(updatedList);
    onChange(newProject.id, newProject.naam); // Fix: geef direct de naam van het nieuwe project mee!
    setQuery("");
    setIsOpen(false);
    await syncProjecten(updatedList);
  };

  const handleDeactivate = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Project archiveren en uit deze lijst halen?")) {
      const updatedList = projecten.map(p => p.id === id ? { ...p, actief: false } : p);
      setProjecten(updatedList);
      if (value === id) onChange("", "");
      await syncProjecten(updatedList);
    }
  };

  return (
    <div className="relative font-['Lato']" ref={dropdownRef}>
      <div 
        className={`w-full p-3 border rounded-lg bg-white flex justify-between items-center cursor-text transition-colors ${isOpen ? 'border-[#003B95] ring-2 ring-blue-100' : 'border-gray-300'}`}
        onClick={() => setIsOpen(true)}
      >
        {!isOpen && selectedProjectName ? (
           <div className="flex-1 flex items-center justify-between">
              <span className="font-medium text-gray-800">{selectedProjectName}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onChange("", ""); setIsOpen(true); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
           </div>
        ) : (
          <input
            type="text"
            className="w-full outline-none bg-transparent placeholder-gray-400"
            placeholder={selectedProjectName || "Zoek of typ een nieuw project..."}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
          />
        )}
        {!isOpen && !selectedProjectName && <ChevronDown size={18} className="text-gray-400" />}
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-white/90 backdrop-blur border-b">
            Projecten
          </div>
          {gefilterdeProjecten.length > 0 ? (
            gefilterdeProjecten.map((p) => (
              <div 
                key={p.id} 
                className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 group"
                onClick={() => handleSelect(p.id)}
              >
                <span className="text-gray-800 font-medium">{p.naam}</span>
                <button 
                  onClick={(e) => handleDeactivate(e, p.id)}
                  className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                  title="Archiveren"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">Geen bestaande projecten gevonden</div>
          )}
          
          {query && !gefilterdeProjecten.some(p => p.naam.toLowerCase() === query.toLowerCase()) && (
            <div 
              className="p-3 bg-yellow-50 hover:bg-yellow-100 cursor-pointer flex items-center gap-2 border-t border-yellow-200 text-yellow-800 font-medium"
              onClick={handleCreate}
            >
              <div className="bg-yellow-200 px-2 py-1 rounded text-xs">Maak</div>
              "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- LOGIN ---
const LoginView = ({ onLogin }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === TOEGANGSCODE) onLogin();
    else {
      setError(true);
      setCode("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-700"
      style={{ backgroundColor: COLORS.primary }}
    >
      <div className="w-full max-w-md text-center">
        <div className="mb-10 flex justify-center">
          <img
            src={LOGO_URL}
            alt="The Declaratie Office"
            className="h-24 object-contain brightness-0 invert"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <h1 className="sr-only">The Declaratie Office</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white">
          <div className="mb-6">
            <Lock size={48} className="mx-auto text-white/80 mb-4" />
            <h2 className="text-2xl font-bold font-['Poppins'] mb-2">
              Weet jij het wachtwoord?
            </h2>
            <p className="text-blue-100 font-['Lato'] text-sm">
              Voer hem in en krijg toegang tot een geheel nieuwe declaratie-ervaring! <br />
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`w-full p-4 text-center text-3xl tracking-[0.5em] font-['Poppins'] bg-white/20 border-2 rounded-xl outline-none transition text-white placeholder-white/30 focus:bg-white/30 ${
                  error ? "border-red-400 shake" : "border-white/30 focus:border-white"
                }`}
                placeholder="••••"
                value={code}
                onChange={(e) => {
                  setError(false);
                  setCode(e.target.value);
                }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-[#003B95] py-4 rounded-xl font-bold font-['Poppins'] text-lg hover:bg-blue-50 transition transform active:scale-95 shadow-lg"
            >
              Unlock Experience
            </button>
          </form>
          {error && (
            <p className="mt-4 text-red-300 text-sm animate-pulse">
              Toegang geweigerd. Probeer het opnieuw.
            </p>
          )}
        </div>
        <p className="text-blue-300/60 mt-8 text-xs font-['Lato']">
          The Experience Office &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

// --- MEDEWERKERS BEHEER ---
const MedewerkerView = ({
  medewerkers,
  setMedewerkers,
  setActieveMedewerker,
  setView,
  isLoadingMw,
  refreshMedewerkers,
}) => {
  const [nieuweNaam, setNieuweNaam] = useState("");
  const [nieuwEmail, setNieuwEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Fix: voorkom dubbel wegschrijven

  const kiesMedewerker = (mw) => {
    setActieveMedewerker(mw);
    setView("home");
  };

  const syncMedewerkers = async (nieuweLijst) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "update_medewerkers",
          medewerkers: nieuweLijst,
        }),
      });
    } catch (e) {
      console.error("Fout bij opslaan medewerkers", e);
    }
  };

  const voegMedewerkerToe = async () => {
    if (isSaving) return;
    if (nieuweNaam && nieuwEmail) {
      setIsSaving(true);
      const nieuweMw = { id: Date.now(), naam: nieuweNaam, email: nieuwEmail };
      const nieuweLijst = [...medewerkers, nieuweMw];
      setMedewerkers(nieuweLijst);
      await syncMedewerkers(nieuweLijst);
      setActieveMedewerker(nieuweMw);
      setIsSaving(false);
      setView("home");
    }
  };

  const verwijderMedewerker = async (e, id, naam) => {
    e.stopPropagation();
    if (window.confirm(`Weet je zeker dat je ${naam} wilt verwijderen?`)) {
      const nieuweLijst = medewerkers.filter((m) => m.id !== id);
      setMedewerkers(nieuweLijst);
      await syncMedewerkers(nieuweLijst);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 animate-in fade-in duration-700">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#003B95] font-['Poppins'] mb-2">
          Wie ben jij?
        </h1>
        <p className="text-gray-600 font-['Lato']">
          Selecteer je naam om te beginnen.
        </p>
      </div>
      {isLoadingMw ? (
        <div className="text-center py-10 text-gray-400">
          <Loader className="animate-spin mx-auto mb-2" />
          Collega's ophalen...
        </div>
      ) : !isAdding ? (
        <div className="space-y-3">
          {medewerkers.map((mw) => (
            <div
              key={mw.id}
              onClick={() => kiesMedewerker(mw)}
              className="w-full bg-white border border-gray-200 p-5 rounded-xl hover:border-[#003B95] hover:shadow-md transition flex items-center justify-between group cursor-pointer relative"
            >
              <div className="flex flex-col text-left">
                <span className="font-bold text-gray-800 font-['Poppins']">
                  {mw.naam}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-[#003B95] font-['Lato']">
                  {mw.email}
                </span>
              </div>
              <button
                onClick={(e) => verwijderMedewerker(e, mw.id, mw.naam)}
                className="text-gray-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition z-10"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl hover:bg-gray-100 transition text-gray-600 flex items-center justify-center gap-2 mt-4 font-['Lato']"
          >
            <UserPlus size={20} /> Nieuwe collega toevoegen
          </button>
          <button
            onClick={refreshMedewerkers}
            className="w-full text-xs text-gray-400 mt-4 underline font-['Lato']"
          >
            Lijst verversen
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-[#003B95] font-['Poppins']">
            Nieuwe Collega
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003B95] outline-none font-['Lato']"
              value={nieuweNaam}
              onChange={(e) => setNieuweNaam(e.target.value)}
              placeholder="Naam"
              disabled={isSaving}
            />
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003B95] outline-none font-['Lato']"
              value={nieuwEmail}
              onChange={(e) => setNieuwEmail(e.target.value)}
              placeholder="Email"
              disabled={isSaving}
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { setIsAdding(false); setNieuweNaam(""); setNieuwEmail(""); }}
                className="flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-['Lato']"
                disabled={isSaving}
              >
                Annuleren
              </button>
              <button
                onClick={voegMedewerkerToe}
                disabled={isSaving || !nieuweNaam || !nieuwEmail}
                className="flex-1 py-2 bg-[#003B95] text-white rounded-lg hover:bg-blue-800 font-['Poppins'] font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              >
                {isSaving ? (
                  <>
                    <Loader className="animate-spin" size={16} /> Opslaan...
                  </>
                ) : (
                  "Starten"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HOME VIEW ---
const HomeView = ({ setView, actieveMedewerker, setShowGlobalPopup }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-8 animate-in fade-in duration-700">
      <div className="bg-blue-50 p-6 rounded-full ring-4 ring-blue-100">
        <FileText size={48} className="text-[#003B95]" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-[#003B95] font-['Poppins']">
          Welkom {actieveMedewerker?.naam.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 max-w-md mt-2 font-['Lato']">
          Klaar om je declaraties in te dienen?
        </p>
      </div>

      <button
        onClick={() => setView("keuze_type")}
        className="bg-[#003B95] text-white px-8 py-5 rounded-2xl font-bold font-['Poppins'] shadow-xl hover:bg-blue-800 transition flex items-center gap-3 transform hover:scale-105 duration-200"
      >
        <Plus size={24} /> Start nieuwe declaratie
      </button>

      <button
        onClick={() => setShowGlobalPopup(true)}
        className="text-sm text-gray-400 hover:text-[#003B95] mt-8 flex items-center gap-1 font-['Lato']"
      >
        <User size={12} /> Ben jij niet {actieveMedewerker?.naam}? Klik hier.
      </button>
    </div>
  );
};

// --- TYPE KEUZE VIEW ---
const TypeKeuzeView = ({ startNieuweDeclaratie, setView, declaraties }) => (
  <div className="max-w-md mx-auto p-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-[#003B95] mb-4 font-['Poppins']">
      Wat wil je declareren?
    </h2>

    <button
      onClick={() => startNieuweDeclaratie("onkosten")}
      className="w-full bg-white border-2 border-gray-100 p-6 rounded-2xl hover:border-[#003B95] hover:bg-blue-50 transition text-left flex items-center gap-5 group shadow-sm hover:shadow-lg"
    >
      <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-200 transition-colors">
        <Euro size={28} className="text-green-700" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 font-['Poppins'] text-lg">
          Algemene onkosten
        </h3>
        <p className="text-sm text-gray-500 font-['Lato']">
          Bonnetje, lunch of kantoorartikelen
        </p>
      </div>
    </button>

    <button
      onClick={() => startNieuweDeclaratie("reiskosten")}
      className="w-full bg-white border-2 border-gray-100 p-6 rounded-2xl hover:border-[#003B95] hover:bg-blue-50 transition text-left flex items-center gap-5 group shadow-sm hover:shadow-lg"
    >
      <div className="bg-orange-100 p-4 rounded-xl group-hover:bg-orange-200 transition-colors">
        <Car size={28} className="text-orange-700" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 font-['Poppins'] text-lg">
          Reiskosten (KM)
        </h3>
        <p className="text-sm text-gray-500 font-['Lato']">
          Kilometervergoeding voor autoritten
        </p>
      </div>
    </button>

    <button
      onClick={() => declaraties.length > 0 ? setView("overzicht") : setView("home")}
      className="text-gray-400 w-full text-center mt-4 hover:text-[#003B95] transition font-['Lato'] text-sm uppercase tracking-wide font-bold"
    >
      Annuleren {declaraties.length > 0 ? "(terug naar overzicht)" : ""}
    </button>
  </div>
);

// --- FORMULIER VIEW ---
const FormulierView = ({
  huidigeDeclaratie,
  setHuidigeDeclaratie,
  setView,
  opslaanDeclaratie,
  hasDeclaraties,
  projecten,
  setProjecten,
  syncProjecten,
  aiFields,
  setAiFields,
  categoryConfirmed,
  setCategoryConfirmed
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [calculatingDistance, setCalculatingDistance] = useState(false);
  const [showSplitView, setShowSplitView] = useState(false);

  const isAfwijkendBtw = huidigeDeclaratie.btwPercentage === "custom";
  const isAiCategory = !!aiFields.grootboek;

  const updateField = (field, value) => {
    if (aiFields[field]) {
      setAiFields((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
    if (field === "grootboek") setCategoryConfirmed(true);

    let updates = { [field]: value };
    let newState = { ...huidigeDeclaratie, ...updates };

    if (field === "totaalBedrag" || field === "kilometers" || field === "btwBedrag") {
       const result = parseDecimalInput(value);
       updates[field] = result.weergegevenWaarde; 
       newState[field] = result.rekenWaarde; 
    }

    if (huidigeDeclaratie.type === "reiskosten") {
      if (field === "kilometers") {
        const parsedKm = parseDecimalInput(value).rekenWaarde;
        if(!isNaN(parsedKm)) {
          const tot = (parsedKm * KM_VERGOEDING).toFixed(2);
          updates.totaalBedrag = tot;
        }
      }
      else if (field === "isRetour") {
        let huidigeKm = parseDecimalInput(huidigeDeclaratie.kilometers).rekenWaarde || 0;
        let newKm = value ? huidigeKm * 2 : huidigeKm / 2;
        updates.kilometers = newKm.toString();
        updates.totaalBedrag = (newKm * KM_VERGOEDING).toFixed(2);
      }
    } else if (
      field === "totaalBedrag" ||
      field === "btwPercentage" ||
      (field === "btwBedrag" && isAfwijkendBtw)
    ) {
      const totaal = parseDecimalInput(newState.totaalBedrag).rekenWaarde;
      const perc = newState.btwPercentage;
      if (!isNaN(totaal)) {
        if (perc === "custom") {
          const manualVat = parseDecimalInput(newState.btwBedrag).rekenWaarde || 0;
          updates.bedragExcl = (totaal - manualVat).toFixed(2);
        } else if (perc !== "" && !isNaN(parseFloat(perc))) {
          const percVal = parseFloat(perc);
          const excl = totaal / (1 + percVal / 100);
          const vatAmount = totaal - excl;
          updates.bedragExcl = excl.toFixed(2);
          updates.btwBedrag = vatAmount.toFixed(2);
        }
      }
    }
    setHuidigeDeclaratie((prev) => ({ ...prev, ...updates }));
  };

  const berekenAfstand = async () => {
    if (!huidigeDeclaratie.van || !huidigeDeclaratie.naar) {
      alert("Vul eerst 'Van' en 'Naar' in.");
      return;
    }
    setCalculatingDistance(true);
    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=calculate_distance&van=${encodeURIComponent(
        huidigeDeclaratie.van
      )}&naar=${encodeURIComponent(huidigeDeclaratie.naar)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "success" && data.km) {
        let km = parseFloat(data.km);
        if (huidigeDeclaratie.isRetour) km = km * 2;
        updateField("kilometers", km.toFixed(2));
        if (data.van_adres && data.naar_adres) {
          updateField("van", data.van_adres);
          updateField("naar", data.naar_adres);
        }
      } else {
        alert("Kon afstand niet berekenen. Probeer het handmatig.");
      }
    } catch (e) {
      alert("Fout bij berekenen. Check je verbinding.");
    } finally {
      setCalculatingDistance(false);
    }
  };

  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const mimeType = base64Data.split(";")[0].split(":")[1];

        setHuidigeDeclaratie((prev) => ({
          ...prev,
          bestandNaam: file.name,
          bestandData: base64Data,
          methode: "scan",
        }));
        setIsScanning(true);

        let imageToScan = null;
        if (mimeType === "application/pdf") {
          const pdfImg = await convertPdfToImage(base64Data.split(",")[1]);
          if (pdfImg) {
            imageToScan = "data:image/jpeg;base64," + pdfImg;
          } else {
            setIsScanning(false);
            return;
          }
        } else {
          imageToScan = base64Data;
        }

        const scanResult = await scanWithBackend(imageToScan);

        if (scanResult) {
          setHuidigeDeclaratie((prev) => {
            let newExcl = prev.bedragExcl;
            let newVat = prev.btwBedrag;
            const tot = parseFloat(scanResult.totaalBedrag);
            const percVal = scanResult.btwPercentage !== null ? scanResult.btwPercentage : "";

            if (!isNaN(tot) && percVal !== "" && !isNaN(parseFloat(percVal))) {
              const excl = tot / (1 + parseFloat(percVal) / 100);
              newExcl = excl.toFixed(2);
              newVat = (tot - excl).toFixed(2);
            } else if (scanResult.btwBedrag && scanResult.btwPercentage === "custom") {
              newVat = parseFloat(scanResult.btwBedrag).toFixed(2);
              newExcl = (tot - newVat).toFixed(2);
            }

            return {
              ...prev,
              datum: scanResult.datum || "",
              totaalBedrag: !isNaN(tot) ? tot.toString() : "",
              btwPercentage: percVal,
              btwBedrag: newVat,
              bedragExcl: newExcl,
              leverancier: scanResult.leverancier || prev.leverancier,
              omschrijving: scanResult.omschrijving || "",
              grootboek: scanResult.grootboek || "",
            };
          });

          const found = scanResult.aiFound || {};
          setAiFields(found);
          if (found.grootboek) setCategoryConfirmed(false);
          setShowSplitView(true);
        }
        setIsScanning(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    if (hasDeclaraties) setView("overzicht");
    else setView("keuze_type");
  };
  
  const getFieldStyle = (fieldName) => {
    if (aiFields[fieldName]) return "border-purple-500 bg-purple-50 focus:ring-purple-500";
    return "border-gray-300 focus:ring-[#003B95]";
  };

  const isFormValid = () => {
    const { datum, omschrijving, totaalBedrag, grootboek, btwPercentage, project } = huidigeDeclaratie;
    if (!datum || !totaalBedrag || !grootboek || !project || !omschrijving) return false;
    if (huidigeDeclaratie.type === "onkosten" && (!huidigeDeclaratie.leverancier || !btwPercentage || btwPercentage === "")) return false;
    if (isAiCategory && !categoryConfirmed) return false;
    return true;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl animate-in fade-in duration-300 border border-gray-100">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 font-['Poppins'] text-[#003B95]">
              {huidigeDeclaratie.type === "reiskosten" ? <Car size={24} /> : <Euro size={24} />}
              {huidigeDeclaratie.type === "reiskosten" ? "Reiskosten invoeren" : "Onkosten invoeren"}
            </h2>
            {huidigeDeclaratie.bestandData && (
              <button
                onClick={() => setShowSplitView(!showSplitView)}
                className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border transition font-['Lato'] ${
                  showSplitView ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {showSplitView ? <EyeOff size={16} /> : <Eye size={16} />}
                {showSplitView ? "Verberg factuur" : "Bekijk factuur"}
              </button>
            )}
          </div>

          {huidigeDeclaratie.type === "onkosten" && (
            <div className={`mb-6 border-2 border-dashed rounded-xl p-6 text-center transition relative group ${isScanning ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:bg-blue-50 hover:border-[#003B95]"}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {isScanning ? (
                <div className="animate-pulse flex flex-col items-center">
                  <Sparkles className="text-purple-500 mb-2 animate-spin" size={32} />
                  <p className="text-purple-600 font-medium">Factuur analyseren...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-600 group-hover:text-[#003B95] transition-colors">
                  {huidigeDeclaratie.bestandNaam ? (
                    <>
                      <CheckCircle className="text-green-500 mb-2" size={32} />
                      <span className="font-bold text-gray-800 font-['Poppins']">{huidigeDeclaratie.bestandNaam}</span>
                      <span className="text-xs font-['Lato']">Klik om te wijzigen</span>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-100 p-3 rounded-full mb-2">
                        <Sparkles className="text-[#003B95]" size={24} />
                      </div>
                      <span className="font-bold text-lg font-['Poppins']">Scan de factuur met AI</span>
                      <span className="text-sm text-gray-400 mt-1 font-['Lato']">Upload een foto of PDF</span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {Object.keys(aiFields).length > 0 && (
            <div className="mb-6 bg-purple-50 border border-purple-200 text-purple-700 p-3 rounded-lg flex items-start gap-2 text-sm font-['Lato']">
              <Sparkles size={18} className="mt-0.5 flex-shrink-0" />
              <p>
                De AI heeft velden voor je ingevuld (paars gemarkeerd). Controleer deze goed!
              </p>
            </div>
          )}

          <div className="space-y-4 font-['Lato']">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project *</label>
              <ProjectDropdown 
                value={huidigeDeclaratie.project}
                onChange={(val, valNaam) => { // Fix: vang ook direct de projectnaam op
                  updateField("project", val);
                  updateField("projectNaam", valNaam || "");
                }}
                projecten={projecten}
                setProjecten={setProjecten}
                syncProjecten={syncProjecten}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {huidigeDeclaratie.type === "reiskosten" ? "Datum van rit *" : "Factuurdatum *"}
              </label>
              <div className="relative">
                <input
                  type="date"
                  className={`w-full p-3 pl-10 border rounded-lg outline-none ${getFieldStyle("datum")}`}
                  value={huidigeDeclaratie.datum}
                  onChange={(e) => updateField("datum", e.target.value)}
                />
                <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {huidigeDeclaratie.type === "onkosten" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Leverancier *</label>
                  <input
                    type="text"
                    className={`w-full p-3 border rounded-lg outline-none transition ${getFieldStyle("leverancier")}`}
                    placeholder="Bijv. Coolblue"
                    value={huidigeDeclaratie.leverancier}
                    onChange={(e) => updateField("leverancier", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Omschrijving onkosten *</label>
                  <input
                    type="text"
                    className={`w-full p-3 border rounded-lg outline-none transition ${getFieldStyle("omschrijving")}`}
                    placeholder="Wat heb je gekocht/besteld?"
                    value={huidigeDeclaratie.omschrijving}
                    onChange={(e) => updateField("omschrijving", e.target.value)}
                  />
                </div>
              </>
            )}

            {huidigeDeclaratie.type === "reiskosten" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Omschrijving *</label>
                  <input
                    type="text"
                    className={`w-full p-3 border rounded-lg outline-none transition ${getFieldStyle("omschrijving")}`}
                    placeholder="Bijv. Vervoer eindproduct naar klant"
                    value={huidigeDeclaratie.omschrijving}
                    onChange={(e) => updateField("omschrijving", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Traject</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Van"
                      className="flex-1 p-3 border rounded-lg"
                      value={huidigeDeclaratie.van}
                      onChange={(e) => updateField("van", e.target.value)}
                    />
                    <ArrowRight size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Naar"
                      className="flex-1 p-3 border rounded-lg"
                      value={huidigeDeclaratie.naar}
                      onChange={(e) => updateField("naar", e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#003B95] rounded"
                        checked={huidigeDeclaratie.isRetour || false}
                        onChange={(e) => updateField("isRetour", e.target.checked)}
                      />
                      <span>Retour (x2)</span>
                    </label>
                    <button
                      onClick={berekenAfstand}
                      disabled={calculatingDistance || !huidigeDeclaratie.van || !huidigeDeclaratie.naar}
                      className="text-sm bg-blue-50 text-[#003B95] px-3 py-1 rounded hover:bg-blue-100 flex items-center gap-1 font-bold"
                    >
                      {calculatingDistance ? <Loader className="animate-spin" size={14} /> : <MapPin size={14} />}
                      {calculatingDistance ? "Berekenen..." : "Bereken afstand"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aantal kilometers</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-yellow-50 font-medium"
                    value={huidigeDeclaratie.kilometers}
                    onChange={(e) => updateField("kilometers", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1 font-medium font-sans">x €{KM_VERGOEDING}/km</p>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Totaalbedrag (incl. BTW) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 font-semibold">€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    className={`w-full p-3 pl-8 border rounded-lg outline-none font-bold ${getFieldStyle("totaalBedrag")}`}
                    placeholder="0.00"
                    value={huidigeDeclaratie.totaalBedrag}
                    onChange={(e) => updateField("totaalBedrag", e.target.value)}
                    readOnly={huidigeDeclaratie.type === "reiskosten"}
                  />
                </div>
              </div>
              {huidigeDeclaratie.type !== "reiskosten" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BTW percentage *</label>
                  <select
                    className={`w-full p-3 border rounded-lg bg-white font-semibold ${getFieldStyle("btwPercentage")}`}
                    value={huidigeDeclaratie.btwPercentage}
                    onChange={(e) => updateField("btwPercentage", e.target.value)}
                  >
                    <option value="">-- Kies --</option>
                    <option value="21">21% (Hoog)</option>
                    <option value="9">9% (Laag)</option>
                    <option value="0">0% / Geen</option>
                    <option value="custom">Afwijkend / Meerdere</option>
                  </select>
                </div>
              )}
            </div>

            {huidigeDeclaratie.type !== "reiskosten" && (
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-600 border border-gray-100 items-center font-medium">
                <div>
                  Excl. BTW:
                  <span className="font-bold text-gray-900 block text-lg font-['Poppins']">
                    € {huidigeDeclaratie.bedragExcl || "0.00"}
                  </span>
                </div>
                <div>
                  BTW Bedrag:
                  {isAfwijkendBtw ? (
                    <div className="relative mt-1">
                      <span className="absolute left-2 top-2 text-gray-500 font-semibold">€</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        className="w-full p-2 pl-6 border border-blue-300 rounded focus:ring-2 focus:ring-[#003B95] outline-none bg-white font-semibold"
                        value={huidigeDeclaratie.btwBedrag}
                        onChange={(e) => updateField("btwBedrag", e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  ) : (
                    <span className="font-bold text-gray-900 block text-lg font-['Poppins']">
                      € {huidigeDeclaratie.btwBedrag || "0.00"}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className={`p-4 rounded-xl border-2 transition-colors ${aiFields.grootboek ? "border-purple-300 bg-purple-50/50" : "border-transparent bg-transparent p-0"}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grootboekrekening (Categorie) *
                {aiFields.grootboek && (
                  <span className="ml-2 text-purple-600 text-xs font-bold inline-flex items-center gap-1 bg-purple-100 px-2 py-0.5 rounded-full">
                    <Sparkles size={10} /> AI Suggestie
                  </span>
                )}
              </label>
              <select
                className={`w-full p-3 border rounded-lg bg-white font-semibold ${getFieldStyle("grootboek")}`}
                value={huidigeDeclaratie.grootboek}
                onChange={(e) => updateField("grootboek", e.target.value)}
                disabled={huidigeDeclaratie.type === "reiskosten"}
              >
                <option value="">-- Selecteer Categorie --</option>
                {GROOTBOEK_OPTIES.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.code}) {opt.naam}
                  </option>
                ))}
              </select>
              {aiFields.grootboek && (
                <label className="flex items-center gap-3 mt-3 cursor-pointer p-2 hover:bg-purple-100 rounded-lg transition">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-purple-600 rounded border-purple-300 focus:ring-purple-500"
                    checked={categoryConfirmed}
                    onChange={(e) => setCategoryConfirmed(e.target.checked)}
                  />
                  <span className="text-sm font-bold text-purple-800">Ik bevestig deze categorie</span>
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition font-['Lato']"
            >
              Annuleren
            </button>
            <button
              onClick={opslaanDeclaratie}
              disabled={!isFormValid()}
              className="flex-1 py-3 bg-[#003B95] text-white rounded-xl font-bold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition transform active:scale-95 font-['Poppins']"
            >
              {isAiCategory && !categoryConfirmed ? "Bevestig Categorie" : "Opslaan & Toevoegen"}
            </button>
          </div>
        </div>

        {/* FACTUUR PREVIEW */}
        {showSplitView && huidigeDeclaratie.bestandData && (
          <div className="w-1/2 ml-6 hidden md:block border-l pl-6 animate-in slide-in-from-right duration-300">
            <div className="sticky top-6">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2 font-['Poppins']">
                <Eye size={18} /> Voorbeeld Factuur
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-gray-50 p-2">
                {huidigeDeclaratie.bestandData.startsWith("data:application/pdf") ? (
                  <iframe
                    src={huidigeDeclaratie.bestandData}
                    className="w-full h-[600px]"
                    title="Factuur Preview"
                  ></iframe>
                ) : (
                  <img
                    src={huidigeDeclaratie.bestandData}
                    alt="Factuur"
                    className="w-full h-auto max-h-[600px] object-contain mx-auto"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showSplitView && huidigeDeclaratie.bestandData && (
        <div
          className="fixed inset-0 z-50 bg-black/80 md:hidden flex items-center justify-center p-4 shadow-2xl"
          onClick={() => setShowSplitView(false)}
        >
          <div
            className="bg-white rounded-xl w-full h-[80vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSplitView(false)}
              className="absolute top-2 right-2 bg-gray-900/50 text-white p-2 rounded-full z-10 hover:bg-gray-900 transition"
            >
              <X size={20} />
            </button>
            {huidigeDeclaratie.bestandData.startsWith("data:application/pdf") ? (
              <iframe
                src={huidigeDeclaratie.bestandData}
                className="w-full h-full"
                title="Factuur Preview"
              ></iframe>
            ) : (
              <img
                src={huidigeDeclaratie.bestandData}
                alt="Factuur"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- DECLARATIE OVERZICHT ---
const OverzichtView = ({
  declaraties,
  setView,
  verwijderDeclaratie,
  bewerkDeclaratie,
  verzendAlles,
  actieveMedewerker,
  setShowGlobalPopup,
}) => {
  const totaalGeneraal = declaraties.reduce(
    (sum, d) => sum + parseFloat(String(d.totaalBedrag).replace(',', '.') || 0),
    0
  );
  const totaalBTW = declaraties.reduce(
    (sum, d) => sum + parseFloat(String(d.btwBedrag).replace(',', '.') || 0),
    0
  );

  const summary = declaraties.reduce((acc, curr) => {
    const catCode = curr.grootboek || "9";
    const catNaam = GROOTBOEK_OPTIES.find((o) => o.code === catCode)?.naam || "Onbekend";
    
    const btwStr = curr.btwPercentage !== "" && curr.btwPercentage !== null ? curr.btwPercentage + "%" : "0%";
    const finalBtwStr = curr.btwPercentage === "custom" ? "Afwijkend" : btwStr;
    const key = `${catCode}) ${catNaam}__||__${finalBtwStr}`;

    if (!acc[key]) acc[key] = { name: `${catCode}) ${catNaam}`, btw: finalBtwStr, excl: 0, vat: 0, total: 0 };
    acc[key].excl += parseFloat(String(curr.bedragExcl).replace(',', '.') || 0);
    acc[key].vat += parseFloat(String(curr.btwBedrag).replace(',', '.') || 0);
    acc[key].total += parseFloat(String(curr.totaalBedrag).replace(',', '.') || 0);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-300 relative">
      <div className="flex justify-between items-end mb-6 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-[#003B95] font-['Poppins']">
            Declaratie-overzicht
          </h2>
          <div
            className="text-gray-500 font-semibold flex items-center gap-1.5 cursor-pointer hover:text-[#003B95] transition font-['Lato']"
            onClick={() => setShowGlobalPopup(true)}
          >
            Medewerker: <span className="font-bold underline">{actieveMedewerker?.naam}</span> <Pencil size={12} className="text-gray-400" />
          </div>
        </div>
        <button
          onClick={() => setView("keuze_type")}
          className="bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg font-bold hover:bg-blue-200 flex items-center gap-2 transition font-['Lato']"
        >
          <Plus size={18} /> Nog een declaratie toevoegen
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-left font-['Lato']">
          <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Factuurdatum</th>
              <th className="p-4">Project / Lev / Omschrijving</th>
              <th className="p-4">Categorie</th>
              <th className="p-4 text-right">BTW %</th>
              <th className="p-4 text-right">Totaal</th>
              <th className="p-4 print:hidden text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {declaraties.map((dec) => (
              <tr key={dec.id} className="hover:bg-gray-50 transition duration-150">
                <td className="p-4 text-sm font-semibold text-gray-500 whitespace-nowrap align-top">
                  {formatDateNL(dec.datum)}
                </td>
                <td className="p-4 font-medium text-gray-900 align-top">
                  <div className="text-xs font-bold text-[#003B95] uppercase mb-1">{dec.projectNaam || "Geen project"}</div>
                  {dec.type === "reiskosten" ? (
                    <>
                      <div className="font-bold text-gray-800 text-sm">{dec.omschrijving}</div>
                      <div className="text-xs text-gray-500 mt-1 font-medium italic">
                        <span className={`font-bold ${dec.isRetour ? "text-[#003B95]" : "text-gray-600"}`}>
                          {dec.isRetour ? "RETOUR" : "ENKEL"}
                        </span>
                        : {dec.van} &rarr; {dec.naar} <br /> ({dec.kilometers} km)
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-gray-800 text-sm">{dec.leverancier || "Onbekende Lev."}</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">{dec.omschrijving}</div>
                    </>
                  )}
                  {dec.bestandNaam && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-full mt-2">
                      <FileText size={12} /> {dec.bestandNaam}
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm align-top">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono font-bold">
                    {dec.grootboek || "N/A"}
                  </span>
                </td>
                <td className="p-4 text-right text-sm font-semibold text-gray-500 align-top">
                  {dec.btwPercentage === "custom" ? "Afwijkend" : (dec.btwPercentage ? dec.btwPercentage + "%" : "0%")}
                </td>
                <td className="p-4 text-right font-bold text-gray-900 align-top">
                  € {parseFloat(String(dec.totaalBedrag).replace(',', '.')).toFixed(2)}
                </td>
                <td className="p-4 print:hidden flex justify-center gap-1.5 align-top">
                  <button
                    onClick={() => bewerkDeclaratie(dec.id)}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-full transition"
                    title="Bewerken"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => verwijderDeclaratie(dec.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                    title="Verwijderen"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-bold border-t border-gray-200">
            <tr>
              <td colSpan="3" className="p-4 text-right text-gray-500 text-sm">
                Totaal deze declaratie:
              </td>
              <td className="p-4 text-right text-gray-500 text-xs">
                BTW: € {totaalBTW.toFixed(2)} {/* Fix: ronde haakjes verwijderd */}
              </td>
              <td className="p-4 text-right text-xl text-[#003B95] font-extrabold font-['Poppins']">
                € {totaalGeneraal.toFixed(2)}
              </td>
              <td className="print:hidden"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 break-inside-avoid">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 font-bold text-gray-700 text-sm font-['Poppins']">
          Boekhoudkundige samenvatting
        </div>
        <table className="w-full text-left text-sm font-['Lato']">
          <thead className="bg-gray-50 text-gray-600 font-bold">
            <tr>
              <th className="p-3">Grootboekrekening</th>
              <th className="p-3 text-right">BTW %</th>
              <th className="p-3 text-right">Excl. BTW</th>
              <th className="p-3 text-right">BTW</th>
              <th className="p-3 text-right">Totaal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.keys(summary).sort().map((key) => {
              const row = summary[key];
              return (
                <tr key={key}>
                  <td className="p-3 font-semibold text-gray-800">{row.name}</td>
                  <td className="p-3 text-right text-gray-500 font-bold">{row.btw}</td>
                  <td className="p-3 text-right">€ {row.excl.toFixed(2)}</td>
                  <td className="p-3 text-right">€ {row.vat.toFixed(2)}</td>
                  <td className="p-3 text-right font-extrabold text-[#003B95]">€ {row.total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 print:hidden mt-8">
        <button
          onClick={verzendAlles}
          className="flex-1 py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition flex justify-center items-center gap-2 transform active:scale-95 font-['Poppins'] text-lg"
        >
          <Send size={24} /> Akkoord & Verzenden
        </button>
      </div>
    </div>
  );
};

// --- LOADING VIEW ---
const LoadingView = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 animate-in fade-in duration-500">
    <div className="mb-6 relative">
      <div className="h-16 w-16 border-4 border-blue-100 rounded-full absolute top-0 left-0"></div>
      <div className="h-16 w-16 border-4 border-[#003B95] border-t-transparent rounded-full animate-spin"></div>
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2 font-['Poppins']">
      Een ogenblik geduld...
    </h2>
    <p className="text-gray-500 max-w-xs font-semibold font-['Lato']">
      We zijn je declaratie aan het verwerken en opslaan in de administratie.
    </p>
  </div>
);

// --- SUCCES VIEW ---
const SuccesView = ({ setDeclaraties, setView, setActieveMedewerker }) => {
  const [gifUrl] = useState(() => MONEY_GIFS[Math.floor(Math.random() * MONEY_GIFS.length)]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4 animate-in zoom-in duration-500">
      <div className="bg-green-100 p-6 rounded-full mb-4">
        <CheckCircle size={64} className="text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 font-['Poppins']">
        Je declaratie is verzonden!
      </h1>
      <p className="text-gray-600 max-w-md font-medium text-lg font-['Lato']">
        Kevin zorgt dat je centjes zo snel mogelijk weer op je rekening staan!
      </p>
      <img
        src={gifUrl}
        alt="Money Success"
        className="w-64 h-auto rounded-lg shadow-md my-4"
      />
      <p className="text-xs text-gray-400 mt-8 font-serif italic">
        PS. Je bent een topper!
      </p>
      <button
        onClick={() => {
          setDeclaraties([]);
          setActieveMedewerker(null);
          setView("medewerker");
        }}
        className="text-[#003B95] hover:text-blue-800 font-bold mt-8 flex items-center gap-2 font-['Poppins']"
      >
        <ArrowRight size={16} /> Terug naar start
      </button>
    </div>
  );
};

// --- HOOFD APP COMPONENT ---
export default function App() {
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [isIngelogd, setIsIngelogd] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.async = true;
    script.onload = () => setStyleLoaded(true);
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script2.async = true;
    script2.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    };
    document.head.appendChild(script2);

    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.innerHTML = `
        @media print { @page { margin: 20mm; } body { -webkit-print-color-adjust: exact; } }
        .shake { animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both; transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px; }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
      `;
    document.head.appendChild(style);

    return () => {
      if (window.tailwind) setStyleLoaded(true);
      document.head.removeChild(script);
      document.head.removeChild(script2);
      document.head.removeChild(fontLink);
      document.head.removeChild(style);
    };
  }, []);

  const [view, setView] = useState("medewerker");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [medewerkers, setMedewerkers] = useState([]);
  const [projecten, setProjecten] = useState([]);
  const [isLoadingMw, setIsLoadingMw] = useState(true);
  const [showGlobalPopup, setShowGlobalPopup] = useState(false);

  const fetchBackendData = async () => {
    setIsLoadingMw(true);
    try {
      const resMw = await fetch(GOOGLE_SCRIPT_URL);
      const dataMw = await resMw.json();
      if (Array.isArray(dataMw) && dataMw.length > 0) setMedewerkers(dataMw);
      else setMedewerkers(STANDAARD_MEDEWERKERS);

      const resProj = await fetch(GOOGLE_SCRIPT_URL + "?action=get_projecten");
      const dataProj = await resProj.json();
      if (Array.isArray(dataProj) && dataProj.length > 0) {
        setProjecten(dataProj);
      } else {
        setProjecten([{ id: 1, naam: "Interne kosten", actief: true }]);
      }
    } catch (error) {
      console.error("Offline fallback:", error);
      setMedewerkers(STANDAARD_MEDEWERKERS);
      setProjecten([{ id: 1, naam: "Interne kosten", actief: true }]);
    } finally {
      setIsLoadingMw(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  const syncProjecten = async (nieuweLijst) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "update_projecten", projecten: nieuweLijst }),
      });
    } catch (e) {
      console.error("Fout bij opslaan projecten", e);
    }
  };

  const [actieveMedewerker, setActieveMedewerker] = useState(null);
  const [declaraties, setDeclaraties] = useState([]);
  const [huidigeDeclaratie, setHuidigeDeclaratie] = useState(null);
  
  const [aiFields, setAiFields] = useState({});
  const [categoryConfirmed, setCategoryConfirmed] = useState(false);

  useEffect(() => {
    if (actieveMedewerker && view === "medewerker") setView("home");
  }, [actieveMedewerker]);

  const startNieuweDeclaratie = (type) => {
    setAiFields({}); 
    setCategoryConfirmed(false); 

    setHuidigeDeclaratie({
      id: Date.now(),
      type: type,
      methode: "handmatig",
      bestand: null,
      bestandNaam: "",
      datum: "",
      project: "",
      projectNaam: "",
      leverancier: "",
      omschrijving: "",
      bedragExcl: "",
      btwPercentage: "",
      btwBedrag: "",
      totaalBedrag: "",
      grootboek: type === "reiskosten" ? "4075" : "",
      van: "",
      naar: "",
      kilometers: "",
      isRetour: false,
    });
    setView("formulier");
  };

  const bewerkDeclaratie = (id) => {
    const itemToEdit = declaraties.find((d) => d.id === id);
    if (itemToEdit) {
      setAiFields({}); 
      setCategoryConfirmed(false);
      setHuidigeDeclaratie(itemToEdit);
      setView("formulier");
    }
  };

  const opslaanDeclaratie = () => {
    const bestaatAl = declaraties.find((d) => d.id === huidigeDeclaratie.id);
    
    if (huidigeDeclaratie.project) {
        const updatedProjs = projecten.map(p => p.id === huidigeDeclaratie.project ? { ...p, lastUsed: new Date().toISOString() } : p);
        setProjecten(updatedProjs);
        syncProjecten(updatedProjs);
    }

    if (bestaatAl)
      setDeclaraties(declaraties.map((d) => d.id === huidigeDeclaratie.id ? huidigeDeclaratie : d));
    else 
      setDeclaraties([...declaraties, huidigeDeclaratie]);
    
    setHuidigeDeclaratie(null);
    setView("overzicht");
  };

  const verwijderDeclaratie = (id) => {
    setDeclaraties(declaraties.filter((d) => d.id !== id));
  };

  const verzendAlles = async () => {
    setIsSubmitting(true);

    const payload = {
      action: "declaratie",
      datumIndiening: new Date().toISOString(),
      medewerker: actieveMedewerker,
      declaraties: declaraties.map((d) => {
        const isCustomBtw = d.btwPercentage === "custom";
        let excl = d.bedragExcl;
        let vatCalc = d.btwBedrag;
        
        const totNum = parseDecimalInput(d.totaalBedrag).rekenWaarde;

        if (!isCustomBtw && d.type !== "reiskosten") {
          const perc = parseFloat(d.btwPercentage);
          const exclVal = totNum / (1 + perc / 100);
          excl = exclVal.toFixed(2);
          vatCalc = (totNum - exclVal).toFixed(2);
        } else if(isCustomBtw) {
          vatCalc = parseDecimalInput(d.btwBedrag).rekenWaarde || 0;
          excl = (totNum - vatCalc).toFixed(2);
        }
        
        return { 
          ...d, 
          totaalBedrag: totNum.toFixed(2), 
          bedragExcl: excl, 
          btwBedrag: vatCalc 
        };
      }),
    };

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.status === 'success') {
        setTimeout(() => {
          setIsSubmitting(false);
          setView("succes");
        }, 1500);
      } else {
         throw new Error(json.message || "Fout bij de Google Script verbinding.");
      }
    } catch (error) {
      console.error("Fout bij verzenden", error);
      alert("Er ging iets mis bij het verzenden.");
      setIsSubmitting(false);
    }
  };

  if (!styleLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-sans">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          Laden...
        </div>
      </div>
    );
  if (!isIngelogd) return <LoginView onLogin={() => setIsIngelogd(true)} />;
  if (isSubmitting)
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 flex items-center justify-center">
        <LoadingView />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-['Lato'] text-gray-900 print:bg-white pb-20">
      <nav
        className="border-b border-gray-200 px-6 py-4 flex justify-between items-center print:hidden sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => setView("home")} className="flex items-center gap-2 hover:opacity-80 transition">
            <img src={LOGO_URL} alt="The Declaratie Office" className="h-10 object-contain brightness-0 invert" style={{ filter: "brightness(0) invert(1)" }} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          {view !== "succes" && (
            <button
              onClick={() => { if (declaraties.length > 0) setView("overzicht"); }}
              className="flex items-center gap-1 text-sm bg-white/10 text-white px-3 py-1 rounded-full font-medium hover:bg-white/20 transition backdrop-blur-sm"
            >
              <ShoppingCart size={14} /> {declaraties.length} {declaraties.length === 1 ? "declaratie" : "declaraties"}
            </button>
          )}
          {actieveMedewerker && (
            <div
              className="text-sm text-blue-100 hidden md:block cursor-pointer hover:text-white transition font-['Lato']"
              onClick={() => setShowGlobalPopup(true)}
            >
              Ingelogd als: <span className="font-bold font-['Poppins']">{actieveMedewerker.naam}</span>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto py-6">
        {view === "medewerker" && (
          <MedewerkerView
            medewerkers={medewerkers}
            setMedewerkers={setMedewerkers}
            setActieveMedewerker={setActieveMedewerker}
            setView={setView}
            isLoadingMw={isLoadingMw}
            refreshMedewerkers={fetchBackendData}
          />
        )}
        {view === "home" && (
          <HomeView
            setView={setView}
            actieveMedewerker={actieveMedewerker}
            setShowGlobalPopup={setShowGlobalPopup}
          />
        )}
        {view === "keuze_type" && (
          <TypeKeuzeView
            startNieuweDeclaratie={startNieuweDeclaratie}
            setView={setView}
            declaraties={declaraties}
          />
        )}
        {view === "formulier" && (
          <FormulierView
            huidigeDeclaratie={huidigeDeclaratie}
            setHuidigeDeclaratie={setHuidigeDeclaratie}
            setView={setView}
            opslaanDeclaratie={opslaanDeclaratie}
            hasDeclaraties={declaraties.length > 0}
            projecten={projecten}
            setProjecten={setProjecten}
            syncProjecten={syncProjecten}
            aiFields={aiFields}
            setAiFields={setAiFields}
            categoryConfirmed={categoryConfirmed}
            setCategoryConfirmed={setCategoryConfirmed}
          />
        )}
        {view === "overzicht" && (
          <OverzichtView
            declaraties={declaraties}
            setView={setView}
            verwijderDeclaratie={verwijderDeclaratie}
            bewerkDeclaratie={bewerkDeclaratie}
            verzendAlles={verzendAlles}
            actieveMedewerker={actieveMedewerker}
            setShowGlobalPopup={setShowGlobalPopup}
          />
        )}
        {view === "succes" && (
          <SuccesView
            setDeclaraties={setDeclaraties}
            setView={setView}
            setActieveMedewerker={setActieveMedewerker}
          />
        )}
      </main>

      {showGlobalPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg font-['Poppins'] text-[#003B95]">Wissel Medewerker</h3>
              <button onClick={() => setShowGlobalPopup(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {medewerkers.map((mw) => (
                <button
                  key={mw.id}
                  onClick={() => {
                    setActieveMedewerker(mw);
                    setShowGlobalPopup(false);
                    if (view === "medewerker") setView("home");
                  }}
                  className={`w-full text-left p-3 rounded-lg border font-['Lato'] ${
                    actieveMedewerker?.id === mw.id ? "bg-blue-50 border-[#003B95] text-[#003B95] font-bold" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {mw.naam}
                </button>
              ))}
              <button
                onClick={() => { setView("medewerker"); setShowGlobalPopup(false); }}
                className="w-full text-center p-3 text-[#003B95] font-medium hover:bg-blue-50 rounded-lg mt-2 font-['Poppins']"
              >
                + Iemand toevoegen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
