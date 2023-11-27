import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const PaymentSub = () => {
  const { package_name: packageName } = useParams();
  const navigate = useNavigate();

  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethodI, setPaymentMethodI] = useState(null);
  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const payAmount =
    packageName == "silver"
      ? 3000
      : packageName == "gold"
      ? 4000
      : packageName == "platinum"
      ? 5000
      : 1;

  const handleSubmit = async (event) => {
    event.preventDefault();

    axiosInstance
      .post("/create-payment-intent", {
        price: payAmount,
      })
      .then(async (response) => {
        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardNumberElement);

        if (card == null) {
          return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        });

        if (error) {
          console.log("CheckOut Error: ", error);
          setErrorMessage(error.message);
          setPaymentMethodI(null);
          return;
        } else {
          setPaymentMethodI(paymentMethod);
          setErrorMessage(null);
        }

        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(response.data.clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: user?.displayName || "Anonymous",
                email: user?.email || "Anonymous@gmail.com",
              },
            },
          });

        if (confirmError) {
          console.log(confirmError);
          if (
            confirmError.type === "card_error" ||
            confirmError.type === "validation_error"
          ) {
            setErrorMessage(confirmError.message);
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
          return;
        } else {
          console.log(paymentIntent);

          const paymentData = {
            email: user.email,
            name: user.displayName,
            paymentDate: Date.now(),
            amount: payAmount,
            package: packageName,
            transactionId: paymentIntent.id,
          };

          const response = await axiosInstance.post(
            "/subscription-handler",
            paymentData
          );
          if (response.data.acknowledged) {
            const res = await axiosInstance.patch(
              `/change-package?email=${user.email}&pack=${packageName}`
            );
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Payment Successfull - ${payAmount}`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/all-meals");
              return;
            }
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Something went Wrong`,
              showConfirmButton: false,
              timer: 1500,
            });
          }

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Something went Wrong`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-100 h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Card Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Card Number
            </label>
            {/* <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="**** **** **** ****"
            /> */}
            <CardNumberElement
              className="mt-1 p-2 w-full border rounded-md"
              id="cardNumber"
              options={ELEMENT_OPTIONS}
            ></CardNumberElement>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-600"
              >
                Expiry Date
              </label>
              {/* <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="MM/YY"
              /> */}
              <CardExpiryElement
                className="mt-1 p-2 w-full border rounded-md"
                id="cvc"
                options={ELEMENT_OPTIONS}
              ></CardExpiryElement>
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-600"
              >
                CVV
              </label>
              {/* <input
                type="text"
                id="cvv"
                name="cvv"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="***"
              /> */}
              <CardCvcElement
                className="mt-1 p-2 w-[150px] border rounded-md"
                id="expiry"
                options={ELEMENT_OPTIONS}
              ></CardCvcElement>
            </div>
          </div>
          {errorMessage && (
            <p className="font-semibold text-red-600">{errorMessage}</p>
          )}
          {paymentMethodI && (
            <p className="font-semibold text-green-600">{paymentMethodI.id}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Pay Now {payAmount}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentSub;
