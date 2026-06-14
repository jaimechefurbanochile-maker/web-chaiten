const T = { teal: '#0DA5A0', dark: '#1C2E3A', white: '#FFFFFF' };

interface Props { onStart: () => void }

export default function OnboardingScreen({ onStart }: Props) {
  return (
    <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: '#0A3A2A' }}>

      {/* Full-bleed photo — covers 100% of screen, exactly like Travelin template */}
      <img
        src="https://picsum.photos/id/57/430/780"
        alt="Patagonia"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Gradient overlay — strong at bottom to reveal card */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.2) 100%)',
      }} />

      {/* Language selector — top right, like template */}
      <div style={{ position: 'absolute', top: 52, right: 20, display: 'flex', alignItems: 'center', gap: 4, zIndex: 10 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>Español</span>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>▼</span>
      </div>

      {/* Logo centered on photo — like "Travelin" wordmark in template */}
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
      }}>
        <div className="splash-logo" style={{ display: 'inline-flex', alignItems: 'flex-end', position: 'relative' }}>
          <span style={{ fontSize: 46, fontWeight: 900, color: '#fff', letterSpacing: -1, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Chaitén
          </span>
          <div style={{
            position: 'absolute',
            top: -22,
            right: -4,
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}>
            🦌
          </div>
        </div>
      </div>

      {/* Bottom white card — overlaps the photo, exactly like Travelin */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#F5F6FA',
        borderRadius: '28px 28px 0 0',
        padding: '32px 28px calc(env(safe-area-inset-bottom, 0px) + 44px)',
        zIndex: 10,
      }}>
        <div className="slide-up">
          <h2 style={{
            fontSize: 30,
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
              padding: '17px 24px',
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(13,165,160,0.4)',
              fontFamily: 'inherit',
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
