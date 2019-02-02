const config = {}

config.decisionTree = [
    {
        name: "Vorstand",
        member: [
            { name: "Dr. Bettina Volkens" },
            { name: "Carsten Spohr" },
            { name: "Thorsten Dirks" },
            { name: "Harry Hohmeister" },
            { name: "Ulrik Svensson" },

            { name: "Dr. Detlef Kayser" }
        ],
    },
    {
        name: "Flotte",
        member: [
            {
                name: "Airbus",
                member: [
                    { name: "A380-800" },
                    { name: "A340-600" },
                    { name: "A350-900" },
                    { name: "A340-300" },
                    { name: "A330-300" },
                    { name: "A321-100/200" },
                    { name: "A320NEO" },
                    { name: "A320-200" },
                    { name: "A319-100" }

                ]
            },
            {
                name: "Boeing",
                member: [
                    { name: "747-8" },
                    { name: "747-400" },
                    { name: "BBJ 737-700 IGW" }
                ]
            },
            {
                name: "Bombardier",
                member: [
                    { name: "CR900" }
                ]
            },
            {
                name: "Embraer",
                member: [
                    { name: "195" },
                    { name: "190" }
                ]
            }
        ]
    }
]

config.url = "https://lh-tud-bilderkennung-py.eu-de.mybluemix.net"
// config.url = "http://localhost:8082"


config.header = {
    titleMedialounge: "Media Lounge",
    titleLufthansaGroup: "Lufthansa Group",
    uploadYourPic: "Classify your pictures",
    logo: "./images/logo.png",
}

config.body = {
    DragAndDrop: "DRAG & DROP YOUR FILE HERE",
    BackToMediaLounge: "BACK TO THE LUFTHANSA MEDIALOUNGE",
    BrowseFiles: "...OR BROWSE FILES",
}


export default config