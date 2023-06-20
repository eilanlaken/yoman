const { useState } = require("react");

const DevcardForm = ({ getAllDevelopers }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setHandle("");
    setEmail("");
    setTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const developer = { firstName, lastName, handle, email, title };
    const response = await fetch("http://localhost:4000/developers", {
      method: "POST",
      body: JSON.stringify(developer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      resetFields();
      getAllDevelopers();
      setError(null);
      console.log("Developer created");
    }
  };

  return (
    <form className="create-devcard" onSubmit={handleSubmit}>
      <h3>Add a new Devcard</h3>

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label>Handle: @</label>
      <input
        type="text"
        onChange={(e) => setHandle(e.target.value)}
        value={handle}
      />
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <button>Add Developer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DevcardForm;
