import React, { useState, useEffect } from 'react';
import { httpService } from '../services/httpService';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const userId = localStorage.getItem("userId"); // Obtén el ID del usuario

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfileData(prevData => ({
          ...prevData,
          [name]: value
      }));
  };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await httpService.get(`/profiles/${userId}`);
                setProfileData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
            const data = await httpService.put(`/profiles/${profileData.id}`, profileData);
            setProfileData(data);
      } catch (error) {
          console.error('Error:', error);
      }
  };

    if (!profileData) return <div></div>;

    return (
      <div className="profile-form container mt-5">
      <form onSubmit={handleSubmit} className="card">
          <div className="card-header">
              <h3>Editar Perfil</h3>
          </div>
          <div className="card-body">
              <div className="form-group mb-3">
                  <label htmlFor="first_name" className="form-label">Primer Nombre:</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="first_name"
                      name="first_name" 
                      value={profileData.first_name || ''} 
                      onChange={handleChange} 
                  />
              </div>
              <div className="form-group mb-3">
                  <label htmlFor="second_name" className="form-label">Segundo Nombre:</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="second_name"
                      name="second_name" 
                      value={profileData.second_name || ''} 
                      onChange={handleChange} 
                  />
              </div>
              <div className="form-group mb-3">
                  <label htmlFor="last_name" className="form-label">Primer Apellido:</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="last_name"
                      name="last_name" 
                      value={profileData.last_name || ''} 
                      onChange={handleChange} 
                  />
              </div>
              <div className="form-group mb-3">
                  <label htmlFor="second_last_name" className="form-label">Segundo Apellido:</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="second_last_name"
                      name="second_last_name" 
                      value={profileData.second_last_name || ''} 
                      onChange={handleChange} 
                  />
              </div>
              <div className="form-group mb-3">
                  <label htmlFor="phone_number" className="form-label">Teléfono:</label>
                  <input 
                      type="text" 
                      className="form-control" 
                      id="phone_number"
                      name="phone_number" 
                      value={profileData.phone_number || ''} 
                      onChange={handleChange} 
                  />
              </div>
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
    </div>
    );
};

export default Profile;
