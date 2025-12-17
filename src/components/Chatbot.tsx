import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ShoppingCart, Gift, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  quickReplies?: QuickReply[];
}

interface QuickReply {
  label: string;
  icon: string;
  action: string;
}

const initialQuickReplies: QuickReply[] = [
  { label: '🎂 Birthday Surprise', icon: '🎂', action: 'birthday' },
  { label: '💕 Anniversary Love', icon: '💕', action: 'anniversary' },
  { label: '✨ Make it Custom', icon: '✨', action: 'custom' },
  { label: '🛒 My Cart', icon: '🛒', action: 'cart' },
  { label: '💬 Chat on WhatsApp', icon: '💬', action: 'whatsapp' },
];

const botResponses: Record<string, { text: string; quickReplies?: QuickReply[] }> = {
  greeting: {
    text: "Hieeee 👋🌸\n\nI'm your little gift buddy!\n\nTell me who you're shopping for and I'll help you find something special 💝",
    quickReplies: initialQuickReplies,
  },
  birthday: {
    text: "Aww, birthdays are the best! 🎂✨\n\nWe have some amazing birthday hampers starting from ₹599!\n\nOur Handmade Birthday Hamper (₹1299) is super popular - it comes with personalized goodies!\n\nWant to see more or create something custom? 💖",
    quickReplies: [
      { label: '✨ Make it Custom', icon: '✨', action: 'custom' },
      { label: '🛒 Add to Cart', icon: '🛒', action: 'cart' },
      { label: '💬 Chat on WhatsApp', icon: '💬', action: 'whatsapp' },
    ],
  },
  anniversary: {
    text: "Aww, that's so sweet! 💕\n\nAnniversaries deserve something extra special!\n\nOur Anniversary Gift Set (₹1499) includes everything to make the moment unforgettable.\n\nOr I can help you create a completely custom gift! What do you think? 🌹",
    quickReplies: [
      { label: '✨ Make it Custom', icon: '✨', action: 'custom' },
      { label: '🛒 View Cart', icon: '🛒', action: 'cart' },
      { label: '💬 Chat on WhatsApp', icon: '💬', action: 'whatsapp' },
    ],
  },
  custom: {
    text: "Custom gifts make moments extra special! ✨\n\nYou can choose:\n• Your budget\n• The occasion\n• A personal message\n• Special preferences\n\nI'll take you to our custom order page where you can share all the details! 🎁",
    quickReplies: [
      { label: '📝 Go to Custom Order', icon: '📝', action: 'navigate_custom' },
      { label: '💬 Chat on WhatsApp', icon: '💬', action: 'whatsapp' },
    ],
  },
  cart: {
    text: "Let me open your cart for you! 🛒\n\nYou can see all your selected goodies there. Take your time choosing! 🧡",
    quickReplies: [
      { label: '🎁 Back to Shopping', icon: '🎁', action: 'shopping' },
      { label: '💬 Need Help?', icon: '💬', action: 'help' },
    ],
  },
  whatsapp: {
    text: "Sure thing! 💚\n\nI'm opening WhatsApp for you now. Our team loves chatting and will help you find the perfect gift!\n\nTalk soon! 🌸",
    quickReplies: initialQuickReplies,
  },
  prices: {
    text: "Here are our lovely options! 🏷️\n\n🎁 Mini Gift Hamper - ₹599\n🎨 Hand Painted Mug - ₹299\n💌 Greeting Cards (Set of 3) - ₹399\n🎂 Birthday Hamper - ₹1299\n💕 Anniversary Set - ₹1499\n🌸 Custom Flowers - ₹350\n\nAnything catch your eye? 😊",
    quickReplies: initialQuickReplies,
  },
  delivery: {
    text: "Great question! 📦\n\nWe deliver all over India! Most orders are shipped within 2-3 days.\n\nFor exact delivery times to your location, just message us on WhatsApp! 💚",
    quickReplies: [
      { label: '💬 Chat on WhatsApp', icon: '💬', action: 'whatsapp' },
      { label: '🛒 My Cart', icon: '🛒', action: 'cart' },
    ],
  },
  help: {
    text: "I'm here to help! 🤗\n\nYou can ask me about:\n• 🎁 Gift suggestions\n• 💰 Prices\n• 📦 Delivery\n• ✨ Custom orders\n\nOr we can chat on WhatsApp anytime! 💚",
    quickReplies: initialQuickReplies,
  },
  shopping: {
    text: "Happy shopping! 🛍️✨\n\nJust scroll through our beautiful handmade gifts and tap 'Add to Cart' when something catches your eye!\n\nI'm here if you need any help! 🧡",
    quickReplies: initialQuickReplies,
  },
  fallback: {
    text: "Oopsieee 😅 I didn't quite get that.\n\nBut don't worry! You can ask me about gifts, prices, or custom orders 💖\n\nOr tap one of the buttons below!",
    quickReplies: initialQuickReplies,
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, ...botResponses.greeting, isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setIsCartOpen, totalItems } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (action: string) => {
    let userMessage = '';
    let botResponse = botResponses.fallback;

    switch (action) {
      case 'birthday':
        userMessage = '🎂 Birthday Surprise';
        botResponse = botResponses.birthday;
        break;
      case 'anniversary':
        userMessage = '💕 Anniversary Love';
        botResponse = botResponses.anniversary;
        break;
      case 'custom':
        userMessage = '✨ Make it Custom';
        botResponse = botResponses.custom;
        break;
      case 'cart':
        userMessage = '🛒 My Cart';
        botResponse = botResponses.cart;
        setTimeout(() => setIsCartOpen(true), 500);
        break;
      case 'whatsapp':
        userMessage = '💬 Chat on WhatsApp';
        botResponse = botResponses.whatsapp;
        setTimeout(() => {
          window.open(
            `https://wa.me/918104896311?text=${encodeURIComponent("Hi Artisiannest, I'm interested in your handmade gifts.")}`,
            '_blank'
          );
        }, 500);
        break;
      case 'navigate_custom':
        userMessage = '📝 Go to Custom Order';
        botResponse = { text: "Taking you there now! ✨", quickReplies: initialQuickReplies };
        setTimeout(() => {
          setIsOpen(false);
          navigate('/custom-order');
        }, 500);
        break;
      case 'shopping':
        userMessage = '🎁 Back to Shopping';
        botResponse = botResponses.shopping;
        break;
      case 'help':
        userMessage = '💬 Need Help?';
        botResponse = botResponses.help;
        break;
      default:
        botResponse = botResponses.fallback;
    }

    addMessage(userMessage, false);
    setTimeout(() => addMessage(botResponse.text, true, botResponse.quickReplies), 600);
  };

  const addMessage = (text: string, isBot: boolean, quickReplies?: QuickReply[]) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, isBot, quickReplies },
    ]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userText = inputText.toLowerCase();
    addMessage(inputText, false);
    setInputText('');

    let response = botResponses.fallback;

    if (userText.includes('birthday') || userText.includes('bday')) {
      response = botResponses.birthday;
    } else if (userText.includes('anniversary') || userText.includes('anniv')) {
      response = botResponses.anniversary;
    } else if (userText.includes('custom') || userText.includes('personalize')) {
      response = botResponses.custom;
    } else if (userText.includes('price') || userText.includes('cost') || userText.includes('how much')) {
      response = botResponses.prices;
    } else if (userText.includes('delivery') || userText.includes('shipping') || userText.includes('ship')) {
      response = botResponses.delivery;
    } else if (userText.includes('help') || userText.includes('hi') || userText.includes('hello')) {
      response = botResponses.help;
    } else if (userText.includes('cart')) {
      response = botResponses.cart;
      setTimeout(() => setIsCartOpen(true), 500);
    } else if (userText.includes('whatsapp') || userText.includes('chat')) {
      response = botResponses.whatsapp;
      setTimeout(() => {
        window.open(
          `https://wa.me/918104896311?text=${encodeURIComponent("Hi Artisiannest, I'm interested in your handmade gifts.")}`,
          '_blank'
        );
      }, 500);
    }

    setTimeout(() => addMessage(response.text, true, response.quickReplies), 600);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`floating-btn bottom-6 right-4 md:bottom-44 md:right-6 bg-primary text-primary-foreground
                   ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-soft" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-out
                   md:bottom-44 md:right-6 md:w-96 md:h-[500px] md:rounded-2xl
                   bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl md:rounded-2xl
                   bg-card shadow-2xl border border-border overflow-hidden flex flex-col
                   ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full md:translate-y-4 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-coral-light p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Gift Buddy</h3>
              <p className="text-xs text-white/80">Always here to help! 🌸</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-muted rounded-bl-md'
                    : 'bg-primary text-primary-foreground rounded-br-md'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                {message.quickReplies && message.isBot && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.action)}
                        className="text-xs px-3 py-1.5 bg-card border border-border rounded-full 
                                 hover:bg-primary hover:text-primary-foreground hover:border-primary
                                 transition-all duration-200 active:scale-95"
                      >
                        {reply.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 input-soft py-2.5 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-3 bg-primary text-primary-foreground rounded-full 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:shadow-glow transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
