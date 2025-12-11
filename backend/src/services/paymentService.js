// Mock Payment Service

export const createPaymentOrder = async (amount, currency = 'INR') => {
    // Simulate API call to Razorpay/Stripe
    return {
        id: `order_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        currency,
        status: 'created',
    };
};

export const verifyPayment = async (paymentId, signature) => {
    // Simulate verification
    return true;
};
