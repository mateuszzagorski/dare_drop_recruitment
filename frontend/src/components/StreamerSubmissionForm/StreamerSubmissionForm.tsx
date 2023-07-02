import { useState, FormEvent } from "react";
import axios from "axios";
import styles from "./StreamerSubmissionForm.module.css";

interface StreamerSubmission {
  name: string;
  platform: string;
  description: string;
}

const StreamerSubmissionForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !platform || !description) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z0-9]{6,20}$/;
    if (!name.match(nameRegex)) {
      setErrorMessage(
        "Name should contain only letters and numbers, and be between 6 and 20 characters."
      );
      return;
    }

    const formData: StreamerSubmission = {
      name,
      platform,
      description,
    };

    try {
      const response = await axios.post("http://localhost:3000/streamers", {
        ...formData,
        upvotes: 0,
        downvotes: 0,
      });
      console.log(response.data);
      onSubmit();
      // Clear form fields after successful submission
      setName("");
      setPlatform("");
      setDescription("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  return (
    <div className={styles.streamerForm}>
      <h2 className={styles.streamerFormTitle}>Streamer Submission Form</h2>
      {errorMessage && (
        <div className={styles.streamerFormError}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.streamerFormLabel}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.streamerFormInput}
        />
        <label htmlFor="platform" className={styles.streamerFormLabel}>
          Platform:
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className={styles.streamerFormSelect}
        >
          <option value="" disabled defaultValue="selected">
            Select Platform
          </option>
          <option value="Twitch">Twitch</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="Kick">Kick</option>
          <option value="Rumble">Rumble</option>
        </select>
        <label htmlFor="description" className={styles.streamerFormLabel}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.streamerFormTextarea}
        />
        <button type="submit" className={styles.streamerFormButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StreamerSubmissionForm;
