import React, { useState, useEffect } from "react";
import "./PlanetTheme.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [stars, setStars] = useState([]);
  const [planets, setPlanets] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (selectedFile && validImageTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WEBP).");
      e.target.value = ""; // Reset the input field
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("File uploaded successfully!");
        console.log(result);
      } else {
        alert("Failed to upload file.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      alert("An error occurred during upload.");
      console.error("Error:", error);
    }
  };

  // Generate stars and planets
  useEffect(() => {
    const starArray = [];
    const planetArray = [];

    // Create stars
    for (let i = 0; i < 150; i++) {
      starArray.push({
        id: i,
        top: Math.random() * 100 + "vh",
        left: Math.random() * 100 + "vw",
      });
    }

    // Create small planets
    for (let i = 0; i < 10; i++) {
      planetArray.push({
        id: i,
        top: Math.random() * 100 + "vh",
        left: Math.random() * 100 + "vw",
        size: Math.random() * 40 + 10 + "px", // Random size between 10px and 50px
        color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random planet color
      });
    }

    setStars(starArray);
    setPlanets(planetArray);
  }, []);

  return (
    <div className="planet-theme-wrapper">
      {/* Starry Background */}
      <div className="starry-background">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDuration: Math.random() * 2 + 1 + "s",
            }}
          ></div>
        ))}

        {planets.map((planet) => (
          <div
            key={planet.id}
            className="planet"
            style={{
              top: planet.top,
              left: planet.left,
              width: planet.size,
              height: planet.size,
              background: planet.color,
              animationDuration: Math.random() * 8 + 3 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* Content Container */}
      <div className="planet-theme-container">
        <h2 className="planet-title">Upload Your File to the Cosmos</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="planet-input"
        />
        <button onClick={handleSubmit} className="planet-button">
          Launch File
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
