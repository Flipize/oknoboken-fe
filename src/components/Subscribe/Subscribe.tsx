import { useState } from "react";
import useConfig from "../../useConfig";
import axios from "axios";
import "./Subscribe.css";

const Subscribe = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [subscribtionSuccessful, setSubscribtionSuccessful] = useState(false);
  const [subscribtionFailed, setSubscriptionFailed] = useState(false);

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
      setSubscribtionSuccessful(true);
      setMessage(response.message);
    } catch (error) {
      console.error("Error sending POST request:", error);
      setSubscriptionFailed(true);
      setMessage("Failed to send data.");
    }
    message && console.log(message);
  };

  return (
    <div>
      <div className="form-subscription-container">
        <form>
          <h3>
            Prenumerera på nyhetsbrevet
          </h3>
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
                disabled={subscribtionSuccessful}
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
      {subscribtionSuccessful && (
        <div>
          <p>Prenumeration lyckades</p>
        </div>
      )}
      {subscribtionFailed && (
        <div>
          <p>Prenumeration misslyckades. Försök igen senare.</p>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
