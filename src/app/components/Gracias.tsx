import logoImage from '@/assets/logo.png';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

export function Gracias({ onClose }: Props) {
  // Al llegar acá el alta se completó: limpiamos cualquier blob del
  // wizard que haya quedado para no reaparecer en una próxima visita.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem('nexo_lead_id');
      sessionStorage.removeItem('nexo_form_data');
      sessionStorage.removeItem('nexo_plan_slug');
    } catch { /* ignore */ }
  }, []);

  // MP puede redirigir con query params (collection_status, status). Hoy
  // mostramos el mismo mensaje de éxito en todos los casos — el detalle
  // de pending/rejected ya se refleja en los emails del backend.

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto" style={{ background: 'linear-gradient(135deg, #12053d 0%, #2d1266 40%, #6535cc 100%)' }}>
      <style>{`
        .gr-card { background: rgba(18,5,61,0.55); border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 2.75rem 2rem; backdrop-filter: blur(32px); box-shadow: 0 8px 40px rgba(0,0,0,0.30); width: 100%; max-width: 520px; text-align: center; }
        .gr-icon { width: 72px; height: 72px; margin: 0 auto 1.5rem; border-radius: 50%; background: linear-gradient(135deg, #8660ef, #ee5cd0); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(134,96,239,0.35); }
        .gr-title { font-family: 'DM Serif Display', serif; font-style: italic; font-size: clamp(1.8rem, 4vw, 2.2rem); font-weight: 400; line-height: 1.2; margin-bottom: 0.6rem; color: #fff; }
        .gr-desc { font-size: 0.95rem; color: rgba(255,255,255,0.75); margin-bottom: 1.75rem; line-height: 1.5; }
        .gr-steps { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 14px; padding: 1.1rem 1.25rem; margin-bottom: 1.75rem; text-align: left; }
        .gr-steps-title { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.5); margin-bottom: 0.9rem; }
        .gr-step { display: flex; align-items: flex-start; gap: 0.8rem; margin-bottom: 0.65rem; }
        .gr-step:last-child { margin-bottom: 0; }
        .gr-step-num { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #8660ef, #ee5cd0); color: #fff; font-size: 0.72rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
        .gr-step-txt { font-size: 0.88rem; color: rgba(255,255,255,0.78); line-height: 1.45; }
        .gr-btn { display: inline-block; width: 100%; padding: 0.95rem 1.5rem; border-radius: 50px; background: linear-gradient(135deg, #8660ef, #ee5cd0); color: #fff; font-family: inherit; font-size: 0.95rem; font-weight: 600; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 6px 20px rgba(134,96,239,0.35); }
        .gr-btn:hover { opacity: 0.92; }
        .gr-btn-secondary { background: transparent; border: 1px solid rgba(255,255,255,0.22); margin-top: 0.6rem; box-shadow: none; }
        @media (max-width: 600px) { .gr-card { padding: 2rem 1.25rem; } }
      `}</style>

      <header style={{ position: 'relative', zIndex: 2, padding: '1.5rem 5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logoImage} alt="Previnca Nexo" style={{ height: 64, width: 'auto' }} />
      </header>

      <main style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem 1.5rem 3rem' }}>
        <div className="gr-card">
          <div className="gr-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>

          <h1 className="gr-title">¡Pago recibido!</h1>
          <p className="gr-desc">
            Tu suscripción fue procesada correctamente. En breve recibirás un email con tus credenciales y la bienvenida a Previnca Nexo.
          </p>

          <div className="gr-steps">
            <p className="gr-steps-title">¿Qué sigue?</p>
            <div className="gr-step">
              <span className="gr-step-num">1</span>
              <span className="gr-step-txt">Revisá tu email — te enviamos un correo de bienvenida con tus credenciales de acceso.</span>
            </div>
            <div className="gr-step">
              <span className="gr-step-num">2</span>
              <span className="gr-step-txt">Con las credenciales podés ingresar al portal en cualquier momento.</span>
            </div>
          </div>

          <a href="https://nexo.portal.previncasalud.com.ar/login" className="gr-btn">Ir al portal →</a>
          <button type="button" className="gr-btn gr-btn-secondary" onClick={onClose}>Volver al sitio</button>
        </div>
      </main>
    </div>
  );
}
