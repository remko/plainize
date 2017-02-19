# [plainize](https://el-tramo.be/plainize): Light but powerful HTML to plain text conversion

Convert an HTML string into plain text.

## Caveats

- Currently is still very basic, but can be easily improved upon. 
  I'm implementing this as I need it, or as I receive patches.
  Some things that come to mind:

     - Whitespace isn't always converted consistently.
     - Targets of links aren't converted
     - Lists aren't converted nicely
     - Preformatted text isn't kept preformatted
     - Tables aren't converted nicely
     - ...

- There aren't any options yet. This isn't by design, just because I
  didn't need them yet.

- Currently doesn't work on Node.js out of the box. It's easy to
  do so (it's done for the unit tests), but since [`html-to-text`][html-to-text]
  doesn't have any problems under Node.js, I didn't see the need so far.

I'm happily accepting patches that improves upon this.


## Motivation

Most solutions found online for converting HTML to plaintext simply use regular
expressions to strip tags. This doesn't always work correctly, and even if it
did, such a solution only yields very basic results (inconsistent whitespace,
includes content that shouldn't be included, ...). Moreover, such a solution is
fundamentally hard to improve.

Some other implementations use a combination of the browser's `textContent` and
`innerHTML` DOM properties. Because of varying availability and implementations of 
these properties, these solutions result in unreliable results across browsers.

[`html-to-text`][html-to-text] uses a custom HTML parser to convert to plain text.
This works very well, but the major downside is that it has a lot of
heavy dependencies, weighing in at more than 200kb of uncompressed JavaScript
(±80kb compressed), which isn't convenient in browser environments.


## How it works

Plainize uses the browser's DOM implementation to parse the HTML,
and then iterates over the parsed DOM tree to convert individual elements
into plain text.


## Installation

    yarn add plainize

or

    npm install plainize


## Usage

    
    import plainize from 'plainize';

    // Prints 'This is bold text.'
    console.log(plainize('This is <b>bold</b> text.'));

[html-to-text]: https://www.npmjs.com/package/html-to-text
