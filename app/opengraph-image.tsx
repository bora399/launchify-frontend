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
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '16px',
            background: 'linear-gradient(to right, #407ec9, #7bed97)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512" 
              width="100" 
              height="100" 
              style={{ marginRight: '30px' }}
            >
              <defs>
                <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#407ec9"/>
                  <stop offset="100%" stopColor="#4abec3"/>
                </linearGradient>
                
                <linearGradient id="rightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6ad5bd"/>
                  <stop offset="100%" stopColor="#7bed97"/>
                </linearGradient>
              </defs>
              
              <rect x="16" y="16" width="480" height="480" rx="140" fill="#1e1e1e" stroke="#333333" strokeWidth="6"/>
              
              <line x1="256" y1="16" x2="256" y2="496" stroke="#262626" strokeWidth="4"/>
              <line x1="16" y1="256" x2="496" y2="256" stroke="#262626" strokeWidth="4"/>

              <polygon points="256,136 136,376 256,312" fill="url(#leftGrad)"/>
              <polygon points="256,136 376,376 256,312" fill="url(#rightGrad)"/>
            </svg>
            
            <h1
              style={{
                fontSize: '80px',
                fontWeight: '900',
                color: 'white',
                margin: 0,
                letterSpacing: '-0.05em',
              }}
            >
              Launchify.
            </h1>
          </div>

          <h2
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#FAFAFA',
              textAlign: 'center',
              lineHeight: 1.1,
              maxWidth: '900px',
              margin: '0 0 24px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Fikirlerinizi Koda Dökün.
          </h2>

          <p
            style={{
              fontSize: '36px',
              color: '#a1a1aa',
              margin: 0,
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Fikirlerinizi saniyeler içinde dönüşüm odaklı, profesyonel web sayfalarına dönüştüren platform.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}