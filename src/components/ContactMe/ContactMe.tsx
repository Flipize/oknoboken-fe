import React, { useState } from "react";
import axios from "axios";
import "../../properties";
import { properties } from "../../properties";

const ContactMe = () => {
  const [messageSent, setMessageSent] = useState(false); // To show a loading state
  const [validInput, setValidInput] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const apiUrl = properties.bakendurl + "/api/v1/message/submit";

  interface RequestData {
    name: string;
    address: string;
    message: string;
  }

  interface ResponseData {
    success: boolean;
    message: string;
    name: string;
    address: string;
  }

  const sendPostRequest = async (
    url: string,
    data: RequestData
  ): Promise<ResponseData> => {
    const response = await axios.post<ResponseData>(url, data);
    return response.data;
  };

  const handleOnClickSend = async () => {
    const requestData: RequestData = {
      name: "",
      address: "",
      message: "",
    };

    let inputNameElement = document.getElementById(
      "input-name"
    ) as HTMLInputElement;
    if (inputNameElement) {
      requestData.name = inputNameElement.value;
    }
    let inputEmailElement = document.getElementById(
      "input-email"
    ) as HTMLInputElement;
    if (inputEmailElement) {
      requestData.address = inputEmailElement.value;
    }
    let inputMessageElement = document.getElementById(
      "input-message"
    ) as HTMLInputElement;
    if (inputMessageElement) {
      requestData.message = inputMessageElement.value;
    }
    console.log(
      "Name: " +
        requestData.name +
        ", Email: " +
        requestData.address +
        ", Message: " +
        requestData.message
    );

    try {
      const response = await sendPostRequest(apiUrl, requestData);
      setMessage(response.message);
    } catch (error) {
      console.error("Error sending POST request:", error);
      setMessage("Failed to send data.");
    }

    setMessageSent(true);
  };

  return (
    <div>
      {!messageSent && (
        <div className="container">
          <h1>Kontakta mig</h1>
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="input-name">Namn</label>
                <input type="email" className="form-control" id="input-name" />
              </div>
              <div className="form-group">
                <label htmlFor="input-email">Email</label>
                <input type="email" className="form-control" id="input-email" />
              </div>
              <div className="form-group">
                <label htmlFor="input-message">Meddelande</label>
                <textarea
                  className="form-control"
                  id="input-message"
                  rows={4}
                ></textarea>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="btn btn-primary mb-3"
                  onClick={() => handleOnClickSend()}
                >
                  Skicka
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {messageSent && (
        <div className="container">
          <div>Tack för ditt meddelande!</div>
          <div>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => setMessageSent(false)}
            >
              Nytt meddelande
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMe;
