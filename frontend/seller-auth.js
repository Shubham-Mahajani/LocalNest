document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if(localStorage.getItem('sellerId')) {
        window.location.href = 'dashboard.html';
    }

    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('login-form');
    const formRegister = document.getElementById('register-form');
    
    // Toggle Tabs
    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    });

    tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    });

    // Handle Registration
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const phone = document.getElementById('reg-phone').value;
        const password = document.getElementById('reg-password').value;
        const pin1 = document.getElementById('reg-pin1').value;
        const pin2 = document.getElementById('reg-pin2').value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, password, pin1, pin2 })
            });
            const data = await res.json();
            
            if(res.ok) {
                formRegister.reset();
                document.getElementById('registration-success').style.display = 'block';
                document.getElementById('seller-id-display').innerText = data.sellerId;
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Cannot connect to server. Ensure backend is running.');
        }
    });

    // Handle Login
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sellerId = document.getElementById('login-id').value.trim();
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sellerId, password })
            });
            const data = await res.json();

            if(res.ok) {
                // Save session in localStorage
                localStorage.setItem('sellerId', data.sellerId);
                localStorage.setItem('sellerName', data.name);
                localStorage.setItem('sellerPhone', data.phone);
                localStorage.setItem('servicePincodes', JSON.stringify(data.servicePincodes || []));
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Cannot connect to server.');
        }
    });
});
