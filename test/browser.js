import { mocha } from 'mocha';
mocha.setup('bdd');
require('./index');
mocha.checkLeaks();
mocha.run();
