import { useState, useEffect, useRef } from "react";

const GOLD = "#C4A45A";
const GOLD_L = "#E8D5A0";
const GOLD_P = "#F5EDD5";
const DARK = "#0A0906";
const DARK2 = "#181510";
const CREAM = "#FAF7F0";
const GRAY = "#6A6050";

const QUESTIONS = [
  {
    id: 1,
    text: "Quando aparece uma chance de falar inglês, o que você faz?",
    options: [
      { text: "Evito. Arranjo um jeito de sair antes que precisem de mim.", profile: "B" },
      { text: "Fico em silêncio ou respondo o mínimo possível.", profile: "S" },
      { text: "Tento — mas nunca sei se vai sair bem ou travar.", profile: "F" },
      { text: "Falo — mas saio da situação sentindo que fui um personagem.", profile: "P" },
    ],
  },
  {
    id: 2,
    text: "Qual dessas frases você nunca disse em voz alta, mas reconhece como sua?",
    options: [
      { text: "\"Inglês nunca foi pra mim — e no fundo eu já aceitei isso.\"", profile: "B" },
      { text: "\"Eu entendo muito mais do que consigo mostrar quando precisam de mim.\"", profile: "S" },
      { text: "\"Nunca sei com qual versão de mim vou aparecer — isso me cansa.\"", profile: "F" },
      { text: "\"Falo inglês — mas quando falo, não reconheço minha própria voz nele.\"", profile: "P" },
    ],
  },
  {
    id: 3,
    text: "O que acontece no seu corpo um segundo antes de ter que falar inglês?",
    options: [
      { text: "O corpo recua sozinho. Já decido que não vou antes de pensar.", profile: "B" },
      { text: "Trava tudo. O que estava na cabeça some na hora de sair pela boca.", profile: "S" },
      { text: "Uma aposta interna — nunca sei se hoje é dia de conseguir ou de bloquear.", profile: "F" },
      { text: "Já começo a editar antes de falar. Sai corrigido, não natural.", profile: "P" },
    ],
  },
  {
    id: 4,
    text: "Quando você imagina alguém te ouvindo falar inglês, essa pessoa está:",
    options: [
      { text: "Esperando confirmar que você não tem jeito pra isso.", profile: "B" },
      { text: "Esperando o momento em que você travar para provar que não sabe.", profile: "S" },
      { text: "Dependendo do dia — e você nunca sabe qual dia vai ser.", profile: "F" },
      { text: "Percebendo que você está tentando soar bem, não sendo você mesmo.", profile: "P" },
    ],
  },
  {
    id: 5,
    text: "Quando você erra em inglês, o que acontece?",
    options: [
      { text: "Confirma o que você já sabia. Para por aí.", profile: "B" },
      { text: "Para de falar. Silêncio é mais seguro do que continuar se expondo.", profile: "S" },
      { text: "Depende — às vezes passa fácil, às vezes joga tudo fora.", profile: "F" },
      { text: "Continua falando, mas fica repassando o erro na cabeça por horas.", profile: "P" },
    ],
  },
  {
    id: 6,
    text: "Como você descreveria sua trajetória com o inglês até hoje?",
    options: [
      { text: "Uma série de inícios que nunca viraram jornada.", profile: "B" },
      { text: "Muito aprendizado acumulado, pouca coragem de usar.", profile: "S" },
      { text: "Um ciclo de avanços e recomeços sem entender o que quebra o ritmo.", profile: "F" },
      { text: "Uma evolução real — mas que ainda não chegou onde você precisa.", profile: "P" },
    ],
  },
  {
    id: 7,
    text: "Se alguém te dissesse agora \"você já é um falante de inglês\", você sentiria:",
    options: [
      { text: "Que está mentindo ou sendo gentil sem necessidade.", profile: "B" },
      { text: "Que está vendo uma parte de você que só aparece quando ninguém está olhando.", profile: "S" },
      { text: "Alívio e dúvida ao mesmo tempo — e já esperando provar o contrário.", profile: "F" },
      { text: "Que está descrevendo o personagem — não você de verdade.", profile: "P" },
    ],
  },
  {
    id: 8,
    text: "Existe uma versão de você que fala inglês fluentemente. Onde ela está?",
    options: [
      { text: "Nunca existiu. Nunca me permiti construí-la.", profile: "B" },
      { text: "Existe — mas só quando estou sozinho, sem ninguém me observando.", profile: "S" },
      { text: "Aparece e desaparece. Não consigo sustentá-la por muito tempo.", profile: "F" },
      { text: "Existe e fala bem — mas quando aparece, não parece ser eu.", profile: "P" },
    ],
  },
  {
    id: 9,
    text: "O inglês representa algo que você ainda não se autorizou a ter. O quê?",
    options: [
      { text: "Acesso. A sensação de que esse mundo não foi feito pra pessoas como eu.", profile: "B" },
      { text: "Voz. Tenho o conteúdo, mas não consigo ocupar o espaço de falar.", profile: "S" },
      { text: "Estabilidade. Quero parar de me surpreender com minha própria inconsistência.", profile: "F" },
      { text: "Identidade. Falo — mas o que sai não é minha voz, é uma tradução de mim.", profile: "P" },
    ],
  },
  {
    id: 10,
    text: "Se você fosse entrar num programa de inglês agora, o que seria inegociável?",
    options: [
      { text: "Um ambiente seguro, sem julgamento, onde eu possa começar no meu tempo.", profile: "B" },
      { text: "Um método que transforme o que já existe dentro de mim em fala real.", profile: "S" },
      { text: "Estrutura e acompanhamento para eu parar de recomeçar do zero.", profile: "F" },
      { text: "Um processo que me ajude a falar como eu mesmo — não como um personagem.", profile: "P" },
    ],
  },
];

