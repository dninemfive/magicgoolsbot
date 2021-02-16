module.exports = {
    // When the body includes this text, the callback should be called
    bodyIncludes: "hi goolsbot",
    callback: ({ msg, logger }) => {
        // Send message and file in response
        msg.channel.send("Hi, I'm GoolsBot!", { files: ["./images/goolsbot.jpg"] })
            .catch((err) => logger.error(err));
    },
}