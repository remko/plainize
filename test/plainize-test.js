import plainize from '../plainize';
import { expect } from 'chai';

describe('plainize', () => {
	it('should convert <b> tags', () => {
		const result = plainize("This <b>is a</b> test");
		expect(result).to.equal("This is a test");
	});

	it('should skip <script> tags', () => {
		const result = plainize("This <script>is a</script> test");
		expect(result).to.equal("This  test");
	});

	it('should skip <style> tags', () => {
		const result = plainize("This <style>is a</style> test");
		expect(result).to.equal("This  test");
	});

	it('should support nested tags', () => {
		const result = plainize("This <b>is <i>a</i> test</b>.");
		expect(result).to.equal("This is a test.");
	});

	it('should strip newlines', () => {
		const result = plainize("This is a\ntest.");
		expect(result).to.equal("This is a test.");
	});

	it('should strip multiple whitespace', () => {
		const result = plainize("This   is\ta\n  test.");
		expect(result).to.equal("This is a test.");
	});

	it('should support paragraphs', () => {
		const result = plainize("<p>This</p><p>is</p><p>a</p>test.");
		expect(result).to.equal("This\n\nis\n\na\n\ntest.");
	});

	it('should support <br>', () => {
		const result = plainize("This<br>is a test.");
		expect(result).to.equal("This\nis a test.");
	});

	// This test can change
	it('should convert complex HTML', () => {
		const result = plainize(`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">
<html><head><meta name="qrichtext" content="1" /><style type="text/css">
p, li { white-space: pre-wrap; }
</style></head><body style=" font-family:'.SF NS Text'; font-size:13pt; font-weight:400; font-style:normal;">
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">Lorem <span style=" font-weight:600;">ipsum</span> dolor sit amet, </p>
<p align="right" style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">consectetur adipiscing elit, </p>
<p align="center" style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">sed do <span style=" font-style:italic;">eiusmod </span><span style=" font-weight:600; font-style:italic;">tempor</span><span style=" font-style:italic;"> incididunt ut</span> labore et dolore magna aliqua. </p>
<p style="-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;"><br /></p>
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">Ut enim ad minim veniam, <span style=" color:#00b100;">quis</span> nostrud exercitation ullamco laboris </p>
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">nisi ut aliquip ex ea commodo consequat.</p>
<p style="-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;"><br /></p>
<p style="-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;"><br /></p>
<table border="2" cellspacing="0" cellpadding="10">
<tr>
<td>
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">sed</p></td>
<td>
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">ut</p></td></tr>
<tr>
<td>
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">perspiciatis</p></td>
<td>
<p style=" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;">unde</p></td></tr></table></body></html>
`);
		expect(result).to.equal(` Lorem ipsum dolor sit amet, 

 consectetur adipiscing elit, 

 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

 


 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 

 nisi ut aliquip ex ea commodo consequat.

 


 


    sed

  ut

   perspiciatis

  unde

 `);
	});
});


