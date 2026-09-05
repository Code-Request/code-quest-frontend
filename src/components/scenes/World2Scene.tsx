import type { JSX } from "@emotion/react/jsx-runtime";
import { useSceneState } from "../../hooks/useSceneState";
import type { Props } from "./MissionScene";
import "./scenes.css";
import { useEffect, useRef } from "react";

function Mission6({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activated || !outputRef.current) return;
    setTimeout(() => {
      const out = document.createElement("div");
      out.className = "term-line term-line--show";
      out.innerHTML = `<span class="term-out">${expectedOutput || "Ana"}</span>`;
      outputRef.current!.appendChild(out);
    }, 500);
  }, [activated]);

  return (
    <div className="scene scene--w2m6">
      <div className="scene__mission-tag">Misión 6 · Registrar operador</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Registrado" : "Esperando datos"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="terminal">
        <div className="terminal__header">
          <div className="tdot tdot--r" /><div className="tdot tdot--y" /><div className="tdot tdot--g" />
          <span className="terminal__title">registro.py</span>
        </div>
        <div className="terminal__body" ref={outputRef}>
          <div className="term-line term-line--show">
            <span className="term-prompt">$</span>
            <span className="term-muted"> python registro.py</span>
          </div>
          <div className="term-line term-line--show">
            <span className="term-var">nombre</span>
            <span className="term-muted"> = </span>
            {activated
              ? <span className="term-val">"{expectedOutput || "Ana"}"</span>
              : <span className="term-cursor" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission7({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w2m7">
      <div className="scene__mission-tag">Misión 7 · Registrar edad</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Edad registrada" : "Incompleto"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="id-card">
        <div className="id-card__stripe" />
        <div className="id-card__body">
          <div className={`id-card__avatar ${activated ? "id-card__avatar--on" : ""}`}>
            {activated ? "A" : "?"}
          </div>
          <div className="id-card__fields">
            {[
              { label: "NOMBRE", value: "Ana", active: true },
              { label: "EDAD", value: expectedOutput || "25", active: activated },
              { label: "NIVEL", value: "___", active: false },
            ].map((f, i) => (
              <div key={i} className="id-card__field">
                <span className="id-card__flabel">{f.label}</span>
                <span className={`id-card__fvalue ${f.active ? "id-card__fvalue--filled" : ""} ${i === 1 && activated ? "id-card__fvalue--age" : ""}`}>
                  {f.active ? f.value : "___"}
                </span>
              </div>
            ))}
          </div>
          <div className="id-card__footer">NOVA CITY · OPERADOR ID</div>
        </div>
      </div>
    </div>
  );
}

function Mission8({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const nivel = parseInt(expectedOutput || "3") || 3;
  return (
    <div className="scene scene--w2m8">
      <div className="scene__mission-tag">Misión 8 · Nivel de acceso</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Nivel asignado" : "Sin nivel"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="level-panel">
        <div className="level-panel__title">SISTEMA DE NIVELES · NOVA CITY</div>
        <div className="level-panel__bars">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="level-row">
              <span className={`level-num ${activated && i === nivel ? "level-num--active" : ""}`}>{i}</span>
              <div className="level-bar-bg">
                <div
                  className={`level-bar-fill ${activated && i === nivel ? "level-bar-fill--active" : ""}`}
                  style={{
                    width: activated
                      ? i < nivel ? "100%" : i === nivel ? "60%" : "20%"
                      : "0%",
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`level-badge ${activated ? "level-badge--on" : ""}`}>
          {activated ? `nivel = ${nivel}` : "nivel = ???"}
        </div>
      </div>
    </div>
  );
}

function Mission9({ activated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!activated || !countRef.current) return;
    let count = 0;
    const target = parseInt(expectedOutput || "100") || 100;
    const interval = setInterval(() => {
      count += Math.ceil(target / 12);
      if (count >= target) { count = target; clearInterval(interval); }
      if (countRef.current) countRef.current.textContent = String(count);
    }, 80);
    return () => clearInterval(interval);
  }, [activated]);

  return (
    <div className="scene scene--w2m9">
      <div className="scene__mission-tag">Misión 9 · Energía disponible</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Cargando" : "Sin datos"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="energy-panel">
        <div className="energy-panel__header">
          <span className="energy-label">ENERGIA</span>
          <span className={`energy-value ${activated ? "energy-value--on" : ""}`} ref={countRef}>
            {activated ? "0" : "---"}
          </span>
        </div>
        <div className="energy-track">
          <div className={`energy-fill ${activated ? "energy-fill--on" : ""}`} />
        </div>
        <div className="energy-cells">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`ecell ${activated ? "ecell--on" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        <div className={`energy-status ${activated ? "energy-status--on" : ""}`}>
          {activated ? "✓ Generadores al 100%" : "⏳ Generadores apagados"}
        </div>
      </div>
    </div>
  );
}

function Mission10({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const rows = [
    { key: "nombre", val: '"Ana"' },
    { key: "edad",   val: "25" },
    { key: "nivel",  val: "3" },
  ];
  return (
    <div className="scene scene--w2m10">
      <div className="scene__mission-tag">Misión 10 · Ficha completa</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Completo" : "Incompleto"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">
          {expectedOutput.split("\n")[0]}
        </div>
      )} */}
      <div className="ficha">
        <div className="ficha__header">
          <span className="ficha__title">operador_db · ficha.py</span>
          <div className={`ficha__dot ${activated ? "ficha__dot--on" : ""}`} />
        </div>
        <div className="ficha__body">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`ficha-row ${activated ? "ficha-row--show" : ""}`}
              style={{ animationDelay: `${i * 200}ms`, transitionDelay: `${i * 200}ms` }}
            >
              <span className="ficha-key">{r.key}</span>
              <span className="ficha-eq">=</span>
              <span className="ficha-val">{r.val}</span>
            </div>
          ))}
        </div>
        <div className={`ficha__footer ${activated ? "ficha__footer--on" : ""}`}>
          {activated ? "✓ Registro completo" : "⏳ Registro pendiente..."}
        </div>
      </div>
    </div>
  );
}

export default function World2Scene({ missionId, missionCompleted, expectedOutput }: Props) {
  const { activated, justActivated } = useSceneState(missionCompleted, missionId, expectedOutput);
  const p = { activated, justActivated, expectedOutput };

  const scenes: Record<number, JSX.Element> = {
    6:  <Mission6  {...p} />,
    7:  <Mission7  {...p} />,
    8:  <Mission8  {...p} />,
    9:  <Mission9  {...p} />,
    10: <Mission10 {...p} />,
  };

  return scenes[missionId] ?? <Mission6 {...p} />;
}