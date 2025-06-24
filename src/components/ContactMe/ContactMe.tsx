import axios from "axios";
import { useState } from "react";
import useConfig from "../../useConfig";
import Card from "../Card";

const ContactMe = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [responseContent, setResponseContent] = useState<string | null>(null);

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

    const inputName = document.getElementById("input-name") as HTMLInputElement;
    const inputEmail = document.getElementById(
      "input-email"
    ) as HTMLInputElement;
    const inputContent = document.getElementById(
      "input-content"
    ) as HTMLTextAreaElement;

    if (inputName) requestData.name = inputName.value;
    if (inputEmail) requestData.email = inputEmail.value;
    if (inputContent) requestData.content = inputContent.value;

    try {
      const response = await sendPostRequest(apiUrl, requestData);
      setResponseContent(response.content);
    } catch (error) {
      console.error("Error sending POST request:", error);
      setResponseContent("Kunde inte skicka meddelandet.");
    }

    console.log("Response: " + responseContent);

    setMessageSent(true);
  };

  return (
    <div className="max-w-600 mx-auto">
      <Card title="Kontakta mig">
        <div>
          {!messageSent ? (
            <div className="max-w-2xl mx-auto px-4">
              <form className="regular-text-font space-y-4">
                <div>
                  <label
                    htmlFor="input-name"
                    className="block font-medium mb-1"
                  >
                    Namn:
                  </label>
                  <input
                    type="text"
                    id="input-name"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-email"
                    className="block font-medium mb-1"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="input-email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-content"
                    className="block font-medium mb-1"
                  >
                    Meddelande:
                  </label>
                  <textarea
                    id="input-content"
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleOnClickSend}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Skicka
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="regular-text-font container text-center space-y-4">
              <p>Tack för ditt meddelande!</p>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setMessageSent(false)}
              >
                Nytt meddelande
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ContactMe;
