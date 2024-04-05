const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
    sign: (user, expire = '15d') => {
        const payload = {
            id: (user?.usId),
            data: user,
        }

        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: expire,
            allowInsecureKeySizes: true
        })
    },
    verify: (token) => {
        let decoded = null;

        try {
            decoded = jwt.verify(token, secret, { algorithm: ['HS256'] });

            return {
                ok: true,
                id: decoded.id,
                data: decoded.data
            }
        }catch (err) {
            return {
                ok: false,
                message: err.message
            }
        }
    }
}