import type { JSX } from "@emotion/react/jsx-runtime";
import { useSceneState } from "../../hooks/useSceneState";
import type { Props } from "./MissionScene";
import "./scenes.css";
import { useEffect, useRef } from "react";

/* ── Drone helper ── */
function Drone({ id, activated, delay }: { id: string; activated: boolean; delay: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className={`w4-drone ${activated ? "w4-drone--active" : ""}`}
        style={{ animationDelay: activated ? `${delay}ms` : "0ms" }}
      >
        <div className="w4-drone__arm w4-drone__arm--tl" />
        <div className="w4-drone__arm w4-drone__arm--tr" />
        <div className="w4-drone__arm w4-drone__arm--bl" />
        <div className="w4-drone__arm w4-drone__arm--br" />
        <div className="w4-drone__prop w4-drone__prop--tl" style={{ animationDelay: activated ? `${delay}ms` : "0ms" }} />
        <div className="w4-drone__prop w4-drone__prop--tr" style={{ animationDelay: activated ? `${delay}ms` : "0ms" }} />
        <div className="w4-drone__prop w4-drone__prop--bl" style={{ animationDelay: activated ? `${delay}ms` : "0ms" }} />
        <div className="w4-drone__prop w4-drone__prop--br" style={{ animationDelay: activated ? `${delay}ms` : "0ms" }} />
        <div className="w4-drone__body" />
        <div className="w4-drone__led" />
      </div>
      <div className={`w4-drone__label ${activated ? "w4-drone__label--on" : ""}`}>{id}</div>
    </div>
  );
}

/* ── Misión 16 — Reiniciar drones ── */
function Mission16({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w4m16">
      <div className="scene__mission-tag">Misión 16 · Reiniciar drones</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Activos" : "Apagados"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--blue">{expectedOutput}</div>
      )} */}
      <div className="w4-drones-wrap">
        <Drone id="D-01" activated={activated} delay={0} />
        <Drone id="D-02" activated={activated} delay={350} />
        <Drone id="D-03" activated={activated} delay={700} />
      </div>
    </div>
  );
}

