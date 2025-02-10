import axios from "axios";
import { useState } from "react";
import useConfig from "../../useConfig";

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
      requestData.email = inputEmailElement.value;
    }
    let inputcontentElement = document.getElementById(
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
                <label htmlFor="input-content">Meddelande</label>
                <textarea
                  className="form-control"
                  id="input-content"
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
