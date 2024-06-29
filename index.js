const express = require('express');
const { chromium } = require('playwright');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('CatBypasser Linkvertise Bypass API');
});

app.get('/bypass', async (req, res) => {
    const link = req.query.link;

    if (!link) {
        return res.status(400).send({ error: 'No link provided' });
    }

    try {
        const bypassedLink = await bypassLinkvertise(link);
        res.send({ bypassedLink });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to bypass link' });
    }
});

async function bypassLinkvertise(link) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        await page.goto(link, { waitUntil: 'networkidle' });

        await page.waitForTimeout(2000);

        const bypassedLink = page.url();
        return bypassedLink;
    } catch (error) {
        throw error;
    } finally {
        await browser.close();
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
