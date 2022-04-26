const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) get the checkout session from server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    // 2) create checkout form + charge credit card
    //await stripe.redirectToCheckout({
    // sessionId: session.data.session.id,
    // });
    window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
