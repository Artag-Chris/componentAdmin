



export interface send4Parameters{
    "messaging_product": "whatsapp",
    "to": string, 
    "type": "template",
    "template": {
        "name": "variable4",//aqui se cambia el nombre del template pero debe ser de 4 variables 
        "language": {
            "code": "es"
        },"components":[{
            "type": "body",
            "parameters":[
                {
                "type": "text",
                "text": string
                }, {
                "type": "text",
                "text": string
                }, {
                "type": "text",
                "text": string
                }, {
                "type": "text",
                "text": string
                }
            ]
        }]
    }
}