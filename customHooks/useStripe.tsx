import {
  useGooglePay,
  useApplePay,
  createGooglePayPaymentMethod,
} from '@stripe/stripe-react-native';
import {Alert, Platform} from 'react-native';

import {useEffect} from 'react';
import {fetchUserSecret} from '../services/paymentService';
import {subscribe} from '../util/database';

export default function useStripe(name: string, id: number, cartInfo: any) {
  const {presentApplePay, confirmApplePayPayment, isApplePaySupported} =
    useApplePay();
  const {isGooglePaySupported, initGooglePay} = useGooglePay();

  const fetchPaymentIntentClientSecret = async () => {
    await fetchUserSecret();
  };

  const gInit = async () => {
    if (Platform.OS === 'android') {
      const checkGooglePaySupport = async () => {
        if (!(await isGooglePaySupported({testEnv: true}))) {
          Alert.alert('Google Pay is not supported.');
          return;
        }
      };
      const initGPay = async () => {
        const {error} = await initGooglePay({
          testEnv: true,
          merchantName: 'Buy subscription',
          countryCode: 'BUL',
          billingAddressConfig: {
            format: 'FULL',
            isPhoneNumberRequired: true,
            isRequired: false,
          },
          existingPaymentMethodRequired: false,
          isEmailRequired: true,
        });
        if (error) {
          Alert.alert(error.code, error.message);
          return;
        }
      };
      checkGooglePaySupport();
      initGPay();
    }
  };

  const paymentMethod = async () => {
    const {error, paymentMethod} = await createGooglePayPaymentMethod({
      amount: 10,
      currencyCode: 'BGN',
    });
    if (error) {
      Alert.alert(error.code, error.message);
      return;
    } else if (paymentMethod) {
      subscribe(id, 1);
      Alert.alert(
        'Success',
        `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`,
      );
    }
  };

  const payWithApple = async () => {
    if (!isApplePaySupported) {
      Alert.alert('Apple pay is not supperted');
    }
    const {error} = await presentApplePay({
      cartItems: cartInfo,
      country: 'BUL',
      currency: 'BGN',
    });
    if (error) {
      Alert.alert('Apple pay not setted up !');
    } else {
      const clientSecret: any = await fetchPaymentIntentClientSecret();
      const {error: confirmError} = await confirmApplePayPayment(clientSecret);
      if (confirmError) {
        Alert.alert('You must confirm the payment to proceed');
      }
      subscribe(id, 1);
      Alert.alert('Success', `The payment was successfull.`);
    }
  };

  useEffect(() => {
    switch (name) {
      case 'gInit':
        gInit();
        break;
      case 'paymentMethod':
        paymentMethod();
        break;
      case 'payWithApple':
        payWithApple();
        break;
      default:
        return;
    }
  }, [name]);
}
