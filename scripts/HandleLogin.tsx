interface DataResponse{
        msg: string;
        access_token:string;
        user: object;
}

const handleLogin = async () => {
        try {
            const res = await fetch("http://10.0.0.45:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                const token = data.access_token;
                const user = data.user;
                login(user, token)
                navigation.navigate("Root");
            } else {
                alert(data.msg || "Login failed");
            }
        } catch (err) {
            console.error("Error caught in handleLogin:", {
                name: err?.name,
                message: err?.message,
                stack: err?.stack,
                full: JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
            });

            alert(`Server error: ${err?.message || "Unknown error"}`);
        }
    };
