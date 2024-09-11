import { Phone, MessageCircle } from 'lucide-react'

// Helper function to format phone numbers
const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
  }
  return phoneNumber
}

// Helper function to open WhatsApp chat
const openWhatsAppChat = (phoneNumber: string) => {
  const url = `https://wa.me/${phoneNumber}`
  window.open(url, '_blank')
}

const contacts = [
  { id: 1, name: 'John Doe', phoneNumber: '5511987654321' },
  { id: 2, name: 'Jane Smith', phoneNumber: '5521976543210' },
  { id: 3, name: 'Alice Johnson', phoneNumber: '5531965432109' },
  { id: 4, name: 'Bob Williams', phoneNumber: '5541954321098' },
  { id: 5, name: 'Eva Brown', phoneNumber: '5551943210987' },
]

export default function WhatsAppWeb() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-500 text-white p-4">
          <h1 className="text-2xl font-bold">WhatsApp Web</h1>
        </div>
        <ul className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <li key={contact.id} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
              <button
                onClick={() => openWhatsAppChat(contact.phoneNumber)}
                className="w-full text-left flex items-center space-x-3"
                aria-label={`Open WhatsApp chat with ${contact.name}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                  <p className="text-sm text-gray-500 truncate">{formatPhoneNumber(contact.phoneNumber)}</p>
                </div>
                <div className="flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}