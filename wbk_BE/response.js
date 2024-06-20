// const response = (statusCode, data, message, res) => {
//     res.json(statusCode, [
//         {
//             payload: data,
//             message,
//             metadata: {
//                 prev: "",
//                 next: "",
//                 current: "",
//             },
//         },
//     ])
// }

// module.exports = response

const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: data,
        message: message,
        metadata: {
            prev: "",
            next: "",
            current: ""
        }
    });
};

module.exports = response;
