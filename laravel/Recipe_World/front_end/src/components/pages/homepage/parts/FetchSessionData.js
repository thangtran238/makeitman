import axios from 'axios';

async function fetchSessionData() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/obtainers/login');
    const obtainerId = response.data.obtainer_id;
    alert(obtainerId);
  } catch (error) {
    alert('Error:', error);
  }
}

fetchSessionData();
