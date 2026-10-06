import { ImageResponse } from 'next/og'
import iconSvg from '@/app/icon.svg'
 
export const runtime = 'edge'
 
export const alt = 'Launchify - Fikirlerinizi Koda Dökün'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image(req: Request) {
  const url = new URL(req.url)
  const origin = url.origin
  
  const imgSrc = `${origin}${iconSvg.src}`

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

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <img
              src={imgSrc}
              width="80"
              height="80"
              style={{
                marginRight: '24px',
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
              fontSize: '32px',
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              textAlign: 'center',
              maxWidth: '850px',
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