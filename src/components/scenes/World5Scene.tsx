import type { JSX } from "@emotion/react/jsx-runtime";
import { useSceneState } from "../../hooks/useSceneState";
import type { Props } from "./MissionScene";
import "./scenes.css";
import { useEffect, useRef } from "react";

function Mission21({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activated || !wrapRef.current) return;
    const wrap = wrapRef.current;
    const angles = [0, 60, 120, 180, 240, 300];
    angles.forEach((deg, i) => {
      const p = document.createElement("div");
      p.className = "w5-particle";
      const rad = (deg * Math.PI) / 180;
      const dist = 60;
      p.style.setProperty("--sx", `${Math.cos(rad) * dist}px`);
      p.style.setProperty("--sy", `${Math.sin(rad) * dist}px`);
      wrap.appendChild(p);
      setTimeout(() => p.classList.add("w5-particle--fly"), i * 60);
      setTimeout(() => p.remove(), 1000 + i * 60);
    });
  }, [activated]);

  return (
    <div className="scene scene--w5m21">
      <div className="scene__mission-tag">Misión 21 · Primer protocolo</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--purple" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--purple" : ""}`}>
          {activated ? "Protocolo iniciado" : "Inactivo"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="w5-core-stage">
        <div className="w5-core-wrap" ref={wrapRef}>
          <div className={`w5-core-node ${activated ? "w5-core-node--lit" : ""}`}>
            <div className="w5-ring-pulse" />
            <div className="w5-core-inner" />
          </div>
        </div>
        <div className={`w3-pill-like w5-pill ${activated ? "w5-pill--active" : ""}`}>
          {expectedOutput || "Protocolo iniciado"}
        </div>
      </div>
    </div>
  );
}

function Mission22({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activated || !trackRef.current) return;
    const dot = document.createElement("div");
    dot.className = "w5-flow-dot";
    trackRef.current.appendChild(dot);
    requestAnimationFrame(() => dot.classList.add("w5-flow-dot--run"));
    setTimeout(() => dot.remove(), 900);
  }, [activated]);

  return (
    <div className="scene scene--w5m22">
      <div className="scene__mission-tag">Misión 22 · Protocolo con parámetro</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--purple" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--purple" : ""}`}>
          {activated ? "Parámetro recibido" : "Sin parámetro"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="w5-core-stage">
        <div className="w5-flow-row">
          <div className={`w5-data-orb ${activated ? "w5-data-orb--charged" : ""}`}>
            {activated ? "Sistema" : "?"}
          </div>
          <div className="w5-flow-track" ref={trackRef} />
          <div className={`w5-func-box ${activated ? "w5-func-box--active" : ""}`}>
            <span className="w5-func-icon">⚙</span>
          </div>
        </div>
        <div className={`w3-pill-like w5-pill ${activated ? "w5-pill--active" : ""}`}>
          {expectedOutput || "Activando Sistema"}
        </div>
      </div>
    </div>
  );
}

function Mission23({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const resultRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!activated || !resultRef.current) return;
    let n = 0;
    const target = parseInt(expectedOutput || "100") || 100;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        n += Math.ceil(target / 10);
        if (n >= target) { n = target; clearInterval(interval); }
        if (resultRef.current) resultRef.current.textContent = String(n);
      }, 40);
    }, 700);
    return () => clearTimeout(timeout);
  }, [activated]);

  return (
    <div className="scene scene--w5m23">
      <div className="scene__mission-tag">Misión 23 · Calcular energía</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--teal" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--teal" : ""}`}>
          {activated ? "Calculado" : "Sin calcular"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="w5-core-stage">
        <div className="w5-calc-row">
          <div className={`w5-calc-ring ${activated ? "w5-calc-ring--active" : ""}`}>40</div>
          <div className={`w5-merge-line ${activated ? "w5-merge-line--active" : ""}`} />
          <div className={`w5-calc-result-ring ${activated ? "w5-calc-result-ring--active" : ""}`}>
            <span className="w5-calc-result-num" ref={resultRef}>
              {activated ? "0" : "--"}
            </span>
          </div>
          <div className={`w5-merge-line ${activated ? "w5-merge-line--active" : ""}`} />
          <div className={`w5-calc-ring ${activated ? "w5-calc-ring--active" : ""}`}>60</div>
        </div>
        <div className={`w3-pill-like w5-pill w5-pill--teal ${activated ? "w5-pill--active" : ""}`}>
          {expectedOutput || "100"}
        </div>
      </div>
    </div>
  );
}

function Mission24({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !cursorRef.current) return;
    const mods = gridRef.current.querySelectorAll<HTMLDivElement>(".w5-repair-module");
    const cursor = cursorRef.current;

    if (!activated) {
      mods.forEach(m => { m.classList.remove("w5-repair-module--fixed", "w5-repair-module--fixing"); });
      cursor.style.opacity = "0";
      return;
    }

    cursor.style.opacity = "1";
    mods.forEach((m, i) => {
      const left = i * 52;
      setTimeout(() => {
        cursor.style.left = `${left}px`;
        m.classList.add("w5-repair-module--fixing");
        setTimeout(() => {
          m.classList.remove("w5-repair-module--fixing");
          m.classList.add("w5-repair-module--fixed");
        }, 400);
      }, i * 450);
    });
    setTimeout(() => { cursor.style.opacity = "0"; }, mods.length * 450 + 200);
  }, [activated]);

  return (
    <div className="scene scene--w5m24">
      <div className="scene__mission-tag">Misión 24 · Reparación automática</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--purple" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--purple" : ""}`}>
          {activated ? "Reparado" : "Sin reparar"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="w5-core-stage">
        <div className="w5-repair-stage">
          <div className="w5-repair-track" ref={gridRef}>
            {[0, 1, 2].map(i => (
              <div key={i} className="w5-repair-module">
                <span className="w5-spark">✨</span>
              </div>
            ))}
          </div>
          <div className="w5-repair-cursor" ref={cursorRef} />
        </div>
        <div className={`w3-pill-like w5-pill ${activated ? "w5-pill--active" : ""}`}>
          {expectedOutput ? `${expectedOutput} ×3` : "Modulo reparado ×3"}
        </div>
      </div>
    </div>
  );
}

