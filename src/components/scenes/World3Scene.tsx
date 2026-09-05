import type { JSX } from "@emotion/react/jsx-runtime";
import { useSceneState } from "../../hooks/useSceneState";
import type { Props } from "./MissionScene";
import "./scenes.css";

function Mission11({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w3m11">
      <div className="scene__mission-tag">Misión 11 · Verificar acceso</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Acceso autorizado" : "Sin señal"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="w3-access-row">
        <div className="w3-door-wrap">
          <div className={`w3-door ${activated ? "w3-door--open" : ""}`}>
            <div className="w3-door__panel w3-door__panel--l" />
            <div className="w3-door__panel w3-door__panel--r" />
            <div className={`w3-door__light ${activated ? "w3-door__light--green" : ""}`} />
          </div>
          <div className={`w3-door__label ${activated ? "w3-door__label--green" : ""}`}>
            {activated ? "ABIERTA" : "CERRADA"}
          </div>
          <div className="w3-scanlines">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w3-scanline ${activated ? "w3-scanline--pass" : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </div>
        <div className="w3-code-panel">
          <div className="w3-code-line">nivel = 3</div>
          <div className="w3-code-line w3-code-line--dim">if nivel &gt; 2:</div>
          <div className={`w3-pill w3-pill--green ${activated ? "w3-pill--active" : ""}`}>
            Acceso autorizado
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission12({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className={`scene scene--w3m12 ${activated ? "scene--w3m12--alarmed" : ""}`}>
      <div className="scene__mission-tag">Misión 12 · Acceso denegado</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--red" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--red" : ""}`}>
          {activated ? "¡Acceso denegado!" : "Normal"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--red">{expectedOutput}</div>
      )} */}
      <div className="w3-access-row">
        <div className="w3-door-wrap">
          <div className={`w3-door w3-door--locked ${activated ? "w3-door--denied" : ""}`}>
            <div className="w3-door__panel w3-door__panel--solid" />
            <div className={`w3-door__light ${activated ? "w3-door__light--red" : ""}`} />
            <div className={`w3-lock-icon ${activated ? "w3-lock-icon--show" : ""}`}>🔒</div>
          </div>
          <div className={`w3-door__label ${activated ? "w3-door__label--red" : ""}`}>
            BLOQUEADA
          </div>
        </div>
        <div className="w3-code-panel">
          <div className="w3-code-line">nivel = 1</div>
          <div className="w3-code-line w3-code-line--dim">else:</div>
          <div className={`w3-pill w3-pill--red ${activated ? "w3-pill--active" : ""}`}>
            Acceso denegado
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission13({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w3m13">
      <div className="scene__mission-tag">Misión 13 · Sensor de temperatura</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--red" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--red" : ""}`}>
          {activated ? "Temperatura crítica" : "Normal"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--red">{expectedOutput}</div>
      )} */}
      <div className="w3-temp-row">
        <div className={`w3-gauge ${activated ? "w3-gauge--hot" : ""}`}>
          <div className="w3-gauge__inner">
            <div className={`w3-gauge__num ${activated ? "w3-gauge__num--hot" : ""}`}>
              {activated ? "90" : "0"}
            </div>
            <div className="w3-gauge__unit">°C</div>
          </div>
        </div>
        <div className="w3-code-panel">
          <div className="w3-threshold">umbral: 80°C</div>
          <div className="w3-temp-track">
            <div className={`w3-temp-fill ${activated ? "w3-temp-fill--hot" : ""}`} />
          </div>
          <div className={`w3-pill w3-pill--red ${activated ? "w3-pill--active" : ""}`}>
            Temperatura critica
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission14({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w3m14">
      <div className="scene__mission-tag">Misión 14 · Estado del generador</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--on" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--on" : ""}`}>
          {activated ? "Operativo" : "En reserva"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--green">{expectedOutput}</div>
      )} */}
      <div className="w3-gen-row">
        <div className={`w3-gen-box ${activated ? "w3-gen-box--on" : ""}`}>
          <div className="w3-gen-leds">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w3-gen-led ${activated ? "w3-gen-led--on" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
          <div className={`w3-gen-label ${activated ? "w3-gen-label--on" : ""}`}>GEN-1</div>
        </div>
        <div className="w3-code-panel">
          <div className="w3-code-line">energia = 50</div>
          <div className="w3-energy-track">
            <div className={`w3-energy-fill ${activated ? "w3-energy-fill--on" : ""}`} />
          </div>
          <div className="w3-energy-cells">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w3-ecell ${activated ? "w3-ecell--on" : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
          <div className={`w3-pill w3-pill--green ${activated ? "w3-pill--active" : ""}`}>
            Generador operativo
          </div>
        </div>
      </div>
    </div>
  );
}

function Mission15({ activated }: {
  activated: boolean; justActivated: boolean; expectedOutput: string;
}) {
  return (
    <div className="scene scene--w3m15">
      <div className="scene__mission-tag">Misión 15 · Puerta del núcleo</div>
      <div className="scene__status">
        <span className={`scene__dot ${activated ? "scene__dot--purple" : ""}`} />
        <span className={`scene__label ${activated ? "scene__label--purple" : ""}`}>
          {activated ? "Desbloqueada" : "Bloqueada"}
        </span>
      </div>
      {/* {justActivated && expectedOutput && (
        <div className="scene__output-banner scene__output-banner--purple">{expectedOutput}</div>
      )} */}
      <div className="w3-core-row">
        <div className="w3-keypad">
          <div className="w3-keypad__screen">
            <div className={`w3-keypad__text ${activated ? "w3-keypad__text--verified" : ""}`}>
              {activated ? "Admin ✓" : "_ _ _ _ _"}
            </div>
          </div>
          <div className="w3-keypad__grid">
            {["1","2","3","4","5","6","7","8","9","*","OK","#"].map((k, i) => (
              <div key={i} className={`w3-key ${activated && k === "OK" ? "w3-key--lit" : ""}`}>
                {k}
              </div>
            ))}
          </div>
        </div>
        <div className="w3-core-col">
          <div className={`w3-core-ring ${activated ? "w3-core-ring--active" : ""}`}>
            <div className="w3-core-inner" />
          </div>
          <div className={`w3-pill w3-pill--purple ${activated ? "w3-pill--active" : ""}`}>
            Puerta desbloqueada
          </div>
        </div>
      </div>
    </div>
  );
}

export default function World3Scene({ missionId, missionCompleted, expectedOutput }: Props) {
  const { activated, justActivated } = useSceneState(missionCompleted, missionId, expectedOutput);
  const p = { activated, justActivated, expectedOutput };

  const scenes: Record<number, JSX.Element> = {
    11: <Mission11 {...p} />,
    12: <Mission12 {...p} />,
    13: <Mission13 {...p} />,
    14: <Mission14 {...p} />,
    15: <Mission15 {...p} />,
  };

  return scenes[missionId] ?? <Mission11 {...p} />;
}
