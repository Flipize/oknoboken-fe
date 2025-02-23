import { useState } from "react";
import useConfig from "../../useConfig";
import axios from "axios";
import "./Subscribe.css";

const Subscribe = () => {
  const [message, setMessage] = useState<string | null>(null);

  interface RequestData {
    email: string;
  }

  interface ResponseData {
    success: boolean;
    email: string;
    message: string;
  }

  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;
  const apiUrl = config.apiUrl + "/api/v1/subscription/add";

  const sendPostRequest = async (
    url: string,
    data: RequestData
  ): Promise<ResponseData> => {
    const response = await axios.post<ResponseData>(url, data);
    return response.data;
  };

  const handleOnClickSend = async () => {
    const requestData: RequestData = {
      email: "",
    };
    let inputEmailElement = document.getElementById(
      "input-subscription-email"
    ) as HTMLInputElement;
    if (inputEmailElement) {
      requestData.email = inputEmailElement.value;
    }

    console.log(requestData.email);

    try {
      const response = await sendPostRequest(apiUrl, requestData);
      setMessage(response.message);
    } catch (error) {
      console.error("Error sending POST request:", error);
      setMessage("Failed to send data.");
    }
    message && console.log(message);
  };

  return (
    <div className="form-subscription-container">
      <form>
        <p>
          Om du vill få en uppdatering när det kommer en nyhet angående boken, så kan du ange
          din email-adress nedan och klicka på "Prenumerera".
        </p>
        <div className="input-container">
          <label htmlFor="input-subscription-email">Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              className="form-control"
              id="input-subscription-email"
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleOnClickSend();
              }}
            >
              Prenumerera
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
