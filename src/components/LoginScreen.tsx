import { useState } from 'react';

const T = {
  teal:    '#0DA5A0',
  dark:    '#1C2E3A',
  gray:    '#9E9EA7',
  white:   '#FFFFFF',
  bg:      '#F5F6FA',
  grayLight: '#EAEAEA',
};

interface Props { onLogin: () => void }

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ height: '100dvh', background: T.teal, display: 'flex', flexDirection: 'column' }}>

      {/* Top: logo area */}
      <div style={{ padding: '52px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'flex-end', position: 'relative' }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>Chaitén</span>
          <span style={{ fontSize: 16, marginLeft: 3 }}>🦌</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Español</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>▼</span>
        </div>
      </div>

      {/* Main white card */}
      <div style={{
        flex: 1,
        marginTop: 28,
        background: T.white,
        borderRadius: '28px 28px 0 0',
        padding: '32px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>

        {/* Heading — estilo Travelin: "Let's Travel you in." */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, color: T.dark }}>
            Bienvenido a{' '}
            <span style={{ color: T.teal }}>Chaitén.</span>
          </h1>
          <p style={{ marginTop: 8, fontSize: 14, color: T.gray, lineHeight: 1.4 }}>
            Descubre la Patagonia Norte con cada visita
          </p>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 10 }}>
          <input
            className="app-input"
            type="text"
            placeholder="Email o Teléfono"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="app-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: 'right', marginBottom: 24 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 13, color: T.gray, cursor: 'pointer' }}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Sign In button */}
        <button
          onClick={onLogin}
          style={{
            width: '100%',
            background: T.teal,
            color: T.white,
            fontSize: 15,
            fontWeight: 700,
            padding: '16px',
            borderRadius: 100,
            border: 'none',
            cursor: 'pointer',
            marginBottom: 22,
            boxShadow: '0 4px 18px rgba(13,165,160,0.3)',
          }}
        >
          Iniciar sesión
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: T.grayLight }} />
          <span style={{ fontSize: 12, color: T.gray }}>o continúa con</span>
          <div style={{ flex: 1, height: 1, background: T.grayLight }} />
        </div>

        {/* Social login */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
          {[
            { letter: 'G', bg: '#fff', border: '#E5E5E5', color: '#EA4335', label: 'Google' },
            { letter: '', bg: '#fff', border: '#E5E5E5', color: '#000', label: 'Apple', emoji: '🍎' },
            { letter: 'f', bg: '#1877F2', border: '#1877F2', color: '#fff', label: 'Facebook' },
          ].map(s => (
            <button
              key={s.label}
              onClick={onLogin}
              style={{
                width: 64,
                height: 56,
                borderRadius: 16,
                background: s.bg,
                border: `1.5px solid ${s.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                fontSize: s.emoji ? 22 : 20,
                fontWeight: 900,
                color: s.color,
                fontFamily: 'Georgia, serif',
              }}
            >
              {s.emoji ?? s.letter}
            </button>
          ))}
        </div>

        {/* No account */}
        <p style={{ textAlign: 'center', fontSize: 13, color: T.gray }}>
          ¿No tienes cuenta?
        </p>

        <div style={{ flex: 1 }} />
      </div>

      {/* Sign Up at bottom — fuera de la card, sobre el teal */}
      <div style={{
        background: T.white,
        padding: '16px 24px calc(env(safe-area-inset-bottom, 0px) + 16px)',
        textAlign: 'center',
        borderTop: `1px solid ${T.grayLight}`,
      }}>
        <button
          onClick={onLogin}
          style={{ background: 'none', border: 'none', fontSize: 15, fontWeight: 700, color: T.teal, cursor: 'pointer' }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
