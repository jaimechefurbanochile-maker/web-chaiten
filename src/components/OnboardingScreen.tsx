const T = { teal: '#0DA5A0', dark: '#1C2E3A', white: '#FFFFFF' };

interface Props { onStart: () => void }

export default function OnboardingScreen({ onStart }: Props) {
  return (
    <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: '#0A3A2A' }}>

      {/* Full-bleed photo — aerial Patagonia */}
      <img
        src="https://picsum.photos/seed/patagonia-fjord/430/780"
        alt="Patagonia"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '68%', objectFit: 'cover' }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.3) 62%)',
      }} />

      {/* Top: language selector (estilo Travelin) */}
      <div style={{ position: 'absolute', top: 52, right: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Español</span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>▼</span>
      </div>

      {/* Center logo over photo */}
      <div style={{
        position: 'absolute',
        top: '36%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div className="splash-logo" style={{ display: 'inline-flex', alignItems: 'flex-end', position: 'relative' }}>
          <span style={{ fontSize: 42, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            Chaitén
          </span>
          <div style={{
            position: 'absolute',
            top: -20,
            right: -4,
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            🦌
          </div>
        </div>
      </div>

      {/* Bottom white card (estilo Travelin) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderRadius: '28px 28px 0 0',
        padding: '32px 28px 44px',
      }}>
        <div className="slide-up">
          <h2 style={{
            fontSize: 28,
            fontWeight: 800,
            color: T.dark,
            lineHeight: 1.25,
            marginBottom: 28,
          }}>
            ¿Listo para explorar<br />
            <span style={{ color: T.teal }}>más allá?</span>
          </h2>

          <button
            onClick={onStart}
            style={{
              width: '100%',
              background: T.teal,
              color: T.white,
              fontSize: 15,
              fontWeight: 700,
              padding: '16px 24px',
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(13,165,160,0.35)',
            }}
          >
            Tu viaje a Chaitén comienza aquí
            <span style={{ fontSize: 18 }}>✈</span>
          </button>
        </div>
      </div>
    </div>
  );
}
