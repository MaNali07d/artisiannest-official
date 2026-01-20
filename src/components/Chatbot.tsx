import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, MessageCircle, GripHorizontal, Minimize2, Sparkles } from 'lucide-react';
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

interface Position {
  x: number;
  y: number;
}

const initialQuickReplies: QuickReply[] = [
  { label: '🎂 Birthday Surprise', icon: '🎂', action: 'birthday' },
  { label: '💕 Anniversary Love', icon: '💕', action: 'anniversary' },
  { label: '✨ Make it Custom', icon: '✨', action: 'custom' },
  { label: '🛒 My Cart', icon: '🛒', action: 'cart' },
  { label: '💬 WhatsApp', icon: '💬', action: 'whatsapp' },
  { label: '📸 Instagram', icon: '📸', action: 'instagram' },
  { label: '📧 Email', icon: '📧', action: 'email' },
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
  instagram: {
    text: "Opening Instagram! 📸\n\nFollow us @artisiannest for daily inspiration, behind-the-scenes, and new arrivals!\n\nSee you there! 🌸",
    quickReplies: initialQuickReplies,
  },
  email: {
    text: "Opening your email app! 📧\n\nFeel free to write to us at artisiannest@gmail.com - we'd love to hear from you!\n\n💖",
    quickReplies: initialQuickReplies,
  },
  prices: {
    text: "Here are our lovely options! 🏷️\n\n🎁 Mini Gift Hamper - ₹599\n🎨 Hand Painted Mug - ₹299\n💌 Greeting Cards (Set of 3) - ₹399\n🎂 Birthday Hamper - ₹1299\n💕 Anniversary Set - ₹1499\n🌸 Custom Flowers - ₹350\n\nAnything catch your eye? 😊",
    quickReplies: initialQuickReplies,
  },
  delivery: {
    text: "Great question! 📦\n\nWe deliver all over India! Most orders are shipped within 2-3 days.\n\nFor exact delivery times to your location, just message us on WhatsApp! 💚",
    quickReplies: [
      { label: '💬 WhatsApp', icon: '💬', action: 'whatsapp' },
      { label: '🛒 My Cart', icon: '🛒', action: 'cart' },
    ],
  },
  help: {
    text: "I'm here to help! 🤗\n\nYou can ask me about:\n• 🎁 Gift suggestions\n• 💰 Prices\n• 📦 Delivery\n• ✨ Custom orders\n\nOr reach us on WhatsApp, Instagram or Email! 💚",
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, ...botResponses.greeting, isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setIsCartOpen } = useCart();

  // Initialize position when opening
  useEffect(() => {
    if (isOpen && position.x === 0 && position.y === 0) {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        // Position at bottom-right with some margin
        setPosition({
          x: window.innerWidth - 420,
          y: window.innerHeight - 560,
        });
      }
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Constrain position within screen bounds
  const constrainPosition = useCallback((x: number, y: number): Position => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const chatWidth = 384; // w-96 = 24rem = 384px
    const chatHeight = 500;

    return {
      x: Math.max(0, Math.min(x, windowWidth - chatWidth)),
      y: Math.max(0, Math.min(y, windowHeight - chatHeight)),
    };
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Disable drag on mobile for now, use touch instead
    
    e.preventDefault();
    setIsDragging(true);
    
    const rect = chatWindowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newPosition = constrainPosition(
      e.clientX - dragOffset.x,
      e.clientY - dragOffset.y
    );
    setPosition(newPosition);
  }, [isDragging, dragOffset, constrainPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch drag handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return; // Use mouse events on desktop
    
    const touch = e.touches[0];
    setIsDragging(true);
    
    const rect = chatWindowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scroll while dragging
    
    const touch = e.touches[0];
    const newPosition = constrainPosition(
      touch.clientX - dragOffset.x,
      touch.clientY - dragOffset.y
    );
    setPosition(newPosition);
  }, [isDragging, dragOffset, constrainPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Attach/detach global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

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
        userMessage = '💬 WhatsApp';
        botResponse = botResponses.whatsapp;
        setTimeout(() => {
          window.open(
            `https://wa.me/918104896311?text=${encodeURIComponent("Hi Artisiannest, I'm interested in your handmade gifts.")}`,
            '_blank'
          );
        }, 500);
        break;
      case 'instagram':
        userMessage = '📸 Instagram';
        botResponse = botResponses.instagram;
        setTimeout(() => {
          window.open('https://instagram.com/artisiannest', '_blank');
        }, 500);
        break;
      case 'email':
        userMessage = '📧 Email';
        botResponse = botResponses.email;
        setTimeout(() => {
          window.open('mailto:artisiannest@gmail.com', '_blank');
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

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    // Reset position for next open
    setPosition({ x: 0, y: 0 });
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Desktop position styles
  const getDesktopStyles = (): React.CSSProperties => {
    if (window.innerWidth < 768) return {};
    
    return {
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      right: 'auto',
      bottom: 'auto',
    };
  };

  return (
    <>
      {/* Fixed Chat Button - At bottom right corner (WhatsApp position) */}
      <button
        onClick={handleOpen}
        className={`floating-btn bottom-24 right-4 md:bottom-6 md:right-6 bg-primary text-primary-foreground
                   ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-soft" />
      </button>

      {/* Draggable Chat Window */}
      <div
        ref={chatWindowRef}
        style={window.innerWidth >= 768 ? getDesktopStyles() : undefined}
        className={`fixed z-50 transition-all duration-300 ease-out
                   md:w-96 md:rounded-2xl
                   bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto
                   ${isMinimized ? 'h-14 md:h-14' : 'h-[85vh] md:h-[500px]'}
                   rounded-t-3xl md:rounded-2xl
                   bg-card shadow-2xl border border-border overflow-hidden flex flex-col
                   ${isDragging ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] scale-[1.02]' : ''}
                   ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full md:translate-y-4 opacity-0 pointer-events-none'}`}
      >
        {/* Draggable Header */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`bg-gradient-to-r from-primary to-coral-light p-4 flex items-center justify-between
                     ${window.innerWidth >= 768 ? 'cursor-grab active:cursor-grabbing' : ''}
                     select-none transition-all duration-200
                     ${isDragging ? 'bg-gradient-to-r from-primary/90 to-coral-light/90' : ''}`}
        >
          <div className="flex items-center gap-3">
            {/* Drag indicator - only on desktop */}
            <div className="hidden md:flex items-center gap-1 mr-1 opacity-60">
              <GripHorizontal size={16} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Gift Buddy 💝</h3>
              <p className="text-xs text-white/80">
                {isDragging ? 'Moving...' : 'Always here to help! 🌸'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleMinimize}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 size={18} className="text-white" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Messages - Hidden when minimized */}
        {!isMinimized && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Chatbot;
