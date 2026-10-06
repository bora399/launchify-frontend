import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Launchify - Fikirlerinizi Koda Dökün'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />

        {/* İçerik */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                borderRadius: '16px',
                marginRight: '24px',
                boxShadow: '0 0 30px rgba(99,102,241,0.5)',
              }}
            />
            <h1
              style={{
                fontSize: '72px',
                fontWeight: '900',
                color: 'white',
                margin: 0,
                letterSpacing: '-0.05em',
              }}
            >
              Launchify.
            </h1>
          </div>

          {/* Slogan */}
          <h2
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#FAFAFA',
              textAlign: 'center',
              lineHeight: 1.1,
              maxWidth: '900px',
              margin: '0 0 30px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Fikirlerinizi saniyeler içinde koda dökün.
          </h2>

          <p
            style={{
              fontSize: '32px',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
              textAlign: 'center',
            }}
          >
            AI Destekli Site Mimarı
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}