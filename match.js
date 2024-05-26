const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint para encontrar jogos em comum entre usuários
app.get('/match', (req, res) => {
    const { userId } = req.query;

    // Consulta ao banco de dados para obter os jogos favoritos do usuário atual
    db.query('SELECT jogos_favoritos FROM usuarios WHERE id = ?', [userId], (err, userGames) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar os jogos do usuário.' });
        }

        const currentUserGames = userGames[0].jogos.split(','); // Convertendo para array

        // Consulta ao banco de dados para encontrar outros usuários com jogos em comum
        db.query('SELECT id, jogos FROM usuarios WHERE id != ?', [userId], (err, allUsers) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao buscar outros usuários.' });
            }

            // Itera sobre todos os usuários para encontrar matches
            const matches = [];
            allUsers.forEach(user => {
                const userGames = user.jogos_favoritos.split(','); // Convertendo para array
                const commonGames = userGames.filter(game => currentUserGames.includes(game));

                if (commonGames.length > 0) {
                    matches.push({ id: user.id, commonGames });
                }
            });

            res.json({ userId, matches });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
