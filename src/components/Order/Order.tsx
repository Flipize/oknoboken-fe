import React, { useState } from "react";
import Card from "../Card";
import axios from "axios";
import useConfig from "../../useConfig";
import swish from "../../assets/swish.png";

const Order = () => {
  const [orderSent, setOrderSent] = useState(false); // To show a loading state
  //const [validInput, setValidInput] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("no-send");

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

  const handleOnClickSend = async () => {
    const requestData: RequestData = {
      name: "",
      email: "",
      deliveryMethod: selectedDeliveryMethod,
      message: "",
      address: "",
      postalCode: "",
      city: "",
      phoneNumber: "",
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
    const inputMessageElement = document.getElementById(
      "input-message"
    ) as HTMLInputElement;
    if (inputMessageElement) {
      requestData.message = inputMessageElement.value;
    }
    const inputAddressElement = document.getElementById(
      "input-address"
    ) as HTMLInputElement;
    if (inputAddressElement) {
      requestData.address = inputAddressElement.value;
    }
    const inputPostalCodeElement = document.getElementById(
      "input-postalcode"
    ) as HTMLInputElement;
    if (inputPostalCodeElement) {
      requestData.postalCode = inputPostalCodeElement.value;
    }
    const inputCityElement = document.getElementById(
      "input-city"
    ) as HTMLInputElement;
    if (inputCityElement) {
      requestData.city = inputCityElement.value;
    }
    const inputPhoneNumberElement = document.getElementById(
      "input-phonenumber"
    ) as HTMLInputElement;
    if (inputPhoneNumberElement) {
      requestData.phoneNumber = inputPhoneNumberElement.value;
    }
    console.log(
      "Name: " +
        requestData.name +
        ", Email: " +
        requestData.email +
        ", Delivery: " +
        requestData.deliveryMethod +
        ", Message: " +
        requestData.message +
        ", Address: " +
        requestData.address +
        ", Postal Code: " +
        requestData.postalCode +
        ", Phone Number: " +
        requestData.phoneNumber
    );

    try {
      const response = await sendPostRequest(apiUrl, requestData);
      setResponseMessage(response.message);
    } catch (error) {
      console.error("Error sending POST request:", error);
      console.log(responseMessage);
    }
    responseMessage && console.log(responseMessage);
    setOrderSent(true);
  };

  return (
    <div className="max-w-600 mx-auto">
      <Card title="Köp Oknöboken">
        <div className="">
          {!orderSent && (
            <div>
              <div>
                <h2 className="regular-text-font text-center text-2xl font-bold mb-6">
                  Steg 1: Betala via swish
                </h2>

                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 px-4">
                  <div className="flex-1 space-y-4">
                    <p>
                      Betalningen görs till Markani AB nummer XXXXXXXXX. Du kan
                      skanna QR-koden via swish-appen. Det behövs inget
                      meddelande i swish-appen. Kontaktuppgifter och eventuella
                      leveransuppgifter får du ange i formuläret i steg 2.
                    </p>
                    <p>
                      Vill du hämta boken själv så blir totala kostnaden{" "}
                      <span className="font-bold">250 SEK</span>.
                    </p>
                    <p>
                      Om du vill ha boken skickad tillkommer en fraktkostnad på
                      75 SEK, alltså totalt{" "}
                      <span className="font-bold">325 SEK</span>.
                    </p>
                    <p>
                      Ange ditt val (skicka eller hämta) i formuläret i steg 2.
                    </p>
                  </div>

                  <img
                    src={swish}
                    alt="QR-koden för swish"
                    className="max-w-60 mb-4"
                  />
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
                      type="text"
                      id="input-email"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="input-phonenumber"
                      className="block font-medium mb-1"
                    >
                      Mobil:
                    </label>
                    <input
                      type="text"
                      id="input-phonenumber"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">
                      Leveransalternativ:
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
                          value="no-send"
                          checked={selectedDeliveryMethod === "no-send"}
                          onChange={(e) =>
                            setSelectedDeliveryMethod(e.target.value)
                          }
                        />
                        <span className="ml-1">Hämta</span>
                      </label>
                    </div>
                  </div>

                  {selectedDeliveryMethod === "send" && (
                    <>
                      <div>
                        <label
                          htmlFor="input-address"
                          className="block font-medium mb-1"
                        >
                          Leveransadress:
                        </label>
                        <input
                          type="text"
                          id="input-address"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="input-postalcode"
                          className="block font-medium mb-1"
                        >
                          Postkod:
                        </label>
                        <input
                          type="text"
                          id="input-postalcode"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="input-city"
                          className="block font-medium mb-1"
                        >
                          Postort:
                        </label>
                        <input
                          type="text"
                          id="input-city"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                      </div>
                    </>
                  )}

                  {selectedDeliveryMethod === "no-send" && (
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
