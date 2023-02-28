const validateJoi = (schema) => {
    return async (req, res, next) => {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            res.status(422).json({
                status: false,
                message:
                    `Validation error: ${error.details
                        .map((x) => x.message)
                        .join(', ')}` || 'Validation Error',
            });
        } else {
            req.body = value;
            next();
        }
    };
};

module.exports = validateJoi;
