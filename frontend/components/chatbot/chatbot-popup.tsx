"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Sparkles,
  Home,
  Calculator,
  MapPin,
  TrendingUp,
  Phone,
  Calendar,
  Minimize2,
  Maximize2
} from "lucide-react"
import type { ChatMessage } from "@/lib/types"

interface ChatbotPopupProps {
  dictionary: any
  locale: string
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  message: string
  category: string
}

interface SmartSuggestion {
  id: string
  text: string
  action: () => void
}

export function ChatbotPopup({ dictionary, locale }: ChatbotPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: dictionary?.chatbot?.welcome || "Xin chào! Tôi là trợ lý ảo của ReviewNhaThat. Tôi có thể giúp bạn tìm kiếm bất động sản, tính toán thế chấp, và trả lời các câu hỏi về bất động sản. Bạn cần hỗ trợ gì?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [currentSuggestions, setCurrentSuggestions] = useState<SmartSuggestion[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: "search",
      label: "Tìm nhà",
      icon: <Home className="h-4 w-4" />,
      message: "Tôi muốn tìm kiếm bất động sản",
      category: "search"
    },
    {
      id: "calculate",
      label: "Tính thế chấp",
      icon: <Calculator className="h-4 w-4" />,
      message: "Giúp tôi tính toán khoản vay thế chấp",
      category: "finance"
    },
    {
      id: "location",
      label: "Khu vực tốt",
      icon: <MapPin className="h-4 w-4" />,
      message: "Tư vấn khu vực đầu tư tốt",
      category: "location"
    },
    {
      id: "market",
      label: "Thị trường",
      icon: <TrendingUp className="h-4 w-4" />,
      message: "Tình hình thị trường bất động sản hiện tại",
      category: "market"
    },
    {
      id: "contact",
      label: "Liên hệ",
      icon: <Phone className="h-4 w-4" />,
      message: "Tôi muốn được tư vấn trực tiếp",
      category: "contact"
    },
    {
      id: "schedule",
      label: "Đặt lịch",
      icon: <Calendar className="h-4 w-4" />,
      message: "Đặt lịch hẹn xem nhà",
      category: "schedule"
    }
  ]

  // Smart suggestions based on context
  const generateSuggestions = (lastMessage: string): SmartSuggestion[] => {
    const suggestions: SmartSuggestion[] = []
    
    if (lastMessage.toLowerCase().includes("giá")) {
      suggestions.push({
        id: "price-range",
        text: "Tôi muốn tìm trong khoảng giá cụ thể",
        action: () => handleSuggestionClick("Tôi muốn tìm bất động sản trong khoảng giá từ 2-5 tỷ")
      })
    }
    
    if (lastMessage.toLowerCase().includes("khu vực") || lastMessage.toLowerCase().includes("vị trí")) {
      suggestions.push({
        id: "location-specific",
        text: "Tư vấn khu vực cụ thể",
        action: () => handleSuggestionClick("Tư vấn cho tôi về khu vực Quận 7, TP.HCM")
      })
    }
    
    if (lastMessage.toLowerCase().includes("thế chấp") || lastMessage.toLowerCase().includes("vay")) {
      suggestions.push({
        id: "loan-calc",
        text: "Tính lãi suất và số tiền hàng tháng",
        action: () => handleSuggestionClick("Tính toán khoản vay 3 tỷ trong 20 năm")
      })
    }
    
    // Default suggestions
    if (suggestions.length === 0) {
      suggestions.push(
        {
          id: "more-info",
          text: "Cho tôi biết thêm chi tiết",
          action: () => handleSuggestionClick("Bạn có thể giải thích chi tiết hơn không?")
        },
        {
          id: "examples",
          text: "Cho tôi xem ví dụ",
          action: () => handleSuggestionClick("Bạn có thể cho tôi xem một số ví dụ cụ thể?")
        }
      )
    }
    
    return suggestions
  }

  const handleSuggestionClick = (message: string) => {
    setInputValue(message)
    handleSendMessage(message)
  }

  const simulateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const lowerMessage = userMessage.toLowerCase()
    
    // Smart responses based on user input
    if (lowerMessage.includes("tìm") && (lowerMessage.includes("nhà") || lowerMessage.includes("bất động sản"))) {
      return "Tôi sẽ giúp bạn tìm kiếm bất động sản phù hợp! Bạn có thể cho tôi biết:\n\n🏠 Loại hình: Chung cư, nhà phố, biệt thự\n💰 Ngân sách: Khoảng giá mong muốn\n📍 Khu vực: Quận/huyện ưa thích\n🛏️ Diện tích: Số phòng ngủ, diện tích\n\nVí dụ: \"Tôi muốn tìm chung cư 2-3 phòng ngủ ở Quận 7, giá từ 3-5 tỷ\""
    }
    
    if (lowerMessage.includes("thế chấp") || lowerMessage.includes("vay") || lowerMessage.includes("tính toán")) {
      return "Tôi sẽ giúp bạn tính toán khoản vay thế chấp! 💰\n\nĐể tính toán chính xác, tôi cần:\n🏷️ Giá trị bất động sản\n💵 Số tiền vay dự kiến\n📅 Thời hạn vay (năm)\n📈 Lãi suất ưu đãi\n\nVí dụ: \"Nhà 4 tỷ, vay 3 tỷ, 20 năm, lãi suất 8.5%\"\n\n*Lưu ý: Đây chỉ là tính toán ước tính, lãi suất thực tế có thể thay đổi theo chính sách ngân hàng."
    }
    
    if (lowerMessage.includes("khu vực") || lowerMessage.includes("vị trí") || lowerMessage.includes("đầu tư")) {
      return "Tư vấn khu vực đầu tư bất động sản! 🗺️\n\n🌟 **Khu vực HOT hiện tại:**\n• Quận 7: Phú Mỹ Hưng, Sunrise City\n• Quận 2: Thủ Thiêm, Sala\n• Quận 9: Vincity, Vinhomes Grand Park\n• Bình Dương: Dĩ An, Thuận An\n• Đồng Nai: Biên Hòa, Long Thành\n\n📈 **Tiềm năng tăng giá:** Metro, hạ tầng, quy hoạch\n🏫 **Tiện ích:** Trường học, bệnh viện, shopping\n🚗 **Giao thông:** Kết nối trung tâm\n\nBạn quan tâm khu vực nào cụ thể?"
    }
    
    if (lowerMessage.includes("thị trường") || lowerMessage.includes("giá") || lowerMessage.includes("xu hướng")) {
      return "Báo cáo thị trường BĐS Q4/2024! 📊\n\n📈 **Xu hướng giá:**\n• Chung cư: Tăng 3-5% so với đầu năm\n• Nhà phố: Ổn định, tăng nhẹ 2-3%\n• Biệt thự: Tăng mạnh 8-12% tại khu vực trung tâm\n\n🔥 **Phân khúc HOT:**\n• Căn hộ 2-3PN: 2-4 tỷ\n• Shophouse: Đầu tư cho thuê\n• Bất động sản nghỉ dưỡng: Phú Quốc, Đà Nẵng\n\n💡 **Dự báo 2025:** Thị trường sẽ phục hồi mạnh với nhiều dự án mới được cấp phép."
    }
    
    if (lowerMessage.includes("liên hệ") || lowerMessage.includes("tư vấn") || lowerMessage.includes("gặp")) {
      return "Tôi sẽ kết nối bạn với đội ngũ chuyên gia! 👨‍💼\n\n📞 **Hotline 24/7:** 1900-1234\n📧 **Email:** tuvan@reviewnhathat.com\n🏢 **Văn phòng:** 123 Nguyễn Huệ, Q1, TP.HCM\n\n⭐ **Dịch vụ miễn phí:**\n• Tư vấn thị trường\n• Định giá bất động sản\n• Hỗ trợ pháp lý\n• Đi xem nhà cùng chuyên gia\n\nBạn muốn được gọi lại trong thời gian nào?"
    }
    
    if (lowerMessage.includes("đặt lịch") || lowerMessage.includes("xem nhà") || lowerMessage.includes("hẹn")) {
      return "Đặt lịch xem nhà thành công! 📅\n\n🏠 **Quy trình xem nhà:**\n1️⃣ Chọn thời gian phù hợp\n2️⃣ Chuyên gia sẽ gọi xác nhận\n3️⃣ Đi xem nhà cùng tư vấn viên\n4️⃣ Báo cáo chi tiết về bất động sản\n\n⏰ **Khung giờ có sẵn:**\n• Sáng: 8h-11h30\n• Chiều: 14h-17h30\n• Cuối tuần: 8h-18h\n\n🎁 **Ưu đãi:** Miễn phí tư vấn và báo cáo thị trường khi đặt lịch hôm nay!"
    }
    
    // Default intelligent response
    return "Cảm ơn bạn đã liên hệ! Tôi đã ghi nhận yêu cầu của bạn. Để có thể hỗ trợ tốt nhất, bạn có thể:\n\n🤖 Sử dụng các gợi ý phía dưới\n📞 Gọi hotline: 1900-1234\n💬 Chat trực tiếp với chuyên gia\n📧 Gửi email chi tiết\n\nTôi luôn sẵn sàng hỗ trợ bạn 24/7! 😊"
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Generate smart suggestions based on user message
    const suggestions = generateSuggestions(text)
    setCurrentSuggestions(suggestions)

    try {
      const botResponse = await simulateBotResponse(text)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      
      // Update suggestions after bot response
      setTimeout(() => {
        const newSuggestions = generateSuggestions(botResponse)
        setCurrentSuggestions(newSuggestions)
      }, 500)

    } catch (error) {
      console.error("Error getting bot response:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ hotline 1900-1234 để được hỗ trợ trực tiếp.",
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, you would integrate with Web Speech API
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false)
        setInputValue("Tôi muốn tìm căn hộ 2 phòng ngủ ở Quận 7")
      }, 3000)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.message)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(messages.filter(m => m.sender === "bot").length - 1)
    } else {
      setUnreadCount(0)
    }
  }, [isOpen, messages])

  const chatbotIcon = (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative"
    >
      <Button
        onClick={() => setIsOpen(true)}
        className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <motion.div
          animate={{ 
            rotate: isRecording ? [0, -10, 10, -10, 0] : 0,
            scale: isRecording ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            duration: 0.5, 
            repeat: isRecording ? Number.POSITIVE_INFINITY : 0 
          }}
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </motion.div>
      </Button>
      
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
        >
          {unreadCount}
        </motion.div>
      )}
      
      {/* Pulse animation for attention */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-30"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  )

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`bg-white rounded-2xl shadow-2xl border border-gray-200 ${
                isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
              } flex flex-col overflow-hidden`}
            >
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Assistant</h3>
                    <p className="text-xs opacity-90">ReviewNhaThat Support</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-white hover:bg-white/20 h-8 w-8"
                      >
                        {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isMinimized ? "Mở rộng" : "Thu nhỏ"}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:bg-white/20 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Đóng chat</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  {/* Quick Actions */}
                  <div className="px-4 py-3 bg-gray-50 border-b">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                      {quickActions.map((action) => (
                        <Button
                          key={action.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action)}
                          className="flex items-center gap-2 whitespace-nowrap min-w-fit hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        >
                          {action.icon}
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[400px] p-4">
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex ${
                              message.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                message.sender === "user"
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {message.sender === "bot" ? (
                                  <Bot className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <User className="h-4 w-4" />
                                )}
                                <span className="text-xs opacity-70">
                                  {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {message.text}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
                              <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-blue-600" />
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-xs text-gray-500 ml-2">Đang trả lời...</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>

                  {/* Smart Suggestions */}
                  {currentSuggestions.length > 0 && (
                    <div className="px-4 py-2 bg-gray-50 border-t">
                      <div className="flex flex-wrap gap-2">
                        {currentSuggestions.map((suggestion) => (
                          <Button
                            key={suggestion.id}
                            variant="ghost"
                            size="sm"
                            onClick={suggestion.action}
                            className="text-xs bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200"
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            {suggestion.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="Nhập tin nhắn của bạn..."
                          className="pr-12 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={toggleRecording}
                          className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full ${
                            isRecording ? "bg-red-100 text-red-600" : "hover:bg-gray-100"
                          }`}
                        >
                          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim()}
                        className="rounded-full h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                {chatbotIcon}
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Trò chuyện với AI Assistant</p>
              </TooltipContent>
            </Tooltip>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
} 