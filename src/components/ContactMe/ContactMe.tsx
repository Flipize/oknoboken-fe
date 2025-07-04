import axios from "axios";
import { useState } from "react";
import useConfig from "../../useConfig";
import Card from "../Card";
import Paragraph from "../Paragraph";

interface RequestData {
  name: string;
  email: string;
  content: string;
}
interface ResponseData {
  success: boolean;
  message: string;
}

const ContactMe = () => {
  /* ---- ALL HOOKS RUN ON EVERY RENDER ---- */
  const [messageSent, setMessageSent] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<RequestData>({
    name: "",
    email: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    content: "",
  });
  const config = useConfig(); // <- still a hook call
  const apiUrl = config?.apiUrl ? `${config.apiUrl}/api/v1/message/submit` : ""; // apiUrl may be empty until config arrives
  /* --------------------------------------- */

  const sendPostRequest = async (
    url: string,
    data: RequestData
  ): Promise<ResponseData> => {
    const response = await axios.post<ResponseData>(url, data);
    return response.data;
  };

  const validateForm = (): boolean => {
    const newErrors = { name: "", email: "", content: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Namn är obligatoriskt.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email är obligatoriskt.";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Ogiltig email-adress.";
      isValid = false;
    }
    if (!formData.content.trim()) {
      newErrors.content = "Meddelande är obligatoriskt.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnClickSend = async () => {
    if (!config) return; // Config not ready yet
    if (!validateForm()) return;

    try {
      const response = await sendPostRequest(apiUrl, formData);
      setResponseMessage(response.message);
      setMessageSent(true);
    } catch (err) {
      console.error("POST-fel:", err);
      setResponseMessage("Något gick fel. Försök igen senare.");
    }
    console.log("Response: " + responseMessage);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("input-", "")]: value,
    }));
  };

  /* ---------- RENDER ---------- */
  if (!config) {
    return (
      <div className="max-w-600 mx-auto">
        <Card title="Kontakta mig">
          <p>Laddar…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-600 mx-auto">
      <Card title="Kontakta mig">
        {!messageSent ? (
          <div className="max-w-2xl mx-auto px-4">
            <Paragraph>
              Har du frågor eller synpunkter får du gärna kontakta mig via
              formuläret nedan.
            </Paragraph>
            <form
              className="regular-text-font space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Namn */}
              <div>
                <label
                  htmlFor="input-name"
                  className="regular-text-font block font-medium mb-1"
                >
                  Namn: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="input-name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="input-email"
                  className="regular-text-font block font-medium mb-1"
                >
                  Email: <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="input-email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Meddelande */}
              <div>
                <label
                  htmlFor="input-content"
                  className="regular-text-font block font-medium mb-1"
                >
                  Meddelande: <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="input-content"
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.content}
                  onChange={handleChange}
                />
                {errors.content && (
                  <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                )}
              </div>

              {/* Skicka-knapp */}
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
            <Paragraph>Tack för ditt meddelande!</Paragraph>
            <Paragraph>Jag återkommer snarast via email.</Paragraph>
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                setFormData({ name: "", email: "", content: "" });
                setErrors({ name: "", email: "", content: "" });
                setResponseMessage(null);
                setMessageSent(false);
              }}
            >
              Gå tillbaka
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ContactMe;
