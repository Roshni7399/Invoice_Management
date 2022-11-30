const config = {
    local: {
        DB: {
            HOST: "172.10.1.3",
            PORT: "27017",
            DATABASE: "roshnimanmode",
            MONGOOSE: {
                userunifiedtopology: true,
                useNewurlparser: true

            },
            USERNAME: "roshnimanmode",
            PASSWORD: "roshnimanmode45",
        },
        PORTNO: 7896,
    },
        staging: {
            DB: {
                HOST: "172.10.1.3",
                PORT: "27017",
                DATABASE: "roshnimanmode",
                MONGOOSE: {
                    userunifiedtopology: true,
                    useNewurlparser: true

                },
                USERNAME: "roshnimanmode",
                PASSWORD: "roshnimanmode45",

            },
            PORT:7896,
            EMAIL : {
                host: "smtp.gmail.com",
                port:  465,
                user: "roshnimanmode07@gmail.com",
                pass: "tffoxotfvzdkbfxq",
            }
    }
}

export const get = function get(env) {
    return config[env];
}





