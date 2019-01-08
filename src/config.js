const config={}

config.decisionTree=[{
    Ebene1:[
        {
            name:"Vorstand",
            member:[    
                {name: "Carsten Spohr"},
                {name: "Thorsten Dirks"},
                {name: "Harry Hohmeister"},
                {name: "Ulrik Svensson"},
                {name: "Dr. Bettina Volkens"},
                {name: "Dr. Detlef Kayser"}
            ],
        },
        {
            name:"Flotte",
            member:[
                {name: "Airbus"},
                {name: "Boeing"},
                {name: "Bombardier"},
                {name: "Embraer"}
                // {name: "Airbus 380-800"},
                // {name: "Airbus A340-600"},
                // {name: "Airbus A350-900"},
                // {name: "Airbus A340-300"},
                // {name: "Airbus A330-300"},
                // {name: "Airbus A321-100/200"},
                // {name: "Airbus A320NEO"},
                // {name: "Airbus A320-200"},
                // {name: "Airbus A319-100"},
                // {name: "Boeing 747-8"},
                // {name: "Boeing 747-400"},
                // {name: "Boeing BBJ 737-700 IGW"},
                // {name: "Bombardier CR900"},
                // {name: "Embraer 195"},
                // {name: "Embraer 190"}
            ]
        } 
    ],
    Ebene2:[

        {
            name: "Airbus",
            member: [
                {name: "A380-800"},
                {name: "A340-600"},
                {name: "A350-900"},
                {name: "A340-300"},
                {name: "A330-300"},
                {name: "A321-100/200"},
                {name: "A320NEO"},
                {name: "A320-200"},
                {name: "A319-100"}

            ]
        },

         {
            name: "Boeing",
            member: [
                {name: "747-8"},
                {name: "747-400"},
                {name: "BBJ 737-700 IGW"}
            ]
        },

         {
            name: "Bombardier",
            member: [
                {name: "CR900"}
            ]
        },

         {
            name: "Embraer",
            member: [
                {name: "195"},
                {name: "190"}
            ]
        }

    ]
}]

config.header={
    title: "Media Lounge",
    title2: "Lufthansa Group",
    heading: "Upload your picture...",
    logo: "./images/logo.png",
}

config.body={
    DragAndDrop: "DRAG & DROP YOUR FILE HERE",
    BackToMediaLounge: "BACK TO THE LUFTHANSA MEDIALOUNGE",
    BrowseFiles: "...OR BROWSE FILES",
}


export default config