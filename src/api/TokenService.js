class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("access_token"));
        return user?.token;
    }

    updateLocalAccessToken(token, data) {
        let user = JSON.parse(localStorage.getItem("access_token"));
        user.token = token;
        user.refreshToken = data.refreshToken;
        user.expiration = data.expiration;
        user.userName = data.userName;
        //
        localStorage.setItem("user", JSON.stringify(user));
    }
    // edit 02.12.2022: ko dung
    updateLocalRefreshTokenObj(token) {
        let user = JSON.parse(localStorage.getItem("auth"));
        //user.token = token.accessToken;
        user.refreshToken = token.refreshToken;
        user.userName = token.userName;
        localStorage.setItem("user", JSON.stringify(user));
    }
    getUser() {
        return JSON.parse(localStorage.getItem("auth"));
    }

    setUser(user) {
        //console.log(JSON.stringify(user));
        localStorage.setItem("auth", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("auth");
    }
}

export default new TokenService();
