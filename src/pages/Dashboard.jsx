// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProperties } from '../feature/properties/propertySlice';
import { logout } from '../feature/auth/authSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { properties, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // 🔒 Extra safety: ensure properties is always an array
  const propertyList = Array.isArray(properties) ? properties : [];

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading properties...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Property Manager Dashboard</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>
            Welcome, <strong>{user?.name || 'User'}</strong>
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Overview</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>{propertyList.length}</h3>
            <p>Properties</p>
          </div>
        </div>
      </div>

      <div>
        <h2>Your Properties</h2>
        {propertyList.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {propertyList.map(property => (
              <div key={property.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3>{property.name}</h3>
                <p><strong>Location:</strong> {property.city}, {property.country}</p>
                <p><strong>Price/Day:</strong> ${property.price_per_day}</p>
                <p><strong>Status:</strong> {property.available ? 'Available' : 'Not Available'}</p>
                <p><strong>Owner:</strong> {property.owner?.name || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}