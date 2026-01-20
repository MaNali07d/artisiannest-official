import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Package, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import Chatbot from '@/components/Chatbot';
import { checkoutSchema, sanitizeText, type CheckoutFormData } from '@/lib/validations';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data using zod
    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof CheckoutFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
      return;
    }

    // Sanitize validated data
    const sanitizedData = {
      ...result.data,
      fullName: sanitizeText(result.data.fullName),
      address: sanitizeText(result.data.address),
      city: sanitizeText(result.data.city),
      state: sanitizeText(result.data.state),
      notes: sanitizeText(result.data.notes),
    };

    setIsSubmitting(true);

    // Simulate API call (in a real app, this would send sanitizedData to the server)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newOrderNumber = `AN${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);

    // Build WhatsApp message with order details
    const itemsList = items
      .map((item) => `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`)
      .join('\n');

    const whatsappMessage = `🛒 *NEW ORDER RECEIVED*

*Order ID:* #${newOrderNumber}

*Customer Details:*
👤 Name: ${sanitizedData.fullName}
📱 Phone: ${sanitizedData.phone}
${sanitizedData.email ? `📧 Email: ${sanitizedData.email}` : ''}

*Delivery Address:*
📍 ${sanitizedData.address}
${sanitizedData.city}, ${sanitizedData.state} - ${sanitizedData.pincode}

*Order Items:*
${itemsList}

💰 *Total: ₹${totalPrice.toLocaleString('en-IN')}*
💵 *Payment: Cash on Delivery*

${sanitizedData.notes ? `📝 *Notes:* ${sanitizedData.notes}` : ''}`;

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/918104896311?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );

    setIsSubmitting(false);
    setIsOrderPlaced(true);
    clearCart();

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order #${newOrderNumber} has been confirmed.`,
    });
  };

  if (items.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="card-soft p-8 md:p-12 text-center max-w-md w-full">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some beautiful handmade gifts to your cart first!
            </p>
            <Link to="/" className="btn-primary inline-block">
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
        <Chatbot />
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="card-soft p-8 md:p-12 text-center max-w-md w-full animate-bounce-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-mint flex items-center justify-center">
              <Check className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed! 🎉</h1>
            <p className="text-primary font-mono text-lg mb-4">#{orderNumber}</p>
            <p className="text-muted-foreground mb-6">
              Thank you for your order! We're preparing your handmade gifts with love. You'll receive a confirmation on WhatsApp shortly.
            </p>
            <div className="space-y-3">
              <Link to="/" className="btn-primary w-full block">
                Continue Shopping
              </Link>
              <a
                href={`https://wa.me/918104896311?text=${encodeURIComponent(
                  `Hi Artisiannest! I just placed order #${orderNumber}. Looking forward to receiving my gifts!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                Track on WhatsApp
              </a>
            </div>
          </div>
        </main>
        <Footer />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="flex-1 py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Shop</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="text-gradient">Checkout</span>
          </h1>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-3">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Delivery Details */}
                <div className="card-soft p-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    Delivery Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          maxLength={100}
                          className={`input-soft ${errors.fullName ? 'border-destructive focus:ring-destructive/30' : ''}`}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        />
                        {errors.fullName && (
                          <p id="fullName-error" className="text-sm text-destructive mt-1">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter 10-digit phone number"
                          maxLength={13}
                          className={`input-soft ${errors.phone ? 'border-destructive focus:ring-destructive/30' : ''}`}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        maxLength={255}
                        className={`input-soft ${errors.email ? 'border-destructive focus:ring-destructive/30' : ''}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        maxLength={500}
                        placeholder="House/Flat No., Street, Landmark"
                        className={`input-soft resize-none ${errors.address ? 'border-destructive focus:ring-destructive/30' : ''}`}
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? 'address-error' : undefined}
                      />
                      {errors.address && (
                        <p id="address-error" className="text-sm text-destructive mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          maxLength={100}
                          className={`input-soft ${errors.city ? 'border-destructive focus:ring-destructive/30' : ''}`}
                          aria-invalid={!!errors.city}
                          aria-describedby={errors.city ? 'city-error' : undefined}
                        />
                        {errors.city && (
                          <p id="city-error" className="text-sm text-destructive mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">
                          State <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="State"
                          maxLength={100}
                          className={`input-soft ${errors.state ? 'border-destructive focus:ring-destructive/30' : ''}`}
                          aria-invalid={!!errors.state}
                          aria-describedby={errors.state ? 'state-error' : undefined}
                        />
                        {errors.state && (
                          <p id="state-error" className="text-sm text-destructive mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                          Pincode <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="6-digit pincode"
                          maxLength={6}
                          className={`input-soft ${errors.pincode ? 'border-destructive focus:ring-destructive/30' : ''}`}
                          aria-invalid={!!errors.pincode}
                          aria-describedby={errors.pincode ? 'pincode-error' : undefined}
                        />
                        {errors.pincode && (
                          <p id="pincode-error" className="text-sm text-destructive mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={2}
                        maxLength={500}
                        placeholder="Any special instructions for delivery..."
                        className={`input-soft resize-none ${errors.notes ? 'border-destructive focus:ring-destructive/30' : ''}`}
                        aria-invalid={!!errors.notes}
                        aria-describedby={errors.notes ? 'notes-error' : undefined}
                      />
                      {errors.notes && (
                        <p id="notes-error" className="text-sm text-destructive mt-1">{errors.notes}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="card-soft p-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Options
                  </h2>
                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <div className="p-4 bg-mint/30 rounded-xl border-2 border-primary">
                      <p className="text-sm text-foreground">
                        💚 <strong>Cash on Delivery</strong> - Pay when you receive + extra delivery charges
                      </p>
                    </div>
                    
                    {/* Online Payment */}
                    <div className="p-4 bg-lavender/30 rounded-xl">
                      <p className="text-sm text-foreground">
                        💳 <strong>Online Payment</strong> - Pay after order confirmation
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        UPI / Card payment link will be shared on WhatsApp after order confirmation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Mobile Only */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lg:hidden btn-primary w-full flex items-center justify-center gap-2 py-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <Package size={18} />
                      <span>Place Order • ₹{totalPrice.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="card-soft p-6 sticky top-24">
                <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <Package className="w-5 h-5 text-primary" />
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-mint font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Button - Desktop */}
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="hidden lg:flex btn-primary w-full items-center justify-center gap-2 py-4 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <Package size={18} />
                      <span>Place Order</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing your order, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Cart />
      
      <Chatbot />
    </div>
  );
};

export default Checkout;
