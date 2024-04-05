const {verify} = require('./jwt-util');

const authJWT = (req, res, next) => {
    const token = req.header('boa-authorization')?.split('Bearer ')[1]; // header에서 access token을 가져옵니다.
    // 토큰이 존재하지 않으면 인증 오류를 반환합니다
    if (!token) {
        return res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
    }

    try {
        // JWT 토큰을 검증합니다. 비밀키를 사용하여 토큰을 해독합니다.
        // 요청 객체에 인증된 사용자 정보를 추가합니다.
        req.user = verify(token);
        if(!req.user?.['ok']) return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
        // 다음 미들웨어로 제어를 넘깁니다.
        next();
    } catch (err) {
        // 유효하지 않은 토큰이거나 오류가 발생한 경우 인증 오류를 반환합니다.
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
}
authJWT.optional = function (req, res, next) {
    const token = req.header('boa-authorization')?.split('Bearer ')[1];

    if (!token) {
        return next(); // 토큰이 없으면 다음 미들웨어로 진행
    }

    try {
        req.user = verify(token);
        next();
    } catch (err) {
        next(); // 유효하지 않은 토큰이면 다음 미들웨어로 진행
    }
};

authJWT.systems = function (req, res, next) {
    const token = req.header('boa-authorization')?.split('Bearer ')[1];

    if (!token) {
        return next(); // 토큰이 없으면 다음 미들웨어로 진행
    }

    try {
        req.user = verify(token);
        next();
    } catch (err) {
        next(); // 유효하지 않은 토큰이면 다음 미들웨어로 진행
    }
};

module.exports = authJWT;

