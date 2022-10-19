
function pathMatch(pattern: string, path: string) {
    let regStr = ''
    for (let i = 0; i < pattern.length; i++) {
        const ch = pattern[i]
        if ('^$+()[]{}'.includes(ch)) {
            continue
        }
        if (ch === '?') {
            regStr += '[\\S]'
            continue
        }
        if (ch === '*') {
            if (pattern[i + 1] === ch) {
                regStr += `${regStr.at(-1) === '/' ? '?' : '' }[\\S]{0,}`
                i++
            } else {
                regStr += '[^/]{0,}'
            }
            continue
        }
        if (ch === '.') {
            regStr += '\\' + ch
            continue
        }
        regStr += ch
    }
    return new RegExp(`^${regStr}$`).test(path)
}

// function assertTrue(value) { console.log(value === true) }
// function assertFalse(value) { console.log(value === false) }

// assertTrue(pathMatch("/foo/bar/**x{}x[]", "/foo/bar")) ;

// assertTrue(pathMatch("https://jex.im/regulex/", "https://jex.im/regulex/"));
// assertTrue(pathMatch("com/**/*.jsp", "com/abc.jsp"));
// assertTrue(pathMatch("com/{ filename: \\w+ }.jsp", "com/abc.jsp2"));

//  // test exact matching
// assertTrue(pathMatch("test", "test"));
// assertTrue(pathMatch("/test", "/test"));
// assertTrue(pathMatch("http://example.org", "http://example.org")); // SPR-14141
// assertFalse(pathMatch("/test.jpg", "test.jpg"));
// assertFalse(pathMatch("test", "/test"));
// assertFalse(pathMatch("/test", "test"));
// // test matching with ?'s
// assertTrue(pathMatch("t?st", "test"));
// assertTrue(pathMatch("??st", "test"));
// assertTrue(pathMatch("tes?", "test"));
// assertTrue(pathMatch("te??", "test"));
// assertTrue(pathMatch("?es?", "test"));
// assertFalse(pathMatch("tes?", "tes"));
// assertFalse(pathMatch("tes?", "testt"));
// assertFalse(pathMatch("tes?", "tsst"));
// // test matching with *'s
// assertFalse(pathMatch("*.*", "tsttst"));
// assertTrue(pathMatch("*", "test"));
// assertTrue(pathMatch("test*", "test"));
// assertTrue(pathMatch("test*", "testTest"));
// assertTrue(pathMatch("test/*", "test/Test"));
// assertTrue(pathMatch("test/*", "test/t"));
// assertTrue(pathMatch("test/*", "test/"));
// assertTrue(pathMatch("*test*", "AnothertestTest"));
// assertTrue(pathMatch("*test", "Anothertest"));
// assertTrue(pathMatch("*.*", "test."));
// assertTrue(pathMatch("*.*", "test.test"));
// assertTrue(pathMatch("*.*", "test.test.test"));
// assertTrue(pathMatch("test*aaa", "testblaaaa"));
// assertFalse(pathMatch("test*", "tst"));
// assertFalse(pathMatch("test*", "tsttest"));
// assertFalse(pathMatch("test*", "test/"));
// assertFalse(pathMatch("test*", "test/t"));
// assertFalse(pathMatch("test/*", "test"));
// assertFalse(pathMatch("*test*", "tsttst"));
// assertFalse(pathMatch("*test", "tsttst"));
// assertFalse(pathMatch("test*aaa", "test"));
// assertFalse(pathMatch("test*aaa", "testblaaab"));
// // test matching with ?'s and /'s
// assertTrue(pathMatch("/?", "/a"));
// assertTrue(pathMatch("/?/a", "/a/a"));
// assertTrue(pathMatch("/a/?", "/a/b"));
// assertTrue(pathMatch("/??/a", "/aa/a"));
// assertTrue(pathMatch("/a/??", "/a/bb"));
// assertTrue(pathMatch("/?", "/a"));
// // test matching with **'s
// assertTrue(pathMatch("/foo/bar/**", "/foo/bar")) ;
// assertTrue(pathMatch("/**", "/testing/testing"));
// assertTrue(pathMatch("/*/**", "/testing/testing"));
// assertTrue(pathMatch("/**/*", "/testing/testing"));
// assertTrue(pathMatch("/bla/**/bla", "/bla/testing/testing/bla"));
// assertTrue(pathMatch("/bla/**/bla", "/bla/testing/testing/bla/bla"));
// assertTrue(pathMatch("/**/test", "/bla/bla/test"));
// assertTrue(pathMatch("/bla/**/**/bla", "/bla/bla/bla/bla/bla/bla"));
// assertTrue(pathMatch("/bla*bla/test", "/blaXXXbla/test"));
// assertTrue(pathMatch("/*bla/test", "/XXXbla/test"));
// assertFalse(pathMatch("/bla*bla/test", "/blaXXXbl/test"));
// assertFalse(pathMatch("/*bla/test", "XXXblab/test"));
// assertFalse(pathMatch("/*bla/test", "XXXbl/test"));
// assertFalse(pathMatch("/????", "/bala/bla"));
// assertFalse(pathMatch("/**/*bla", "/bla/bla/bla/bbb"));
// assertTrue(pathMatch("/*bla*/**/bla/**", "/XXXblaXXXX/testing/testing/bla/testing/testing/"));
// assertTrue(pathMatch("/*bla*/**/bla/*", "/XXXblaXXXX/testing/testing/bla/testing"));
// assertTrue(pathMatch("/*bla*/**/bla/**", "/XXXblaXXXX/testing/testing/bla/testing/testing"));
// assertTrue(pathMatch("/*bla*/**/bla/**", "/XXXblaXXXX/testing/testing/bla/testing/testing.jpg"));
// assertTrue(pathMatch("*bla*/**/bla/**", "XXXblaXXXX/testing/testing/bla/testing/testing/"));
// assertTrue(pathMatch("*bla*/**/bla/*", "XXXblaXXXX/testing/testing/bla/testing"));
// assertTrue(pathMatch("*bla*/**/bla/**", "XXXblaXXXX/testing/testing/bla/testing/testing"));
// assertFalse(pathMatch("*bla*/**/bla/*", "XXXblaXXXX/testing/testing/bla/testing/testing"));
// assertFalse(pathMatch("/x/x/**/bla", "/x/x/x/"));
// assertTrue(pathMatch("", ""));

