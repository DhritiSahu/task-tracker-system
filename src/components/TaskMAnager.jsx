import React, { useState } from "react";
import {
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Container,
} from "reactstrap";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: input } : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: input,
        done: false,
      };
      setTasks([...tasks, newTask]);
    }

    setInput("");
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    setInput(task.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <Container className="p-4 border rounded shadow-sm bg-light">
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Row className="gx-2">
            <Col md={9} sm={8}>
              <Input
                type="text"
                placeholder="Enter a task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Col>
            <Col md={3} sm={4}>
              <Button
                className={`w-100 ${editId ? "btn-warning" : "btn-success"}`}
                onClick={handleAddOrUpdate}
              >
                {editId ? "Update" : "Add"}
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      <h5 className="text-danger mt-4">
        Pending Tasks: {tasks.filter((task) => !task.done).length}
      </h5>

      <ListGroup className="mt-4">
        {tasks
          .filter((task) => !task.done)
          .map((task) => (
            <ListGroupItem
              key={task.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <Input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  className="me-2"
                />
                <div className="flex-grow-1 text-start">{task.text}</div>
              </div>
              <div className="ms-2 d-flex gap-2">
                <Button
                  color="info"
                  size="sm"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit✏️
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>

      {/* Completed Tasks Section */}
      {tasks.some((task) => task.done) && (
        <div className="mt-4 p-3 border rounded bg-success bg-opacity-10">
          <h5 className="text-success mb-3">Completed Tasks</h5>
          <ListGroup>
            {tasks
              .filter((task) => task.done)
              .map((task) => (
                <ListGroupItem
                  key={task.id}
                  className="d-flex justify-content-between align-items-center list-group-item-success text-decoration-line-through"
                >
                  {task.text}
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </ListGroupItem>
              ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
};

export default TaskManager;
