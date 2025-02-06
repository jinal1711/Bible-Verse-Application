import { useState } from "react";
import "./App.css";

function App() {
  const [verse, setVerse] = useState("");
  const [specificVerse, setSpecificVerse] = useState("");
  const [specificVerseText, setSpecificVerseText] = useState("");

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Function to fetch a random verse
  const fetchRandomVerse = async () => {
    try {
      const response = await fetch("https://labs.bible.org/api/?passage=random&type=text");
      const text = await response.text();
      setVerse(stripHtmlTags(text)); 
    } catch (error) {
      console.error("Error fetching random verse:", error);
    }
  };

  // Function to fetch a specific verse
  const fetchSpecificVerse = async () => {
    if (!specificVerse) return;
    try {
      const response = await fetch(`https://labs.bible.org/api/?passage=${specificVerse}&type=text`);
      const text = await response.text();
      setSpecificVerseText(stripHtmlTags(text));
    } catch (error) {
      console.error("Error fetching specific verse:", error);
    }
  };

  return (
    <div className="container">
      <h1>Bible Verse Finder Application</h1>
      
      <button onClick={fetchRandomVerse}>Click to find Random Verse from Bible</button>
      {verse && <p> <strong>Random Verse:</strong> <br/> 
                  {verse}
                </p>}

      <div className="specific-verse">
        <input
          type="text"
          placeholder="Enter specific verse (e.g., John 3:16)"
          value={specificVerse}
          onChange={(e) => setSpecificVerse(e.target.value)}
        />
        <button onClick={fetchSpecificVerse}>Get Specific Verse</button>
      </div>

      {specificVerseText && <p><strong>Specific Verse:</strong> <br/> 
                              {specificVerseText}
                            </p>}
    </div>
  );
}

export default App;
