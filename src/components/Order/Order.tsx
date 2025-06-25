import { useState } from "react";
import Card from "../Card";
import axios from "axios";
import useConfig from "../../useConfig";
import swish from "/assets/images/swish.png";

const Order = () => {
  const [orderSent, setOrderSent] = useState(false); // To show a loading state
  //const [validInput, setValidInput] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("pick-up");
  const basePrice = selectedDeliveryMethod === "send" ? 325 : 250;

  const [formData, setFormData] = useState<RequestData>({
  name: "",
  email: "",
  deliveryMethod: selectedDeliveryMethod,
  message: "",
  address: "",
  postalCode: "",
  city: "",
  phoneNumber: "",
  bookAmount: "1",
});

const totalPrice = basePrice * Number(formData.bookAmount);  // Multiply base price by book amount

  const [errors, setErrors] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  postalCode: "",
  city: "",
  });

  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;
  const apiUrl = config.apiUrl + "/api/v1/order/submit";

  interface RequestData {
    name: string;
    email: string;
    message: string;
    deliveryMethod: string;
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    bookAmount: string;
  }

  interface ResponseData {
    success: boolean;
    message: string;
  }

  const sendPostRequest = async (
    url: string,
    data: RequestData
  ): Promise<ResponseData> => {
    const response = await axios.post<ResponseData>(url, data);
    return response.data;
  };

  const validateFormBasic = (): boolean => {
  const newErrors = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    city: "",
  };

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

  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Mobilnummer är obligatoriskt.";
    isValid = false;
  } else if (!/^[\d\s\-\+]+$/.test(formData.phoneNumber)) {
    newErrors.phoneNumber = "Ogiltigt telefonnummer";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

  const validateFormSend = (): boolean => {
    validateFormBasic();
  const newErrors = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    city: "",
  };

  let isValid = true;

  if (!formData.address.trim()) {
    newErrors.address = "Adress är obligatoriskt.";
    isValid = false;
  }

  if (!formData.postalCode.trim()) {
    newErrors.postalCode = "Postkod är obligatoriskt.";
    isValid = false;
  }

  if (!formData.city.trim()) {
    newErrors.city = "Ort är obligatoriskt.";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

const handleBookAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)));  // Enforce min and max values
    setFormData({ ...formData, bookAmount: value.toString() });  // Store value as string
  };

  const handleOnClickSend = async () => {
  // If form contains invalid input, do not send the POST request.
    if (!validateFormBasic()) return;
    if (selectedDeliveryMethod === "send") {
      if (!validateFormSend()) return;
    }

  const requestData: RequestData = {
    ...formData,
    deliveryMethod: selectedDeliveryMethod,
  };

  console.log("Sending order:", requestData);

  try {
    const response = await sendPostRequest(apiUrl, requestData);
    setResponseMessage(response.message);
    setOrderSent(true);
  } catch (error) {
    console.error("Error sending POST request:", error);
    setResponseMessage("Något gick fel. Försök igen senare.");
  }
  console.log("Response: " + responseMessage);
};

  return (
    <div className="max-w-600 mx-auto">
      <Card title="Köp Oknöboken">
        <div className="">
          {!orderSent && (
            <div>
              <div className="max-w-2xl mx-auto px-4 mt-8">
                Boken finns att köpa på följande platser:
                <ul>
                  <li>Givells Attelje - Storgatan 23, Mönsterås</li>
                  <li>Mönsterås Turistbyrå - Storgatan 34, Mönsterås</li>
                  <li>Kaffetorpets Camping (kiosken) - Oknövägen 56, Mönsterås</li>
                </ul>
                <p>Du kan även beställa boken via denna hemsida. Följ då instruktionerna i Steg 1 och Steg 2 nedan</p>
                <p></p>
              </div>
              <div>
                <h2 className="regular-text-font text-center text-2xl font-bold mb-6">
                  Steg 1: Betala via swish
                </h2>

                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 px-4">
                  <div className="flex-1 space-y-4">
                    <div>
                      <p>1. Välj hur många böcker du vill köpa:</p>
                      <label
                          htmlFor="input-bookAmount"
                          className="block font-medium mb-1 mr-2"
                        >
                          Antal böcker:
                        </label>
                        <input
                          type="number"
                          id="input-bookAmount"
                          value={formData.bookAmount}
                          onChange={handleBookAmountChange}
                          className="w-20% border border-gray-300 rounded px-3 py-2"
                          min={1} // Min value
                          max={10} // Max value
                        />
                      </div>
                    <div>
                      <p>2. Välj om du vill ha boken skickad eller hämta själv på Lillövägen 36, Mönsterås:</p>
                    <label className="block font-medium mb-2">
                      Leveransalternativ: <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="delivery"
                          value="send"
                          checked={selectedDeliveryMethod === "send"}
                          onChange={(e) =>
                            setSelectedDeliveryMethod(e.target.value)
                          }
                        />
                        <span className="ml-1">Skicka</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="delivery"
                          value="pick-up"
                          checked={selectedDeliveryMethod === "pick-up"}
                          onChange={(e) =>
                            setSelectedDeliveryMethod(e.target.value)
                          }
                        />
                        <span className="ml-1">Hämta</span>
                      </label>
                    </div>
                    <p>Pris: <span className="font-bold"> {totalPrice} SEK </span></p>
                    <p>
                      3. Kontrollera beloppet ovan och swisha det till XXXXXXX (Markani AB)
                    </p>          
                    <ul>
                  <li>Mottagare nummer: 12324424</li>
                  <li>Belopp: {totalPrice} SEK</li>
                </ul>
                <div className="flex flex-col sm:flex-row items-start gap-4">
  <img
    src={swish}
    alt="QR-koden för swish"
    className="w-60 shrink-0 mb-4 sm:mb-0"
  />

  <div>
    <p>
      Om Swish är installerat på denna enhet kan du trycka här:
      <strong> Betala med Swish</strong>
    </p>
  </div>
</div>
                <p className="mt-2">4. När betalningen är gjord kan du fylla i kontaktuppgifter och eventuellt leveransuppgifter nedan i steg 2.</p>
                  </div>

                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto px-4 mt-8">
                <h2 className="regular-text-font text-xl font-semibold mb-6 text-center">
                  Steg 2: Ange kontaktuppgifter
                </h2>

                <form className="regular-text-font space-y-4">
                  <div>
                    <label
                      htmlFor="input-name"
                      className="block font-medium mb-1"
                    >
                      Namn: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="input-email"
                      className="block font-medium mb-1"
                    >
                      Email: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="input-phonenumber"
                      className="block font-medium mb-1"
                    >
                      Mobil: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-phonenumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                  </div>

                  {selectedDeliveryMethod === "send" && (
                    <>
                      <div>
                        <label
                          htmlFor="input-address"
                          className="block font-medium mb-1"
                        >
                          Leveransadress: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                      </div>

                      <div>
                        <label
                          htmlFor="input-postalcode"
                          className="block font-medium mb-1"
                        >
                          Postkod: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-postalcode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                      </div>

                      <div>
                        <label
                          htmlFor="input-city"
                          className="block font-medium mb-1"
                        >
                          Postort: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                      </div>
                    </>
                  )}

                  {selectedDeliveryMethod === "pick-up" && (
                    <p className="text-gray-700">
                      Boken kan hämtas på Lillövägen 36 när du har fått
                      bekräftelse via email. Du kan skriva i meddelande-rutan
                      nedan när du föredrar att hämta boken, så återkommer jag
                      snarast via mail.
                    </p>
                  )}

                  <div>
                    <label
                      htmlFor="input-message"
                      className="block font-medium mb-1"
                    >
                      Meddelande:
                    </label>
                    <textarea
                      id="input-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            </div>
          )}
          {orderSent && (
            <div className="regular-text-font flex flex-col items-center text-center space-y-4">
              <p>
                Tack för din beställning!
              </p>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setOrderSent(false)}
              >
                Gå tillbaka
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Order;
