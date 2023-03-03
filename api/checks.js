const models = require("../models");

const checkParam = (req, res, next) => {
    switch (req.route.path) {
        case "/scores/:id":
            if (request.method === "POST") {
                if (req.body.score ?? null === null) {
                    return res.status("400").json({ error: "Введіть id домену" });
                }
                if (req.body.ip ?? null === null) {
                    return res.status("400").json({ error: "Відбулася помилка визначення вашої IP адреси, спробуйте відключити VPN, proxy тощо" });
                }
            }
            break;
        case "/websites":
            if (req.method === "POST") {
                if (req.body.domain ?? null === null) {
                    return res.status("400").json({ error: "Введіть домен" });
                }
            }
            break;
        default:
            break;
    }
    /**
     * Ensure the next middleware function is called.
     */
    next();
}

module.exports = {
    checkParam
}