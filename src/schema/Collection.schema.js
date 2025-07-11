import Joi from "joi";

export const collectionSchema = (payload) => {
  const schema = Joi.object({
    projectId: Joi.string().required().messages({
      "string.empty": "projectId id is required",
      "any.required": "projectId id is required"
    }),
    collectionName: Joi.string().required().messages({
      "string.empty": "collection name is required",
      "any.required": "collection is required"
    }),
    documents: Joi.array().items(
      Joi.object().unknown(true) // allow any key-value shape
    ).optional()


  })
  return schema.validate(payload, { abortEarly: false });
}