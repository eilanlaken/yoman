import { useEffect, useState } from "react";
import DevcardThumbnail from "../components/DevcardThumbnail";
import DevcardForm from "../components/DevcardForm";

const Home = () => {
  const [developers, setDevelopers] = useState(null);

  const getAllDevelopers = async () => {
    const response = await fetch("http://localhost:4000/developers");
    const json = await response.json();
    if (response.ok) {
      setDevelopers(json.msg);
      console.log(json.msg.length);
    }
  };

  useEffect(() => {
    getAllDevelopers();
  }, []);

  return (
    <div className="home">
      <DevcardForm getAllDevelopers={getAllDevelopers} />
      {developers &&
        developers.map((developer, index) => (
          <DevcardThumbnail
            key={index}
            firstName={developer.firstName}
            lastName={developer.lastName}
            title={developer.title}
            handle={developer.handle}
            img={developer.img}
          />
        ))}
    </div>
  );
};

export default Home;
