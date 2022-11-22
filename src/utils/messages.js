const mensagges={}

mensagges.messageGeneral=(res, statusCode, ok, data, message) =>{
    res.status(statusCode).json({
        ok,
        data,
        message,
    })
}

export default mensagges