function Mission25({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const cityRef = useRef<HTMLDivElement>(null);
  const shockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cityRef.current) return;
    const cfg = [
      {w:18,h:36},{w:14,h:26},{w:22,h:56},{w:16,h:34},{w:28,h:72},
      {w:18,h:44},{w:14,h:28},{w:24,h:58},{w:16,h:38},{w:20,h:50},{w:16,h:30}
    ];
    cityRef.current.innerHTML = "";
    cfg.forEach((b) => {
      const el = document.createElement("div");
      el.className = "w5-bld";
      el.style.cssText = `width:${b.w}px;height:${b.h}px`;
      const cols = Math.max(1, Math.floor((b.w - 4) / 7));
      const rows = Math.max(1, Math.floor((b.h - 8) / 9));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const w = document.createElement("div");
          w.className = "w5-bld-win";
          w.style.cssText = `top:${5 + r * 9}px;left:${3 + c * 7}px`;
          el.appendChild(w);
        }
      }
      cityRef.current!.appendChild(el);
    });
  }, []);

  useEffect(() => {
    if (!cityRef.current) return;
    const blds = cityRef.current.querySelectorAll(".w5-bld");
    const wins = cityRef.current.querySelectorAll<HTMLDivElement>(".w5-bld-win");

    if (activated) {
      if (shockRef.current) {
        shockRef.current.classList.remove("w5-shockwave--go");
        void shockRef.current.offsetWidth;
        shockRef.current.classList.add("w5-shockwave--go");
      }
      blds.forEach(b => b.classList.add("w5-bld--lit"));
      wins.forEach((w, i) => setTimeout(() => w.classList.add("w5-bld-win--lit"), i * 12));
    } else {
      blds.forEach(b => b.classList.remove("w5-bld--lit"));
      wins.forEach(w => w.classList.remove("w5-bld-win--lit"));
    }
  }, [activated]);

  return (
    <div className="scene scene--w5m25">
      <div className="scene__mission-tag">Misión 25 · Recuperar Nova City</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--purple" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--purple" : ""}`}>
          {activated ? "Restaurada" : "Apagado"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="w5-city-sky" />
      <div className="w5-shockwave" ref={shockRef} />
      <div className="w5-city-row" ref={cityRef} />
      <div className="w5-restore-badge">
        <div className={`w3-pill-like w5-pill ${activated ? "w5-pill--active" : ""}`}>
          {expectedOutput || "Nova City restaurada"}
        </div>
      </div>
      <div className="w5-city-ground" />
    </div>
  );
}

export default function World5Scene({ missionId, missionCompleted, expectedOutput }: Props) {
  const { activated, justActivated } = useSceneState(missionCompleted, missionId, expectedOutput);
  const p = { activated, justActivated, expectedOutput };

  const scenes: Record<number, JSX.Element> = {
    21: <Mission21 {...p} />,
    22: <Mission22 {...p} />,
    23: <Mission23 {...p} />,
    24: <Mission24 {...p} />,
    25: <Mission25 {...p} />,
  };

  return scenes[missionId] ?? <Mission21 {...p} />;
}
