
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/students');
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !age) {
      setError('Please enter both name and age');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: Number(age) }),
      });
      if (!res.ok) throw new Error('Failed to create student');
      setName('');
      setAge('');
      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Student Management</h1>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Create Student</button>
      </form>
      {error && <p className="error">{error}</p>}
      <h2>Students List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} (Age: {student.age})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
