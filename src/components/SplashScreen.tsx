const T = '#0DA5A0';

export default function SplashScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100dvh',
      background: T,
    }}>
      <div className="splash-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {/* Wordmark — deer icon integrado en el nombre igual que Travelin */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'flex-end' }}>
          <span style={{
            fontSize: 46,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: -1,
            lineHeight: 1,
          }}>
            Chaitén
          </span>
          {/* Icon box above, like Travelin's suitcase on "in" */}
          <div style={{
            position: 'absolute',
            top: -22,
            right: -2,
            width: 34,
            height: 34,
            borderRadius: 9,
            background: 'rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}>
            🦌
          </div>
        </div>
        <p style={{
          marginTop: 12,
          fontSize: 14,
          color: 'rgba(255,255,255,0.8)',
          fontWeight: 400,
          letterSpacing: 0.4,
          textAlign: 'center',
        }}>
          Tu pasaporte a la Patagonia Norte
        </p>
      </div>
    </div>
  );
}
