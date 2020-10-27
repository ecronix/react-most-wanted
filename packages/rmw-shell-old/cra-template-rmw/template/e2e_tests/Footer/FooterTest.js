require('dotenv').config();
import FOOTER from './Model/FooterModel';

fixture`TEST: Footer`.page`${process.env.E2E_URL}`;

const Footer = new FOOTER();
test(
    'Footer exists', async t => {
        await t
            .expect(Footer.footerText.exists)
            .ok();
    }
);