const PROFILES = {
  B: {
    emoji: "🚪",
    name: "O Bloqueado",
    tagline: "A porta está fechada — mas a chave sempre esteve com você.",
    dna: "Exclusão Simbólica + Foraclusão da L2",
    desc: "Em algum momento, você recebeu uma mensagem clara de que o inglês não era seu espaço. E acreditou. Isso não é fraqueza — é o resultado de um sistema de proteção funcionando perfeitamente. Mas esse mesmo sistema que te protegeu está te impedindo de chegar onde você quer.",
    cta: "O que você precisa não é de mais força de vontade. É de um ambiente construído para receber alguém que chega de onde você está — e criar as condições para que o DNA seja regravado com segurança.",
  },
  S: {
    emoji: "🧊",
    name: "O Silenciado",
    tagline: "O inglês está dentro de você. Só não encontrou voz ainda.",
    dna: "Saber sem Voz + Medo da Exposição",
    desc: "Você tem mais inglês do que imagina. O problema não é o que você sabe — é que na hora H o corpo não coopera. Você sabe, mas não se autoriza a falar. Isso tem nome: Ruptura Enunciativa. E pode ser revertido.",
    cta: "O que você precisa não é de mais conteúdo. É de um caminho seguro para transformar o que já existe dentro de você em fala real.",
  },
  F: {
    emoji: "🌀",
    name: "O Fragmentado",
    tagline: "Sua identidade linguística está em formação — isso é sinal de movimento.",
    dna: "Deslizamento Simbólico + Identidade em Construção",
    desc: "Você não está no começo — você tem história com a língua. Dias bons em que tudo flui, e dias em que parece que esqueceu tudo. Isso não é inconsistência de caráter. É neurociência: dois DNAs em conflito. E esse conflito tem solução.",
    cta: "O que você precisa não é de mais motivação. É de estrutura que consolide o novo DNA até que ele se torne dominante.",
  },
  P: {
    emoji: "🔥",
    name: "O Performático",
    tagline: "Você fala inglês. Agora falta falar como você mesmo.",
    dna: "Fluência sem Identidade + Eu Emprestado",
    desc: "De fora, parece que você já chegou. Por dentro, há uma dissonância constante: quando você fala inglês, não é você quem está falando. Você dominou o código linguístico. O que ainda não aconteceu é a integração desse código à sua identidade.",
    cta: "O que você precisa não é de mais técnica. É de um processo que crie espaço para que você apareça em inglês — não só sua competência, mas você.",
  },
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function DNATest() {
  const [shuffledQuestions] = useState(() => QUESTIONS.map(q => ({ ...q, options: shuffle(q.options) })));
  const [stage, setStage] = useState("intro");
  const [lead, setLead] = useState({ nome: "", whatsapp: "", email: "" });
  const [errors, setErrors] = useState({});
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (stage === "analyzing") {
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 18;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setTimeout(() => setStage("result"), 400);
        }
        setProgress(Math.min(p, 100));
      }, 180);
      return () => clearInterval(interval);
    }
  }, [stage]);

  function calcResult(ans) {
    const scores = { B: 0, S: 0, F: 0, P: 0 };
    Object.values(ans).forEach(p => { if (scores[p] !== undefined) scores[p]++; });
    const order = ["B", "S", "F", "P"];
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] === sorted[1][1]) {
      const ia = order.indexOf(sorted[0][0]);
      const ib = order.indexOf(sorted[1][0]);
      return PROFILES[ia > ib ? sorted[0][0] : sorted[1][0]];
    }
    return PROFILES[sorted[0][0]];
  }

  function validateLead() {
    const e = {};
    if (!lead.nome.trim() || lead.nome.trim().split(" ").length < 2) e.nome = "Digite seu nome completo";
    if (lead.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp inválido";
    if (!lead.email.includes("@") || !lead.email.includes(".")) e.email = "E-mail inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleLead(e) {
    e.preventDefault();
    if (validateLead()) setStage("test");
  }

  function handleAnswer(profile) {
    if (animating) return;
    setSelected(profile);
    setAnimating(true);
    setTimeout(() => {
      const newAns = { ...answers, [current]: profile };
      setAnswers(newAns);
      setSelected(null);
      setAnimating(false);
      if (current < QUESTIONS.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setResult(calcResult(newAns));
        setStage("analyzing");
      }
    }, 500);
  }

  function fmtWa(v) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  const pct = Math.round((current / QUESTIONS.length) * 100);
  const q = shuffledQuestions[current];
  const firstName = lead.nome.split(" ")[0];

  const profileOrder = ["B", "S", "F", "P"];
  const stairItems = [
    { code: "B", emoji: "🚪", label: "Bloqueado", h: 44 },
    { code: "S", emoji: "🧊", label: "Silenciado", h: 64 },
    { code: "F", emoji: "🌀", label: "Fragmentado", h: 84 },
    { code: "P", emoji: "🔥", label: "Performático", h: 104 },
    { code: "E", emoji: "🌱", label: "Emergente", h: 124 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: ${DARK}; min-height: 100vh; }
        .opt { transition: all 0.2s ease; cursor: pointer; border: 1.5px solid rgba(196,164,90,0.25); background: rgba(255,255,255,0.03); border-radius: 2px; }
        .opt:hover { border-color: ${GOLD}; background: rgba(196,164,90,0.08); transform: translateX(4px); }
        .opt.sel { border-color: ${GOLD}; background: rgba(196,164,90,0.15); }
        .btn { transition: all 0.2s ease; cursor: pointer; }
        .btn:hover { transform: translateY(-2px); opacity: 0.92; }
        input { outline: none; }
        input:focus { border-color: ${GOLD} !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .fade { animation: fadeUp 0.5s ease forwards; }
        .dot { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <div style={{ minHeight: "100vh", background: DARK, color: CREAM, display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Georgia', serif" }}>

        {/* TOPBAR */}
        <div style={{ width: "100%", borderBottom: "1px solid rgba(196,164,90,0.2)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,9,6,0.95)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: GOLD, letterSpacing: 3 }}>NEUROFLUÊNCIA</div>
          {stage === "test" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: GRAY, letterSpacing: 1 }}>{current + 1}/{QUESTIONS.length}</span>
              <div style={{ width: 100, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: GOLD, borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
            </div>
          )}
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GRAY, letterSpacing: 2 }}>DNA LINGUÍSTICO</div>
        </div>

        <div style={{ width: "100%", maxWidth: 660, padding: "40px 24px 80px", flex: 1 }}>

          {/* INTRO */}
          {stage === "intro" && (
            <div className="fade" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 20 }}>🧬</div>
              <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 4, color: GOLD, marginBottom: 14, textTransform: "uppercase" }}>Diagnóstico Gratuito</div>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,44px)", color: CREAM, lineHeight: 1.2, marginBottom: 16 }}>
                Descubra seu <span style={{ color: GOLD }}>DNA Linguístico</span>
              </h1>
              <div style={{ width: 50, height: 2, background: GOLD, margin: "0 auto 24px" }} />
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 15, color: "rgba(250,247,240,0.75)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 14px" }}>
                O que impede você de falar inglês não é vocabulário. Não é gramática.
              </p>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 15, color: "rgba(250,247,240,0.75)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 36px" }}>
                É um padrão inconsciente gravado por experiências e posição identitária. <strong style={{ color: CREAM }}>Este teste revela qual é o seu.</strong>
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 36, marginBottom: 44 }}>
                {[["10", "perguntas"], ["5 min", "de teste"], ["1", "diagnóstico"]].map(([n, l]) => (
                  <div key={n}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: GOLD, fontWeight: 700 }}>{n}</div>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GRAY, letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={() => setStage("lead")} style={{ background: GOLD, color: DARK, border: "none", padding: "16px 52px", fontSize: 14, fontWeight: 700, fontFamily: "'Lato',sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>
                Descobrir Meu DNA →
              </button>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GRAY, marginTop: 14, letterSpacing: 1 }}>Baseado em Norton, Lacan e Neurociência da Linguagem</p>
            </div>
          )}

          {/* LEAD */}
          {stage === "lead" && (
            <div className="fade">
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: "uppercase" }}>Antes de começar</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,4vw,32px)", color: CREAM, lineHeight: 1.3, marginBottom: 10 }}>Para quem enviamos seu diagnóstico?</h2>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: GRAY, lineHeight: 1.7 }}>Seu resultado completo chega no WhatsApp. Nada de spam — só o seu DNA.</p>
              </div>
              <form onSubmit={handleLead} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { key: "nome", label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
                  { key: "whatsapp", label: "WhatsApp", type: "tel", placeholder: "(11) 99999-9999" },
                  { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 2, color: GOLD, textTransform: "uppercase", display: "block", marginBottom: 7 }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={lead[key]}
                      onChange={e => setLead(l => ({ ...l, [key]: key === "whatsapp" ? fmtWa(e.target.value) : e.target.value }))}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1.5px solid ${errors[key] ? "#C47A5A" : "rgba(196,164,90,0.3)"}`, color: CREAM, padding: "15px 18px", fontSize: 14, fontFamily: "'Lato',sans-serif" }}
                    />
                    {errors[key] && <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: "#C47A5A", marginTop: 5 }}>{errors[key]}</p>}
                  </div>
                ))}
                <button type="submit" className="btn" style={{ background: GOLD, color: DARK, border: "none", padding: "16px", fontSize: 14, fontWeight: 700, fontFamily: "'Lato',sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", marginTop: 6 }}>
                  Iniciar Meu Diagnóstico →
                </button>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GRAY, textAlign: "center", lineHeight: 1.7, letterSpacing: 0.5 }}>
                  Seus dados são usados apenas para envio do diagnóstico. Sem spam.
                </p>
              </form>
            </div>
          )}

          {/* TEST */}
          {stage === "test" && (
            <div className="fade" key={current}>
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GRAY, letterSpacing: 2, textTransform: "uppercase" }}>Pergunta {current + 1} de {QUESTIONS.length}</span>
                  <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GOLD }}>{pct}%</span>
                </div>
                <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: GOLD, borderRadius: 2, transition: "width 0.4s ease" }} />
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ width: 30, height: 2, background: GOLD, marginBottom: 18 }} />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(18px,3vw,24px)", color: CREAM, lineHeight: 1.5, fontWeight: 400 }}>{q.text}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt, i) => (
                  <div key={i} className={`opt${selected === opt.profile ? " sel" : ""}`} onClick={() => handleAnswer(opt.profile)}
                    style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 14, opacity: selected && selected !== opt.profile ? 0.35 : 1, transition: "all 0.25s ease" }}>
                    <div style={{ width: 24, height: 24, border: `1.5px solid ${selected === opt.profile ? GOLD : "rgba(196,164,90,0.3)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: selected === opt.profile ? GOLD : "transparent", transition: "all 0.2s" }}>
                      {selected === opt.profile && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, color: selected === opt.profile ? CREAM : "rgba(250,247,240,0.8)", lineHeight: 1.6, fontStyle: opt.text.startsWith('"') ? "italic" : "normal" }}>{opt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYZING */}
          {stage === "analyzing" && (
            <div className="fade" style={{ textAlign: "center", paddingTop: 60 }}>
              <div style={{ fontSize: 44, marginBottom: 28 }}>🧬</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: CREAM, marginBottom: 10, fontWeight: 400 }}>Analisando seu DNA...</h2>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: GRAY, marginBottom: 44, lineHeight: 1.7 }}>Mapeando padrão inconsciente, resposta neurológica e posição simbólica</p>
              <div style={{ width: "100%", maxWidth: 300, margin: "0 auto 12px", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
                <div style={{ width: `${progress}%`, height: "100%", background: GOLD, borderRadius: 4, transition: "width 0.2s ease" }} />
              </div>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: GOLD }}>{Math.round(progress)}%</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 44 }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="dot" style={{ width: 8, height: 8, borderRadius: "50%", background: i % 2 === 0 ? GOLD : DARK2, border: `1px solid ${GOLD}`, animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {stage === "result" && result && (
            <div className="fade">
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 18 }}>Seu DNA Linguístico</div>
                <div style={{ fontSize: 60, marginBottom: 14, lineHeight: 1 }}>{result.emoji}</div>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: GRAY, marginBottom: 6 }}>{firstName}, você é</p>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,40px)", color: GOLD, fontWeight: 700, marginBottom: 14, lineHeight: 1.2 }}>{result.name}</h1>
                <div style={{ width: 50, height: 2, background: GOLD, margin: "0 auto 18px" }} />
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontStyle: "italic", color: "rgba(250,247,240,0.8)", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>"{result.tagline}"</p>
              </div>

              {/* DNA Ativo */}
              <div style={{ background: "rgba(196,164,90,0.08)", border: "1px solid rgba(196,164,90,0.3)", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 9, letterSpacing: 3, color: GOLD, textTransform: "uppercase" }}>DNA Ativo</span>
                <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: CREAM, fontWeight: 700 }}>{result.dna}</span>
              </div>

              {/* Diagnóstico */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: CREAM, marginBottom: 14, fontWeight: 400 }}>O que o seu DNA revela</h3>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, color: "rgba(250,247,240,0.8)", lineHeight: 1.8 }}>{result.desc}</p>
              </div>

              {/* Escadaria */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: 3, color: GOLD, textTransform: "uppercase", marginBottom: 14 }}>Sua posição na jornada</p>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
                  {stairItems.map(({ code, emoji, label, h }) => {
                    const isCur = Object.keys(PROFILES).find(k => PROFILES[k] === result) === code;
                    return (
                      <div key={code} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          {isCur && <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: GOLD, fontFamily: "'Lato',sans-serif", fontWeight: 700, whiteSpace: "nowrap", letterSpacing: 1 }}>VOCÊ</div>}
                          <div style={{ height: h, background: isCur ? GOLD : "rgba(255,255,255,0.06)", border: `1px solid ${isCur ? GOLD : "rgba(255,255,255,0.1)"}`, borderBottom: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{emoji}</div>
                        </div>
                        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 8, color: isCur ? GOLD : GRAY, textTransform: "uppercase", letterSpacing: 0.5, lineHeight: 1.3, marginTop: 5 }}>{label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Box */}
              <div style={{ background: "linear-gradient(135deg,rgba(196,164,90,0.1),rgba(196,164,90,0.04))", border: "1px solid rgba(196,164,90,0.35)", padding: "24px", marginBottom: 24 }}>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, color: "rgba(250,247,240,0.85)", lineHeight: 1.8 }}>{result.cta}</p>
              </div>

              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: GRAY, textAlign: "center", marginBottom: 14, lineHeight: 1.6 }}>
                Seu diagnóstico completo — 10 páginas — está chegando no WhatsApp agora.
              </p>
              <button className="btn" style={{ width: "100%", background: GOLD, color: DARK, border: "none", padding: "18px", fontSize: 14, fontWeight: 700, fontFamily: "'Lato',sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}
                onClick={() => window.open(`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`, "_blank")}>
                Receber Diagnóstico Completo →
              </button>
              <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: GRAY, textAlign: "center", marginTop: 16, lineHeight: 1.7 }}>
                Baseado em Norton (2000), Lacan e Neurociência da Linguagem<br />Metodologia Neurofluência · Todos os direitos reservados
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