/* ── Misión 17 — Numerar drones ── */
function Mission17({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const rows = [1, 2, 3, 4, 5];
  return (
    <div className="scene scene--w4m17">
      <div className="scene__mission-tag">Misión 17 · Numerar drones</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Numerados" : "Esperando"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--blue">{expectedOutput}</div>
      )} */}
      <div className="w4-numlist">
        {rows.map((n, i) => (
          <div
            key={n}
            className={`w4-numrow ${activated ? "w4-numrow--lit" : ""}`}
            style={{ transitionDelay: `${i * 180}ms`, animationDelay: `${i * 180}ms` }}
          >
            <span className="w4-numrow__n">{n}</span>
            <div className="w4-numrow__bar">
              <div
                className={`w4-numrow__fill ${activated ? "w4-numrow__fill--on" : ""}`}
                style={{ transitionDelay: `${i * 180}ms` }}
              />
            </div>
            <span className="w4-numrow__lbl">Drone {n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Misión 18 — Revisar sectores ── */
function Mission18({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activated || !scanRef.current) return;
    scanRef.current.classList.remove("w4-scanline--active");
    void (scanRef.current as HTMLElement).offsetWidth;
    scanRef.current.classList.add("w4-scanline--active");
  }, [activated]);

  const sectors = [
    { id: "norte", label: "NORTE", delay: 300 },
    { id: "sur",   label: "SUR",   delay: 700 },
    { id: "este",  label: "ESTE",  delay: 1100 },
  ];

  return (
    <div className="scene scene--w4m18">
      <div className="scene__mission-tag">Misión 18 · Revisar sectores</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--cyan" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--cyan" : ""}`}>
          {activated ? "Escaneado" : "Inactivo"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--blue">{expectedOutput}</div>
      )} */}
      <div className="w4-sector-map">
        <div className="w4-scanline" ref={scanRef} />
        {sectors.map(s => (
          <div
            key={s.id}
            className={`w4-sector w4-sector--${s.id} ${activated ? "w4-sector--active" : ""}`}
            style={{ transitionDelay: `${s.delay}ms` }}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Misión 19 — Cuenta regresiva ── */
function Mission19({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const numRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!activated || !numRef.current) return;

    let n = 3;
    numRef.current.textContent = String(n);
    dotsRef.current.forEach(d => d?.classList.remove("w4-cdot--lit"));
    dotsRef.current[2]?.classList.add("w4-cdot--lit");

    intervalRef.current = setInterval(() => {
      n--;
      if (!numRef.current) return;
      numRef.current.textContent = n > 0 ? String(n) : "🚀";
      dotsRef.current.forEach(d => d?.classList.remove("w4-cdot--lit"));
      if (n === 2) dotsRef.current[1]?.classList.add("w4-cdot--lit");
      if (n === 1) dotsRef.current[0]?.classList.add("w4-cdot--lit");
      if (n <= 0) clearInterval(intervalRef.current!);
    }, 900);

    return () => clearInterval(intervalRef.current!);
  }, [activated]);

  useEffect(() => {
    if (!activated && numRef.current) {
      numRef.current.textContent = "3";
      dotsRef.current.forEach(d => d?.classList.remove("w4-cdot--lit"));
    }
  }, [activated]);

  return (
    <div className="scene scene--w4m19">
      <div className="scene__mission-tag">Misión 19 · Cuenta regresiva</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--purple" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--purple" : ""}`}>
          {activated ? "Ejecutando" : "En espera"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="w4-countdown">
        <div className={`w4-countdown__num ${activated ? "w4-countdown__num--on" : ""}`} ref={numRef}>3</div>
        <div className="w4-countdown__dots">
          {[0, 1, 2].map(i => (
            <div key={i} className="w4-cdot" ref={el => { if (el) dotsRef.current[i] = el; }} />
          ))}
        </div>
        <div className={`w4-countdown__label ${activated ? "w4-countdown__label--on" : ""}`}>
          CUENTA REGRESIVA
        </div>
      </div>
    </div>
  );
}

/* ── Misión 20 — Sistema reparado ── */
function Mission20({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const ringRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  const CIRCUMFERENCE = 220;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!activated) {
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE);
      if (countRef.current) countRef.current.textContent = "0/3";
      barsRef.current.forEach(b => { if (b) b.style.width = "0%"; });
      return;
    }

    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE - (step / 3) * CIRCUMFERENCE);
      if (countRef.current) countRef.current.textContent = `${step}/3`;
      if (barsRef.current[step - 1]) barsRef.current[step - 1].style.width = "100%";
      if (step >= 3) clearInterval(intervalRef.current!);
    }, 600);

    return () => clearInterval(intervalRef.current!);
  }, [activated]);

  return (
    <div className="scene scene--w4m20">
      <div className="scene__mission-tag">Misión 20 · Sistema reparado</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Completo" : "Reparando..."}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="w4-repair">
        <div className="w4-repair__ring-wrap">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle className="w4-ring-bg" cx="40" cy="40" r="35" />
            <circle
              className={`w4-ring-fill ${activated ? "w4-ring-fill--on" : ""}`}
              cx="40" cy="40" r="35"
              ref={ringRef}
            />
          </svg>
          <div className={`w4-ring-count ${activated ? "w4-ring-count--on" : ""}`} ref={countRef}>0/3</div>
        </div>
        <div className="w4-repair__bars">
          {[0, 1, 2].map(i => (
            <div key={i} className="w4-rbar">
              <div
                className="w4-rbar__fill"
                ref={el => { if (el) barsRef.current[i] = el; }}
              />
            </div>
          ))}
          <div className="w4-repair__sublabel">módulos reparados</div>
        </div>
      </div>
    </div>
  );
}

/* ── Export ── */
export default function World4Scene({ missionId, missionCompleted, expectedOutput }: Props) {
  const { activated, justActivated } = useSceneState(missionCompleted, missionId, expectedOutput);
  const p = { activated, justActivated, expectedOutput };

  const scenes: Record<number, JSX.Element> = {
    16: <Mission16 {...p} />,
    17: <Mission17 {...p} />,
    18: <Mission18 {...p} />,
    19: <Mission19 {...p} />,
    20: <Mission20 {...p} />,
  };

  return scenes[missionId] ?? <Mission16 {...p} />;
}
