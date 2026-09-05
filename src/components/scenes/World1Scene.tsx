import type { JSX } from "@emotion/react/jsx-runtime";
import { useSceneState } from "../../hooks/useSceneState";
import type { Props } from "./MissionScene";
import "./scenes.css";
import { useEffect, useRef } from "react";

function Mission1({ activated, justActivated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cityRef.current) return;
    const cfg = [
      {w:28,h:55},{w:20,h:38},{w:32,h:80},{w:24,h:50},{w:38,h:98},
      {w:26,h:62},{w:22,h:42},{w:34,h:74},{w:20,h:35},{w:30,h:60},{w:26,h:48}
    ];
    cityRef.current.innerHTML = "";
    cfg.forEach((b, i) => {
      const el = document.createElement("div");
      el.className = "w1-bld";
      el.style.cssText = `width:${b.w}px;height:${b.h}px`;
      const cols = Math.floor((b.w - 6) / 9);
      const rows = Math.floor((b.h - 10) / 12);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const w = document.createElement("div");
          w.className = "w1-win";
          w.style.cssText = `top:${8 + r * 12}px;left:${4 + c * 9}px;transition-delay:${(i * cols * rows + r * cols + c) * 18}ms`;
          el.appendChild(w);
        }
      }
      cityRef.current!.appendChild(el);
    });
  }, []);

  useEffect(() => {
    if (!activated || !cityRef.current) return;
    cityRef.current.querySelectorAll(".w1-win").forEach(w => w.classList.add("w1-win--lit"));
  }, [activated]);

  return (
    <div className="scene scene--world1">
      <div className="scene__stars" />
      <div className="scene__mission-tag">Misión 1 · Antena principal</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Señal activa" : "Sin señal"}
        </span>
      </div>
      {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--red">{expectedOutput}</div>
      )}
      <div className="w1-city" ref={cityRef} />
      <div className="w1-ant-wrap">
        <div className={`w1-ant ${activated ? "w1-ant--on" : ""}`}>
          <div className="w1-ant__ring w1-ant__ring--1" />
          <div className="w1-ant__ring w1-ant__ring--2" />
          <div className="w1-ant__ring w1-ant__ring--3" />
          <div className="w1-ant__tip" />
          <div className="w1-ant__shaft" />
          <div className="w1-ant__arm w1-ant__arm--l" />
          <div className="w1-ant__arm w1-ant__arm--r" />
          <div className="w1-ant__base" />
        </div>
      </div>
      <div className="w1-ground" />
    </div>
  );
}

function Mission2({ activated, justActivated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w2id">
      <div className="scene__mission-tag">Misión 2 · Identificar operador</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Verificado" : "Sin identificar"}
        </span>
      </div>
      {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )}
      <div className="id-screen">
        <div className="id-screen__header">
          <div className="id-screen__logo" />
          <span className="id-screen__title">NOVA_CITY · ID SYSTEM</span>
        </div>
        <div className="id-screen__body">
          <div className="id-field">
            <div className="id-field__label">OPERADOR</div>
            <div className={`id-field__value ${activated ? "id-field__value--filled" : ""}`}>
              {activated ? "Ana" : <span className="id-cursor" />}
            </div>
          </div>
          <div className="id-field">
            <div className="id-field__label">ESTADO</div>
            <div className={`id-field__value ${activated ? "id-field__value--active" : ""}`}>
              {activated ? "Activo" : <span className="id-cursor" />}
            </div>
          </div>
          <div className={`id-badge ${activated ? "id-badge--ok" : ""}`}>
            {activated ? "✓ Operador verificado" : "⛔ No verificado"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission3({ activated, expectedOutput }: {
  activated: boolean; expectedOutput: string;
}) {
  const alerts = [
    "SECTOR_NORTE · Sin actividad",
    "SENSOR_7 · En línea",
    "RED_EMERGENCIA · Inactiva",
  ];
  return (
    <div className={`scene scene--w3alert ${activated ? "scene--w3alert--alarmed" : ""}`}>
      <div className="scene__mission-tag">Misión 3 · Señal de alerta</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--red" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--red" : ""}`}>
          {activated ? "¡Alerta activa!" : "Normal"}
        </span>
      </div>
      <div className={`alert-big ${activated ? "alert-big--show" : ""}`}>
        {expectedOutput || "ALERTA"}
      </div>
      <div className="alert-panel">
        {alerts.map((text, i) => (
          <div
            key={i}
            className={`alert-row ${activated ? "alert-row--firing" : ""}`}
            style={{ animationDelay: `${i * 0.2}s`, transitionDelay: `${i * 150}ms` }}
          >
            <div className={`alert-led ${activated ? "alert-led--on" : ""}`} />
            <span className="alert-text">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Mission4({ activated, justActivated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w4cable">
      <div className="scene__mission-tag">Misión 4 · Canal seguro</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Conectado" : "Desconectado"}
        </span>
      </div>
      {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )}
      <div className="cable-scene">
        <div className="cable-towers">
          {["TORRE_A", "TORRE_B"].map((label, i) => (
            <div key={i} className="cable-tower">
              <div className="cable-tower__head">
                <div className={`cable-tower__icon ${activated ? "cable-tower__icon--on" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }} />
              </div>
              <div className="cable-tower__base" />
              <span className="cable-tower__label">{label}</span>
            </div>
          ))}
        </div>
        <div className="cable-row">
          <div className={`cable-plug ${activated ? "cable-plug--on" : ""}`} style={{ transitionDelay: "0ms" }} />
          <div className={`cable-line ${activated ? "cable-line--on" : ""}`} style={{ transitionDelay: "120ms" }} />
          <div className={`cable-gap ${activated ? "cable-gap--closed" : ""}`}>
            {activated ? "✓" : "✕"}
          </div>
          <div className={`cable-line ${activated ? "cable-line--on" : ""}`} style={{ transitionDelay: "240ms" }} />
          <div className={`cable-plug ${activated ? "cable-plug--on" : ""}`} style={{ transitionDelay: "360ms" }} />
        </div>
        <div className={`cable-status ${activated ? "cable-status--on" : ""}`}>
          {activated ? "● Canal seguro conectado" : "● Canal interrumpido"}
        </div>
      </div>
    </div>
  );
}

