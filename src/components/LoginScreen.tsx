import { useState } from 'react';

const T = {
  teal:      '#0DA5A0',
  dark:      '#1C2E3A',
  gray:      '#9E9EA7',
  white:     '#FFFFFF',
  grayLight: '#EAEAEA',
};

interface Props { onLogin: () => void }

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{
      height: '100dvh',
      background: T.teal,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>

      {/* Language selector */}
      <div style={{ padding: '52px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Español</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>▼</span>
        </div>
      </div>

      {/* Floating card — exactly like Travelin template */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '20px 20px 0' }}>
        <div style={{
          width: '100%',
          background: '#F5F6FA',
          borderRadius: 28,
          padding: '36px 24px 28px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
        }}>

          {/* Heading: "Let's Travel you in." style */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: T.dark, marginBottom: 10 }}>
              Bienvenido a{' '}
              <span style={{ color: T.teal }}>Chaitén.</span>
            </h1>
            <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.5, fontWeight: 400 }}>
              Descubre la Patagonia Norte con cada visita
            </p>
          </div>

          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 12 }}>
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
            <button style={{ background: 'none', border: 'none', fontSize: 13, color: T.gray, cursor: 'pointer', fontFamily: 'inherit' }}>
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
              boxShadow: '0 6px 20px rgba(13,165,160,0.4)',
              fontFamily: 'inherit',
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

          {/* Social login — large square cards like template */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            {[
              { content: 'G',  bg: '#fff', border: '#E5E5E5', color: '#EA4335', label: 'Google',   serif: true },
              { content: '',   bg: '#fff', border: '#E5E5E5', color: '#000',    label: 'Apple',    emoji: '🍎' },
              { content: 'f',  bg: '#1877F2', border: '#1877F2', color: '#fff', label: 'Facebook', serif: true },
            ].map(s => (
              <button
                key={s.label}
                onClick={onLogin}
                style={{
                  width: 72, height: 60,
                  borderRadius: 18,
                  background: s.bg,
                  border: `1.5px solid ${s.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  fontSize: s.emoji ? 24 : 22,
                  fontWeight: 900,
                  color: s.color,
                  fontFamily: s.serif ? 'Georgia, serif' : 'inherit',
                }}
              >
                {s.emoji ?? s.content}
              </button>
            ))}
          </div>

          {/* No account */}
          <p style={{ textAlign: 'center', fontSize: 13, color: T.gray, fontWeight: 400 }}>
            ¿No tienes cuenta?
          </p>
        </div>
      </div>

      {/* Sign Up — below card on teal bg, like template */}
      <div style={{
        padding: '20px 24px calc(env(safe-area-inset-bottom, 0px) + 24px)',
        textAlign: 'center',
      }}>
        <button
          onClick={onLogin}
          style={{
            background: 'none', border: 'none',
            fontSize: 16, fontWeight: 700,
            color: T.white, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
