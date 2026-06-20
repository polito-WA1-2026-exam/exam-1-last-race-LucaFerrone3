export async function login(email, password) {
    const response = await fetch(
        'http://localhost:3001/api/users/login',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }

    return data;
}