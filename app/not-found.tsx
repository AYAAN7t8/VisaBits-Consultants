export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f8fafc'
    }}>
      <h1 style={{ 
        fontSize: '3rem',
        color: '#0a4b7a',
        marginBottom: '1rem',
        fontWeight: 'bold'
      }}>
        404 - Page Not Found
      </h1>
      <p style={{ 
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '2rem'
      }}>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <a 
        href="/"
        style={{
          backgroundColor: '#0a4b7a',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontSize: '1rem',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Return Home
      </a>
    </div>
  );
}