import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import styles from "./StreamerList.module.css";

interface Streamer {
  _id: string;
  name: string;
  upvotes: number;
  downvotes: number;
}

const socket: Socket = io("http://localhost:3000/streamers");

const StreamerList = ({ formSubmitted }) => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);

  useEffect(() => {
    fetchStreamers();
    subscribeToUpdates();
  }, [formSubmitted]);

  const fetchStreamers = async () => {
    try {
      const response = await axios.get<{ streamerData: Streamer[] }>(
        "http://localhost:3000/streamers"
      );
      setStreamers(response.data.streamerData);
    } catch (error) {
      console.error(error);
    }
  };

  const subscribeToUpdates = () => {
    console.log("Subscribing to updates");
    socket.on("connect", () => {
      console.log("WebSocket connection established");
    });
    socket.on("streamerUpdated", (updatedStreamer) => {
      console.log("Received streamerUpdated event:", updatedStreamer);
      setStreamers((prevStreamers: Streamer[]) =>
        prevStreamers.map((streamer) =>
          streamer._id === updatedStreamer.id ? updatedStreamer : streamer
        )
      );
    });
    socket.on("disconnect", () => {
      console.log("WebSocket connection closed");
    });
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });
  };

  console.log(streamers);
  return (
    <div className={styles.streamerList}>
      <h2 className={styles.streamerListTitle}>Streamer List</h2>
      <table className={styles.streamerListTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name (click to see more details)</th>
            <th>Upvotes</th>
            <th>Downvotes</th>
          </tr>
        </thead>
        <tbody>
          {streamers.map((streamer, index) => (
            <tr key={streamer._id} className={styles.streamerListItem}>
              <td>{index + 1}</td>
              <td>
                <Link
                  to={`/streamer/${streamer._id}`}
                  className={styles.streamerListLink}
                >
                  {streamer.name}
                </Link>
              </td>
              <td>{streamer.upvotes}</td>
              <td>{streamer.downvotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreamerList;
