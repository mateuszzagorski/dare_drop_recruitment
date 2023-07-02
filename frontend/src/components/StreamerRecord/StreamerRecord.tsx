import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./StreamerRecord.module.css";

interface Streamer {
  name: string;
  platform: string;
  description: string;
  upvotes: number;
  downvotes: number;
}

interface VoteData {
  upvotes: number;
  downvotes: number;
}

const StreamerRecord = () => {
  const { streamerId } = useParams<{ streamerId: string }>();
  const [streamer, setStreamer] = useState<Streamer | null>(null);
  const [voteData, setVoteData] = useState<VoteData>({
    upvotes: 0,
    downvotes: 0,
  });

  useEffect(() => {
    fetchStreamer();
  }, []);

  const fetchStreamer = async () => {
    try {
      const response = await axios.get<{ existingStreamer: Streamer }>(
        `http://localhost:3000/streamers/${streamerId}`
      );
      setStreamer(response.data.existingStreamer);
      setVoteData({
        upvotes: response.data.existingStreamer.upvotes,
        downvotes: response.data.existingStreamer.downvotes,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    try {
      const updatedVoteData: VoteData = { ...voteData };
      if (type === "upvote") {
        updatedVoteData.upvotes += 1;
      } else if (type === "downvote") {
        updatedVoteData.downvotes += 1;
      }

      const response = await axios.put<{ existingStreamer: Streamer }>(
        `http://localhost:3000/streamers/${streamerId}/vote`,
        {
          upvotes: updatedVoteData.upvotes,
          downvotes: updatedVoteData.downvotes,
        }
      );

      setVoteData({
        upvotes: response.data.existingStreamer.upvotes,
        downvotes: response.data.existingStreamer.downvotes,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!streamer) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.streamer}>
      <h2 className={styles.streamerTitle}>
        Streamer `{streamer.name}` Record
      </h2>
      <p className={styles.streamerName}>
        <span className={styles.streamerLabel}>Name:</span> {streamer.name}
      </p>
      <p className={styles.streamerDescription}>
        <span className={styles.streamerLabel}>Description:</span>{" "}
        {streamer.description}
      </p>
      <p className={styles.streamerPlatform}>
        <span className={styles.streamerLabel}>Platform:</span>{" "}
        {streamer.platform}
      </p>
      <div>
        <button
          className={styles.streamerVoteButton}
          onClick={() => handleVote("upvote")}
        >
          Upvote
        </button>
        <button
          className={styles.streamerVoteButton}
          onClick={() => handleVote("downvote")}
        >
          Downvote
        </button>
      </div>
      <img
        className={styles.streamerAvatar}
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
        alt="Streamer Avatar"
      />
    </div>
  );
};

export default StreamerRecord;
