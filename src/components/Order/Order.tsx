import React, { useState } from "react";
import Card from "../Card";
import axios from "axios";
import useConfig from "../../useConfig";

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
    <div className="h-screen">
      <Card title="Köp Oknöboken">
        <div className="container">
          {!orderSent && (
            <div>
              <div className="form-message-container">
                <form>
                  <div className="form-group input-container">
                    <label htmlFor="input-name">Namn:</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        id="input-name"
                      />
                    </div>
                  </div>
                  <div className="form-group input-container">
                    <label htmlFor="input-email">Email:</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        id="input-email"
                      />
                    </div>
                  </div>
                  <div className="form-group input-container">
                    <label htmlFor="input-phonenumber">Mobil:</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        id="input-phonenumber"
                      />
                    </div>
                  </div>
                  <div className="form-group input-container flex items-center">
                    <label htmlFor="input-delivery">Leveransalternativ:</label>
                    <div
                      id="input-delivery"
                      className="w-3/4 flex justify-center gap-4"
                    >
                      <label>
                        <input
                          type="radio"
                          name="delivery"
                          value="send"
                          checked={selectedDeliveryMethod === "send"}
                          onChange={(e) =>
                            setSelectedDeliveryMethod(e.target.value)
                          }
                        />
                        Skicka
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="delivery"
                          value="no-send"
                          checked={selectedDeliveryMethod === "no-send"}
                          onChange={(e) =>
                            setSelectedDeliveryMethod(e.target.value)
                          }
                        />
                        Hämta själv
                      </label>
                    </div>
                  </div>
                  {selectedDeliveryMethod === "send" && (
                    <>
                      <div className="form-group input-container">
                        <label htmlFor="input-address">Leveransadress:</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control"
                            id="input-address"
                          />
                        </div>
                      </div>
                      <div className="form-group input-container">
                        <label htmlFor="input-postalcode">Postkod:</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control"
                            id="input-postalcode"
                          />
                        </div>
                      </div>
                      <div className="form-group input-container">
                        <label htmlFor="input-city">Postort:</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control"
                            id="input-city"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedDeliveryMethod === "no-send" && (
                    <div>
                      <p>
                        Boken kan hämtas på Lillövägen 36 när du har fått
                        bekräftelse via email
                      </p>
                    </div>
                  )}
                  <div className="form-group input-container">
                    <label htmlFor="input-message">Meddelande:</label>
                    <div className="input-wrapper">
                      <textarea
                        className="form-control"
                        id="input-message"
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                  <div className="submit-wrapper">
                    <button
                      type="button"
                      className="btn btn-primary mb-3"
                      onClick={handleOnClickSend}
                    >
                      Skicka
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {orderSent && (
            <div className="container">
              <div>Tack för din beställning!</div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={() => setOrderSent(false)}
                >
                  Gå tillbaka
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Order;
