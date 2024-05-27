import dotenv from "dotenv";
dotenv.config();
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_URL } = process.env;

/**
 * Fetches an access token from the PayPal API.
 * @see {@link https://developer.paypal.com/reference/get-an-access-token/#link-getanaccesstoken}
 *
 * @returns {Promise<string>} The access token if the request is successful.
 * @throws {Error} If the request is not successful.
 *
 */
async function getPayPalAccessToken() {
  // Authorization header requires base64 encoding
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString(
    "base64"
  );

  const url = `${PAYPAL_API_URL}/v1/oauth2/token`;

  const headers = {
    Accept: "application/json",
    "Accept-Language": "en_US",
    Authorization: `Basic ${auth}`,
  };

  const body = "grant_type=client_credentials";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) throw new Error("Failed to get access token");

  const paypalData = await response.json();

  return paypalData.access_token;
}
/**
 * Checks if a PayPal transaction is new by comparing the transaction ID with existing orders in the database.
 *
 * @param {Mongoose.Model} orderModel - The Mongoose model for the orders in the database.
 * @param {string} paypalTransactionId - The PayPal transaction ID to be checked.
 * @returns {Promise<boolean>} Returns true if it is a new transaction (i.e., the transaction ID does not exist in the database), false otherwise.
 * @throws {Error} If there's an error in querying the database.
 *
 */
export async function checkIfNewTransaction(orderModel, paypalTransactionId) {
  try {
    // Find all documents where Order.paymentResult.id is the same as the id passed paypalTransactionId
    const orders = await orderModel.find({
      "paymentResult.id": paypalTransactionId,
    });

    // If there are no such orders, then it's a new transaction.
    return orders.length === 0;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Verifies a PayPal payment by making a request to the PayPal API.
 * @see {@link https://developer.paypal.com/docs/api/orders/v2/#orders_get}
 *
 * @param {string} paypalTransactionId - The PayPal transaction ID to be verified.
 * @returns {Promise<Object>} An object with properties 'verified' indicating if the payment is completed and 'value' indicating the payment amount.
 * @throws {Error} If the request is not successful.
 *
 */
export async function verifyPayPalPayment(paypalTransactionId) {
  const accessToken = await getPayPalAccessToken();
  const paypalResponse = await fetch(
    `${PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!paypalResponse.ok) throw new Error("Failed to verify payment");

  const paypalData = await paypalResponse.json();
  return {
    verified: paypalData.status === "COMPLETED",
    value: paypalData.purchase_units[0].amount.value,
  };
}

// In a nutshell, what we are doing here is creating a function that will get the access token from PayPal and then we will use that access token to verify the payment. We will also create a function to check if the transaction is new or not.

// Let's go through each function one by one.

// ### `getPayPalAccessToken()`

// This function will get the access token from PayPal. We will use this access token to verify the payment.

// - We first convert the `PAYPAL_CLIENT_ID` and `PAYPAL_APP_SECRET` to base64 encoding and then we make a `POST` request to the PayPal API to get the access token.
// - We send the `Authorization` header with the base64 encoded string.
// - We also need to set the body to `grant_type=client_credentials` as per the [PayPal API documentation](https://developer.paypal.com/docs/api/get-an-access-token-curl/).
// - If the request is successful, we return the access token. If it is not successful, we throw an error.

// ### `checkIfNewTransaction()`

// This function will check if the transaction is new or not. We will use this function to make sure that we don't verify the same transaction twice.

// - We first find all the orders in the database where the `paymentResult.id` is the same as the `paypalTransactionId` that we pass to the function.
// - If there are no such orders, then it's a new transaction and we return `true`. If there are such orders, then it's not a new transaction and we return `false`.

// ### `verifyPayPalPayment()`

// This function will verify the payment by making a request to the PayPal API.

// - We first get the access token from the `getPayPalAccessToken()` function.
// - We then make a `GET` request to the PayPal API to get the order details.
// - If the request is successful, we return an object with properties `verified` indicating if the payment is completed and `value` indicating the payment amount. If the request is not successful, we throw an error.

// ## Calculate Prices On Server

// The next things we need to address is the price and tax calculation. Right now, we are doing this all on the client. The issue with that is that the client can change the price and tax and then send the request to the server. We need to make sure that the price and tax are calculated on the server.
