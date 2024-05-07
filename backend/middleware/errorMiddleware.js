// Middleware function to handle requests for routes that are not found
const notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// Middleware function to handle errors that occur in the application
const errorHandler=(err,req,res,next)=>{
    
    let statusCode=res.statusCode===200?500:res.statusCode;
    let message=err.message;

    //check for mongoose bad objectid
    if(err.name==='CastError'&&err.kind==='ObjectId'){
        message=`Resource not found`;
        statusCode=404
    }
   res.status(statusCode).json({
    message,
   })
}

export {notFound,errorHandler}
