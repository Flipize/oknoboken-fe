import { useState } from "react";
import Card from "../Card";
import axios from "axios";
import useConfig from "../../useConfig";
import swish from "/assets/images/swish.png";
import Paragraph from "../Paragraph";
import { Copy } from "lucide-react";

const Order = () => {
  const [orderSent, setOrderSent] = useState(false); // To show a loading state
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("pick-up");
  const basePrice = selectedDeliveryMethod === "send" ? 335 : 250;

  /* constants so it’s easy to tweak later */
  const MIN_BOOKS = 1;
  const MAX_BOOKS = 10;

  /* handlers */
  const handleIncrement = () =>
    setFormData((prev) => {
      const next = Math.min(Number(prev.bookAmount) + 1, MAX_BOOKS);
      return { ...prev, bookAmount: String(next) };
    });

  const handleDecrement = () =>
    setFormData((prev) => {
      const next = Math.max(Number(prev.bookAmount) - 1, MIN_BOOKS);
      return { ...prev, bookAmount: String(next) };
    });

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
    totalPrice: "",
  });

  const totalPrice = basePrice * Number(formData.bookAmount); // Multiply base price by book amount
  const swishNumber = "1233391273";
  const inputClasses =
    "w-full border border-[#cfc7b8] rounded-lg px-3 py-2 focus:border-[#1f4f7a] focus:outline-none focus:ring-2 focus:ring-[#1f4f7a]/20";
  const primaryButtonClasses =
    "action-button bg-[#1f4f7a] text-white px-6 py-2 hover:bg-[#173d5f] transition shadow-sm";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(swishNumber);
    alert("Swish-numret har kopierats!");
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    city: "",
  });

  const config = useConfig();
  if (!config) return <p>Laddar...</p>;
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
    totalPrice: string;
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
      newErrors.email = "Ogiltig email-adress";
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

  const handleOnClickSend = async () => {
    // If form contains invalid input, do not send the POST request.
    if (!validateFormBasic()) return;
    if (selectedDeliveryMethod === "send") {
      if (!validateFormSend()) return;
    }

    const requestData: RequestData = {
      ...formData,
      deliveryMethod: selectedDeliveryMethod,
      totalPrice: String(totalPrice),
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
    <div className="mx-auto">
      <Card title="Köp Oknöboken">
        <div>
          {!orderSent && (
            <div>
              <div className="max-w-3xl mx-auto">
                <Paragraph>
                  Du kan köpa boken på följande platser i Mönsterås:
                  <ul className="mt-1 md:list-disc list-inside">
                    <li>Erikas Galleri & Ateljé – Storgatan 25</li>
                    <li>Mönsterås Turistbyrå – Sjögatan 29 <span className="text-sm text-gray-500">(säsongsstängt)</span>
                    </li>
                    <li>Kaffetorpets Camping (receptionen) – Oknövägen 86 <span className="text-sm text-gray-500">(säsongsstängt)</span></li>
                  </ul>
                  Det går också bra att beställa boken här på hemsidan. Priset
                  för boken är 250 kr + eventuell frakt (85 kr). Följ
                  instruktionerna i <strong>Steg 1</strong> och{" "}
                  <strong>Steg 2</strong> nedan.
                </Paragraph>
              </div>

              {/* Step 1: Betala via Swish */}
              <div className="mt-8">
                <h2 className="regular-text-font text-center text-2xl text-[#25301f] mb-5">
                  Steg 1: Betala via swish
                </h2>

                <div className="max-w-3xl mx-auto rounded-lg border border-[#e6dfd2] bg-[#fbfaf6] p-4 sm:p-6">
                  {/* Step A: Book amount */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#25301f]">
                      A. Välj antal böcker
                    </h4>
                    <label className="regular-text-font text-base sm:text-lg block mr-4">
                      Antal böcker:
                    </label>

                    {/* stepper */}
                    <div className="inline-flex items-center gap-2">
                      {/* – button */}
                      <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={Number(formData.bookAmount) <= MIN_BOOKS}
                        className="stepper-button regular-text-font h-9 w-9 flex items-center justify-center bg-[#e6dfd2] text-lg font-semibold hover:bg-[#d8cfbd] disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Minska antal böcker"
                      >
                        –
                      </button>

                      {/* value display (read-only input so the form still submits a value) */}
                      <input
                        readOnly
                        value={formData.bookAmount} // now a string
                        className="w-14 text-center border border-[#cfc7b8] rounded-lg h-10 bg-white"
                      />

                      {/* + button */}
                      <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={Number(formData.bookAmount) >= MAX_BOOKS}
                        className="stepper-button h-9 w-9 flex items-center justify-center bg-[#e6dfd2] text-lg font-semibold hover:bg-[#d8cfbd] disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Öka antal böcker"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Step B: Delivery option */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#25301f]">
                      B. Välj leveransalternativ
                    </h4>
                    <Paragraph>
                      Välj om du vill få boken skickad via PostNord eller hämta den på
                      Lillövägen 36, Mönsterås:
                    </Paragraph>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <label
                        className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                          selectedDeliveryMethod === "send"
                            ? "border-[#a1c563] bg-[#eef8dc]"
                            : "border-[#e0d8ca] bg-white hover:border-[#bfd98a]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value="send"
                          checked={selectedDeliveryMethod === "send"}
                          onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                          className="accent-[#a1c563]"
                        />
                        <span className="regular-text-font ml-2">
                          Skicka med PostNord
                        </span>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                          selectedDeliveryMethod === "pick-up"
                            ? "border-[#a1c563] bg-[#eef8dc]"
                            : "border-[#e0d8ca] bg-white hover:border-[#bfd98a]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value="pick-up"
                          checked={selectedDeliveryMethod === "pick-up"}
                          onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                          className="accent-[#a1c563]"
                        />
                        <span className="regular-text-font ml-2">Hämta</span>
                      </label>

                      {/* <label className="flex items-center gap-2">
    <input
      type="radio"
      name="delivery"
      value="local-delivery"
      checked={selectedDeliveryMethod === "local-delivery"}
      onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
    />
    <span className="regular-text-font ml-1">Fri leverans inom Mönsterås Kommun</span>
  </label> */}
                    </div>

                    {selectedDeliveryMethod === "send" && (
                      <p className="italic-text-font text-base sm:text-lg mt-1">
                        Fraktkostnaden är 85 SEK per bok som är inkluderat i
                        priset nedan. Boken skickas så snabbt som möjligt efter
                        att beställningen har gjorts.
                      </p>
                    )}
                    {selectedDeliveryMethod === "pick-up" && (
                      <p className="italic-text-font text-base sm:text-lg mt-1">
                        Boken kan hämtas på Lillövägen 36 när du har fått
                        bekräftelse via email. Du kan skriva i meddelanderutan
                        nedan i Steg 2, när du föredrar att hämta boken, så
                        återkommer jag snarast via mail.
                      </p>
                    )}
                    {selectedDeliveryMethod === "local-delivery" && (
                      <p className="italic-text-font text-base sm:text-lg mt-1">
                        Ange vilken adress du vill ha boken levererad till i meddelanderutan i formuläret nedan.
                      </p>
                    )}
                  </div>

                  {/* Step C: Payment */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#25301f]">C. Betalning</h4>
                    <div className="mb-4 rounded-lg bg-white border border-[#e0d8ca] px-4 py-3">
                      <p className="regular-text-font m-0 text-base sm:text-lg">
                        Totalt att betala:{" "}
                        <span className="font-bold text-[#25301f]">
                          {totalPrice} SEK
                        </span>
                      </p>
                    </div>
                    <Paragraph>
                      Swisha beloppet till <strong>Markani AB</strong>:
                      <ul className="list-disc list-inside">
                        <li>
                          Mottagare nummer: <strong>{swishNumber}</strong>{" "}
                          <button
                            onClick={copyToClipboard}
                            className="inline-flex align-middle text-[#1f4f7a] ml-1 hover:text-[#173d5f] transition"
                            aria-label="Kopiera Swish-nummer"
                            title="kopiera"
                          >
                            <Copy size={16} />
                          </button>
                        </li>
                        <li>
                          Belopp: <strong>{totalPrice} SEK</strong>
                        </li>
                      </ul>
                    </Paragraph>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:text-left">
                      <img
                        src={swish}
                        alt="QR-koden för Swish"
                        className="w-60 shrink-0 mb-4 shadow"
                      />
                    </div>

                    <Paragraph>
                      När betalningen är genomförd går du vidare med att fylla i
                      dina kontakt- och leveransuppgifter.
                    </Paragraph>
                  </div>
                </div>
              </div>

              {/* Step 2: Ange kontaktuppgifter */}
              <div className="mt-8">
                <h2 className="regular-text-font text-center text-2xl text-[#25301f] mb-5">
                  Steg 2: Ange kontaktuppgifter
                </h2>

                <div className="max-w-3xl mx-auto rounded-lg border border-[#e6dfd2] bg-[#fbfaf6] p-4 sm:p-6">
                  <form className="regular-text-font">
                    <div className="mb-4">
                      <label htmlFor="input-name">
                        Namn: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="input-name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={inputClasses}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="input-email">
                        Email: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="input-email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={inputClasses}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="input-phonenumber">
                        Mobil: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="input-phonenumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className={inputClasses}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {selectedDeliveryMethod === "send" && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="input-address">
                            Leveransadress:{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="input-address"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                            className={inputClasses}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="input-postalcode">
                            Postkod: <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="input-postalcode"
                            value={formData.postalCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                postalCode: e.target.value,
                              })
                            }
                            className={inputClasses}
                          />
                          {errors.postalCode && (
                            <p className="text-red-500 text-sm">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="input-city">
                            Postort: <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="input-city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                            className={inputClasses}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm">
                              {errors.city}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div className="mb-4">
                      <label htmlFor="input-message">Meddelande:</label>
                      <textarea
                        id="input-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={inputClasses}
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleOnClickSend}
                        className={primaryButtonClasses}
                      >
                        Skicka
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {orderSent && (
            <div className="regular-text-font flex flex-col items-center text-center space-y-4">
              <Paragraph>Tack för din beställning!</Paragraph>
              <Paragraph>Jag återkommer med bekräftelse via email</Paragraph>
              <button
                type="button"
                className={primaryButtonClasses}
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
