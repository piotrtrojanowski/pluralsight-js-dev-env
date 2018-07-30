import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe ("Our first test", () => {
	it('should pass', () => {
	expect(1==1).to.equal(true);
	});
});

describe('index.html', () => {
	it('should say hello', (done) => {
		const indexFile = fs.readFileSync('./src/index.html', "utf-8");
		jsdom.env(indexFile, function(err, window){
			const h1 = window.document.getElementsByTagName('h1')[0];
			expect(h1.innerHTML).to.equal('Hello World!');
			done();
			window.close();
		});
	})
})

