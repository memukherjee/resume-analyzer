import axios from 'axios';
import { NextFunction } from 'express';

type AiRes = {
    response: string;
};

export const getResponseFromAi = async (prompt: string, next:NextFunction) => {
    try {
        const response: Axios.AxiosXHR<AiRes> = await axios.post(
            process.env.AI_MODEL_ENDPOINT ?? 'EMPTY AI ENDPOINT',
            {
                model: process.env.AI_MODEL,
                prompt: prompt,
                stream: false,
                format: 'json',
            },
        );

        return response.data.response;
    }
    catch(err) {
        console.error(err)
        next(err as AppError)
    }
};
