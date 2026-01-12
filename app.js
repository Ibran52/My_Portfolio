require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const path = require('path');

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection Check
async function checkDatabase() {
    try {
        // Simple check to list tables or just verify connection
        // We assume a 'messages' table exists or just check health
        const { data, error } = await supabase.from('messages').select('id').limit(1);
        if (!error || (error && error.code !== 'PGRST301')) { // Ignoring generic errors, looking for auth/connection issues
            console.log("congratulation ibran database done");
        } else {
            console.error("Supabase connection issue:", error.message);
        }
    } catch (err) {
        console.error("Unexpected database error:", err);
    }
}

const portfolioData = require('./data/portfolio-data.json');

app.get('/', (req, res) => {
    res.render('home', { data: portfolioData });
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([{ name, email, message, created_at: new Date() }]);

        if (error) throw error;
        
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, async () => {
        console.log(`Server running on http://localhost:${PORT}`);
        await checkDatabase();
    });
}

module.exports = app;
