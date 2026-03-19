import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: '#f8fafc'
    }}>
      <h1 style={{ 
        fontSize: '4rem', 
        color: '#0a4b7a',
        marginBottom: '1rem'
      }}>
        404
      </h1>
      <h2 style={{ 
        fontSize: '2rem',
        color: '#1e2b37',
        marginBottom: '1rem'
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        color: '#4a5b6b',
        marginBottom: '2rem',
        maxWidth: '500px'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        style={{
          background: '#0a4b7a',
          color: 'white',
          padding: '1rem 2rem',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-block'
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}