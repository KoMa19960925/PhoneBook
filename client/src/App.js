import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [viewName, setViewName] = useState('');
  const [viewPhone, setViewPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addNewNumber = async () => {
    if (!name || !phone) {
      setError('Please enter a name and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:8080/new-phone', { name, phone });
      setSuccessMessage('New number added');
      setName('');
      setPhone('');
    } catch (error) {
      setError('Error adding number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateNumber = async () => {
    if (!name || !phone || !id) {
      setError('Please enter a name, phone number, and ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.put(`http://localhost:8080/update-phone/${id}`, { name, phone });
      setSuccessMessage('Number updated');
      setName('');
      setPhone('');
      setId('');
    } catch (error) {
      setError('Error updating number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const viewNumber = async () => {
    if (!id) {
      setError('Please enter an ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:8080/view-phone/${id}`);
      const { data } = response;

      if (data) {
        setViewName(data.name);
        setViewPhone(data.phone);
      } else {
        setError('No data found for the given ID.');
        setViewName('');
        setViewPhone('');
      }
    } catch (error) {
      setError('Error retrieving number. Please try again.');
      setViewName('');
      setViewPhone('');
    } finally {
      setLoading(false);
    }
  };

  const deleteNumber = async () => {
    if (!id) {
      setError('Please enter an ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.delete(`http://localhost:8080/delete-phone/${id}`);
      setSuccessMessage('Number deleted');
      setViewName('');
      setViewPhone('');
      setId('');
    } catch (error) {
      setError('Error deleting number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName('');
    setPhone('');
    setId('');
    setViewName('');
    setViewPhone('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <body>
      <div>
    <div className="container">
      <div className="heading-container">
        <h1 className="heading">Phone Book</h1>
      </div>
      <div className="form-container">
        <div className="input-container">

        {/* <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            className="input"
          /> */}

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="input"
          />
         
          <div className="button-container">
            <button className="button" onClick={addNewNumber} style={{marginBottom: '10px'}}>
              Add Phone
            </button>
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            className="input"
          />

          <div className="button-container">

          {/* <button className="button" onClick={addNewNumber} style={{marginBottom: '40px'}}>
              Add Phone
            </button> */}

            <button className="button" onClick={updateNumber}>
              Update Phone
            </button>
            <button className="button" onClick={viewNumber}>
              View Phone
            </button>
            <button className="button" onClick={deleteNumber}>
              Delete Phone
            </button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="view-container">
          {viewName && <p>Viewed Name: {viewName}</p>}
          {viewPhone && <p>Viewed Phone: {viewPhone}</p>}
        </div>
        <div className="button-container">
          <button className="button" onClick={clearForm} style={{marginTop: '10px'}}>
            Clear
          </button>
        </div>
      </div>
    </div>
    </div>
    
    </body>
    
  );
}

export default App;  

