import Joi from "joi";

export const projectSchema = (payload) => {
    const schema = Joi.object({
        userId: Joi.string().required().messages({
            "string.empty": "User Id is reguired",
            "any.required": "User Id is reguired",
        }),
        name: Joi.string().required().messages({
            "string.empty": "Project name is reguired",
            "any.required": "Project name is reguired",
        })
    }).unknown(false);

    const validationResult = schema.validate(payload);
    return validationResult;
}
