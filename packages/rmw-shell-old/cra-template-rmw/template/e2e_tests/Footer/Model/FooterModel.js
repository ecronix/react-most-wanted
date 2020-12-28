import {Selector} from 'testcafe';

export default class Footer {
    constructor() {
        this.footerText = Selector('#footer-text');
    }
}
