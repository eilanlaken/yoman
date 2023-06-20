import { useEffect, useState } from "react";
import DevcardThumbnail from "../components/DevcardThumbnail";
import DevcardForm from "../components/DevcardForm";

const Home = () => {
  const [users, setUsers] = useState(null);

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const json = await response.json();
    if (response.ok) {
      setUsers(json.msg);
      console.log(json.msg.length);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="home">
      <DevcardForm getAllUsers={getAllUsers} />
      {users &&
        users.map((user, index) => (
          <DevcardThumbnail
            key={index}
            firstName={user.firstName}
            lastName={user.lastName}
            title={user.title}
            handle={user.handle}
            img={user.img}
          />
        ))}
    </div>
  );
};

export default Home;
