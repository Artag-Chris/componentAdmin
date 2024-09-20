interface Send3Parameters2Botoms {
    "messaging_product": "whatsapp",
    "to": string,
    "type": "template",
    "template": {
        "name": "variables",
        "language": {
            "code": "es"
        },
       "components": [
    {
        "type": "body",
        "parameters": [
            {
                "type": "text",
                "text": string
            },
            {
                "type": "text",
                "text": string
            },
            {
                "type": "text",
                "text": string
            },
            {
                "type": "text",
                "text": string
            }
        ]
    },
    {
        "type": "button",
        "sub_type": "quick_reply",
        "index": "0",
        "parameters": {
            "type": "text",
            "text": string
        }
    },
    {
        "type": "button",
        "sub_type": "quick_reply",
        "index": "1",
        "parameters": {
            "type": "text",
            "text": string
        }
    }
]
    }
}