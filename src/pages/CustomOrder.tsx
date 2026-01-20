import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import Chatbot from '@/components/Chatbot';
import { customOrderSchema, sanitizeText, type CustomOrderFormData } from '@/lib/validations';

const CustomOrder = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: '',
    message: '',
    budget: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomOrderFormData, string>>>({});

  const occasions = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Festival',
    'Graduation',
    'New Baby',
    'Thank You',
    'Just Because',
    'Other',
  ];

  const budgetRanges = [
    'Under ₹500',
    '₹500 - ₹1000',
    '₹1000 - ₹2000',
    '₹2000 - ₹5000',
    'Above ₹5000',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof CustomOrderFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data using zod
    const result = customOrderSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CustomOrderFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof CustomOrderFormData;
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
      name: sanitizeText(result.data.name),
      message: sanitizeText(result.data.message),
    };

    setIsSubmitting(true);

    // Build WhatsApp message with form data
    const whatsappMessage = `🎁 *New Custom Order Request*

👤 *Name:* ${sanitizedData.name}
📞 *Phone:* ${sanitizedData.phone}
🎉 *Occasion:* ${sanitizedData.occasion}
💰 *Budget:* ${sanitizedData.budget}
${sanitizedData.message ? `\n💬 *Message:* ${sanitizedData.message}` : ''}`;

    // Open WhatsApp with the order details
    const whatsappUrl = `https://wa.me/918104896311?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Order Sent to WhatsApp! 🎉",
      description: "Complete the order by sending the message on WhatsApp.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="card-soft p-8 md:p-12 text-center max-w-md w-full animate-bounce-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-mint flex items-center justify-center">
              <Check className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Thank You! 💖</h1>
            <p className="text-muted-foreground mb-6">
              Your custom order request has been received. Our team will contact you within 24 hours to discuss your unique gift!
            </p>
            <div className="space-y-3">
              <Link to="/" className="btn-primary w-full block">
                Continue Shopping
              </Link>
              <a
                href={`https://wa.me/918104896311?text=${encodeURIComponent(
                  `Hi Artisiannest! I just submitted a custom order for ${formData.occasion}. Looking forward to hearing from you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </main>
        <Footer />
        <Cart />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="flex-1 py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Shop</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Make it Personal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Custom <span className="text-gradient">Order</span>
            </h1>
            <p className="text-muted-foreground">
              Tell us about your dream gift and we'll create it for you!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-soft p-6 md:p-8 space-y-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                maxLength={100}
                className={`input-soft ${errors.name ? 'border-destructive focus:ring-destructive/30' : ''}`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
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
                placeholder="Enter your 10-digit phone number"
                maxLength={13}
                className={`input-soft ${errors.phone ? 'border-destructive focus:ring-destructive/30' : ''}`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Occasion */}
            <div>
              <label htmlFor="occasion" className="block text-sm font-medium mb-2">
                Occasion <span className="text-destructive">*</span>
              </label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className={`input-soft cursor-pointer ${errors.occasion ? 'border-destructive focus:ring-destructive/30' : ''}`}
                aria-invalid={!!errors.occasion}
                aria-describedby={errors.occasion ? 'occasion-error' : undefined}
              >
                <option value="">Select an occasion</option>
                {occasions.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
              {errors.occasion && (
                <p id="occasion-error" className="text-sm text-destructive mt-1">{errors.occasion}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Budget Range <span className="text-destructive">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`input-soft cursor-pointer ${errors.budget ? 'border-destructive focus:ring-destructive/30' : ''}`}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? 'budget-error' : undefined}
              >
                <option value="">Select your budget</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p id="budget-error" className="text-sm text-destructive mt-1">{errors.budget}</p>
              )}
            </div>

            {/* Custom Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Custom Message / Requirements
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                placeholder="Tell us about your gift idea, any special requests, colors, themes, or messages you'd like to include..."
                className={`input-soft resize-none ${errors.message ? 'border-destructive focus:ring-destructive/30' : ''}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive mt-1">{errors.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/1000 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Custom Order</span>
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-mint/50 rounded-xl text-center">
            <p className="text-sm text-foreground">
              💚 Prefer chatting? Message us directly on{' '}
              <a
                href={`https://wa.me/918104896311?text=${encodeURIComponent("Hi Artisiannest, I'd like to place a custom order!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <Cart />
      
      <Chatbot />
    </div>
  );
};

export default CustomOrder;
