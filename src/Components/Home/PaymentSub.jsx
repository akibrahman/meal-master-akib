import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
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
  const [loading, setLoading] = useState(false);

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#fff",
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
    setLoading(true);

    axiosInstance
      .post("/create-payment-intent", {
        price: payAmount,
      })
      .then(async (response) => {
        if (!stripe || !elements) {
          setLoading(false);
          return;
        }

        const card = elements.getElement(CardNumberElement);

        if (card == null) {
          setLoading(false);
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
          setLoading(false);
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
          setLoading(false);
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
                position: "top-start",
                icon: "success",
                title: `Payment Successfull - ${payAmount} Tk`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/all-meals");
              setLoading(false);
              return;
            }
            setLoading(false);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Something went Wrong`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          setLoading(false);
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
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Something went Wrong`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="bg-stone-600 p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          Card Payment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-white"
            >
              Card Number
            </label>
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
                className="block text-sm font-medium text-white"
              >
                Expiry Date
              </label>
              <CardExpiryElement
                className="mt-1 p-2 w-full border rounded-md"
                id="cvc"
                options={ELEMENT_OPTIONS}
              ></CardExpiryElement>
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-white"
              >
                CVV
              </label>
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
            <p className="font-semibold text-green-600">Successfull</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 flex items-center gap-3 mx-auto mt-10"
          >
            {loading ? <ImSpinner9 className="animate-spin " /> : "Pay Now"}

            <p className="flex items-center gap-1">
              <FaBangladeshiTakaSign /> {payAmount}
            </p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentSub;
