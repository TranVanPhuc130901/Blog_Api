const app = require("./src/app");

const PORT = process.env.PORT || 3232;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log("Server closed"));
})