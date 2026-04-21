import { Response, Request, NextFunction } from "express"
import BaseDto from "../dto/base.dto.js"
import ApiError from "../utils/api-error.js"

const validate = (DtoClass : typeof BaseDto) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {data, errors} = DtoClass.validate(req.body)

        if(errors){
            const errorMessage = errors.join("; ")
            throw ApiError.badRequest(errorMessage)
        }

        req.body = data;
        next();
    }
}