import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0A0A0A',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid Pattern Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0, 245, 255, 0.05) 0%, transparent 50%)',
          }}
        />

        {/* Top Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 60px',
            background: 'rgba(10, 10, 10, 0.9)',
            borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#00F5FF', letterSpacing: '-0.5px' }}>
              Maaz
            </span>
            <span style={{ fontSize: '28px', color: '#00BFFF' }}>.</span>
          </div>
          <div style={{ display: 'flex', gap: '30px', fontSize: '16px', color: '#F1F1F1' }}>
            <span>Home</span>
            <span>About</span>
            <span>Skills</span>
            <span>Projects</span>
          </div>
          <div
            style={{
              padding: '10px 24px',
              border: '2px solid #00F5FF',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#00F5FF',
            }}
          >
            Hire Me
          </div>
        </div>

        {/* Main Hero Content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px 80px',
            flex: 1,
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Left Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '650px' }}>
            <div
              style={{
                fontSize: '72px',
                fontWeight: '800',
                lineHeight: '1.1',
                color: '#F1F1F1',
                letterSpacing: '-2px',
              }}
            >
              Hi, I'm
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #00F5FF, #00BFFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Muhammad Maaz
              </span>
            </div>

            <div
              style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#A3A3A3',
                lineHeight: '1.3',
              }}
            >
              Agentic AI & Full-Stack Developer
            </div>

            <div
              style={{
                fontSize: '18px',
                color: '#A3A3A3',
                lineHeight: '1.6',
                maxWidth: '500px',
              }}
            >
              Building intelligent, scalable digital solutions with Next.js, Python, and OpenAI Agents SDK
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
              <div
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #00F5FF, #00BFFF)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                View Projects →
              </div>
              <div
                style={{
                  padding: '16px 32px',
                  border: '2px solid #00F5FF',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#00F5FF',
                  background: 'rgba(0, 245, 255, 0.05)',
                }}
              >
                Download CV ↓
              </div>
            </div>
          </div>

          {/* Right Profile Image Placeholder */}
          <div
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00F5FF, #00BFFF)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(0, 191, 255, 0.1)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#1A1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '72px',
                color: '#00F5FF',
                fontWeight: '800',
              }}
            >
              MM
            </div>
          </div>
        </div>

        {/* Bottom Tech Stack */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            padding: '30px 60px',
            borderTop: '1px solid rgba(0, 245, 255, 0.1)',
            background: 'rgba(26, 26, 26, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {['Next.js', 'Python', 'React', 'OpenAI', 'AWS', 'Docker'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 20px',
                background: 'rgba(0, 245, 255, 0.05)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#00F5FF',
                fontWeight: '500',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
