import React from 'react';
import TaskManager from './components/TaskMAnager';
import { Container } from 'reactstrap';

function App() {
  return (
    <Container className="py-5">
     <h2 className="text-center mb-4" style={{ color: "rgb(31, 93, 44)" }}>
  Task Management App
</h2>

      <TaskManager />
    </Container>
  );
}

export default App;
