import axios from 'axios';
import {cartInfo} from '../types/cartInfo';
import {getDBConnection, subscribe} from './database';

export async function checkPaymentStatus(
  id: number,
  jsonResponse: JSON,
  cartInfo: cartInfo,
) {
  const stripeResponse = await axios.post('http://localhost:8000/payment', {
    email: 'andybuhchev@gmail.com',
    product: cartInfo,
    authToken: jsonResponse,
  });
  if (stripeResponse) {
    const {paid} = stripeResponse.data;
    if (paid === true) {
      const db = await getDBConnection();
      subscribe(db, id, 1);
      return 'Payment Success';
    } else {
      return 'Payment failed due to some issue';
    }
  } else {
    return 'Payment failed due to some issue';
  }
}