function Mission5({ activated, justActivated, expectedOutput }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cityRef.current) return;
    const cfg = [
      {w:22,h:44},{w:18,h:32},{w:28,h:68},{w:20,h:42},{w:36,h:90},
      {w:24,h:56},{w:18,h:36},{w:30,h:72},{w:22,h:48},{w:26,h:62},
      {w:20,h:38},{w:28,h:52},{w:16,h:30},{w:24,h:44}
    ];
    cityRef.current.innerHTML = "";
    cfg.forEach((b, i) => {
      const el = document.createElement("div");
      el.className = "b5";
      el.style.cssText = `width:${b.w}px;height:${b.h}px`;
      const cols = Math.max(1, Math.floor((b.w - 4) / 8));
      const rows = Math.max(1, Math.floor((b.h - 8) / 10));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const w = document.createElement("div");
          w.className = "b5-win";
          w.style.cssText = `top:${6 + r * 10}px;left:${3 + c * 8}px;transition-delay:${(i * 20 + r * cols + c) * 22}ms`;
          el.appendChild(w);
        }
      }
      cityRef.current!.appendChild(el);
    });
  }, []);

  useEffect(() => {
    if (!activated || !cityRef.current) return;
    cityRef.current.querySelectorAll(".b5").forEach(b => b.classList.add("b5--lit"));
    cityRef.current.querySelectorAll(".b5-win").forEach(w => w.classList.add("b5-win--lit"));
  }, [activated]);

  return (
    <div className="scene scene--w5city">
      <div className="scene__mission-tag">Misión 5 · Sistema restaurado</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Restaurado" : "Apagado"}
        </span>
      </div>
      {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )}
      <div className="w5-sky">
        <div className={`w5-moon ${activated ? "w5-moon--bright" : ""}`} />
      </div>
      <div className="w5-city" ref={cityRef} />
      <div className="w5-powerbar">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`w5-pb ${activated ? "w5-pb--on" : ""}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <div className="w5-ground" />
    </div>
  );
}

export default function World1Scene({ missionId, missionCompleted, expectedOutput }: Props) {
  const { activated, justActivated } = useSceneState(missionCompleted, missionId, expectedOutput);

  const sceneProps = { activated, justActivated, expectedOutput };

  const scenes: Record<number, JSX.Element> = {
    1: <Mission1 {...sceneProps} />,
    2: <Mission2 {...sceneProps} />,
    3: <Mission3 {...sceneProps} />,
    4: <Mission4 {...sceneProps} />,
    5: <Mission5 {...sceneProps} />,
  };

  return scenes[missionId] ?? scenes[1];
}