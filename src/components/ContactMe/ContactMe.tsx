import axios from "axios";
import { useState } from "react";
import useConfig from "../../useConfig";
import Subscribe from "../Subscribe/Subscribe";
import "./ContactMe.css";
import Card from "../Card";

const ContactMe = () => {
  const [messageSent, setMessageSent] = useState(false); // To show a loading state
  //const [validInput, setValidInput] = useState(false);
  const [content, setcontent] = useState<string | null>(null);

  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;
  const apiUrl = config.apiUrl + "/api/v1/message/submit";

  interface RequestData {
    name: string;
    email: string;
    content: string;
  }

  interface ResponseData {
    success: boolean;
    content: string;
    name: string;
    email: string;
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
      email: "",
      content: "",
    };

    const inputNameElement = document.getElementById(
      "input-name"
    ) as HTMLInputElement;
    if (inputNameElement) {
      requestData.name = inputNameElement.value;
    }
    const inputEmailElement = document.getElementById(
      "input-email"
    ) as HTMLInputElement;
    if (inputEmailElement) {
      requestData.email = inputEmailElement.value;
    }
    const inputcontentElement = document.getElementById(
      "input-content"
    ) as HTMLInputElement;
    if (inputcontentElement) {
      requestData.content = inputcontentElement.value;
    }
    console.log(
      "Name: " +
        requestData.name +
        ", Email: " +
        requestData.email +
        ", content: " +
        requestData.content
    );

    try {
      const response = await sendPostRequest(apiUrl, requestData);
      setcontent(response.content);
    } catch (error) {
      console.error("Error sending POST request:", error);
      setcontent("Failed to send data.");
    }
    content && console.log(content);
    setMessageSent(true);
  };

  return (
    <div className="h-screen">
      <Card title="Kontakta mig">
        <div className="container">
          {!messageSent && (
            <div>
              <div className="form-message-container">
                <form>
                  <div className="form-group input-container">
                    <label htmlFor="input-name">Namn:</label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        className="form-control"
                        id="input-name"
                      />
                    </div>
                  </div>
                  <div className="form-group input-container">
                    <label htmlFor="input-email">Email:</label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        className="form-control"
                        id="input-email"
                      />
                    </div>
                  </div>
                  <div className="form-group input-container">
                    <label htmlFor="input-content">Meddelande:</label>
                    <div className="input-wrapper">
                      <textarea
                        className="form-control"
                        id="input-content"
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                  <div className="submit-wrapper">
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
          <div>
            <Subscribe />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactMe;
