import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Muhammad Maaz | Agentic AI & Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #0f172a, #115e59, #0f172a)',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            color: '#2dd4bf',
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          Muhammad Maaz
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: '#f97316',
            marginBottom: 40,
          }}
        >
          Agentic AI & Full-Stack Developer
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#5eead4',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.5,
          }}
        >
          Building intelligent, scalable, and high-performance digital solutions with Next.js, Python, and OpenAI Agents SDK
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
