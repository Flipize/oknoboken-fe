import React, { useState } from 'react'
import Card from '../Card';
import axios from 'axios';
import useConfig from '../../useConfig';

const Order = () => {
  const [orderSent, setOrderSent] = useState(false); // To show a loading state
  //const [validInput, setValidInput] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const config = useConfig();
  if (!config) return <p>Loading configuration...</p>;
  const apiUrl = config.apiUrl + "/api/v1/message/submit";

  interface RequestData {
    name: string;
    email: string;
    message: string;
    delivery: string;
    adress: string;
    postal_code: string;
    phone_number: string;
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
      delivery: "",
      message: "",
      adress: "",
      postal_code: "",
      phone_number: "",
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
    const inputDeliveryElement = document.getElementById(
      "input-delivery"
    ) as HTMLInputElement;
    if (inputDeliveryElement) {
      requestData.delivery = inputDeliveryElement.value;
    }
    const inputAdressElement = document.getElementById(
      "input-adress"
    ) as HTMLInputElement;
    if (inputAdressElement) {
      requestData.adress = inputAdressElement.value;
    }
    const inputPostalCodeElement = document.getElementById(
      "input-postalcode"
    ) as HTMLInputElement;
    if (inputPostalCodeElement) {
      requestData.postal_code = inputPostalCodeElement.value;
    }
    const inputPhoneNumberElement = document.getElementById(
      "input-phonenumber"
    ) as HTMLInputElement;
    if (inputPhoneNumberElement) {
      requestData.phone_number = inputPostalCodeElement.value;
    }
    console.log(
      "Name: " +
        requestData.name +
        ", Email: " +
        requestData.email +
        ", Delivery: " +
        requestData.delivery +
        ", Message: " +
        requestData.message +
        ", Adress: " +
        requestData.adress +
        ", Postal Code: " +
        requestData.postal_code +
        ", Phone Number: " +
        requestData.phone_number
    );

    try {
      const response = await sendPostRequest(apiUrl, requestData);
      setResponseMessage(response.message);
    } catch (error) {
      console.error("Error sending POST request:", error);
      setResponseMessage("Failed to submit order.");
    }
    responseMessage && console.log(responseMessage);
    setOrderSent(true);
  };

  return (
    <div className="h-screen">
      <Card title="Köp Oknöboken">
        <div className="container">
          {!orderSent
     && (
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
                        type="email"
                        className="form-control"
                        id="input-email"
                      />
                    </div>
                  </div>
                  <div className="form-group input-container">
                    <label htmlFor="input-delivery">Leveransalternativ:</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        id="input-delivery"
                      />
                    </div>
                  </div>
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
          {orderSent
     && (
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