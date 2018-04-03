export default function fetchConfig(token) {
    return fetch("/config", {
                headers: {
                    "x-access-token": token
                }
            })
            .then(resp => {
                if (resp.status === 403) {
                    throw new Error("No configuration");
                }
                
                if (!resp.ok) {
                    throw new Error("Response is not ok");
                }

                return resp.json();
            });
}