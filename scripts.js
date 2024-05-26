document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        email: document.getElementById('email').value,
        idade: document.getElementById('idade').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value,
        jogo: document.getElementById('Jogo').value
    
    };
   
    try {
        const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

        const result = await response.text();
        document.getElementById('message').innerText = result;
    } catch (error) {
        console.log('Error:', error);
        document.getElementById('message').innerText = 'Error registering user!';
    }
    
});

function showDescription(id) {
  const descriptions = document.querySelectorAll('.description');
  descriptions.forEach(description => {
    description.style.display = 'none';
  });
  const element = document.getElementById(id);
  if (element) {
    element.style.display = 'block';
  }
}




    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            email: document.getElementById('email').value,
            senha: document.getElementById('password').value,
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.text();
            document.getElementById('message').innerText = result;
        } catch (error) {
            console.log('Error:', error);
            document.getElementById('message').innerText = 'Error logging in!';
        }
    });


