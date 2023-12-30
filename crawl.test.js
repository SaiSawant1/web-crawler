const {normalizeURL,getURLsFromHTML}=require("./crawl.js")
const {test,expect}=require("@jest/globals")


test("normalizeURL strip protocol",()=>{
    const input="https://blog.boot.dev/path"
    const actual=normalizeURL(input)
    const expected="blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("normalizeURL trailing slash",()=>{
    const input="https://blog.boot.dev/path/"
    const actual=normalizeURL(input)
    const expected="blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("normalizeURL capitals",()=>{
    const input="https://BLOG.boot.dev/path"
    const actual=normalizeURL(input)
    const expected="blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("normalizeURL strip http",()=>{
    const input="http://BLOG.boot.dev/path"
    const actual=normalizeURL(input)
    const expected="blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML absolute urls",()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="https://blog.bot.dev">
                blog
            </a>
        </body>
    </html>  
    `
    const inputBaseURL="https://blog.bot.dev"
    const actual=getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected=['https://blog.bot.dev/']
    expect(actual).toEqual(expected)

})

test("getURLsFromHTML relative urls",()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="/path/">
                blog
            </a>
        </body>
    </html>  
    `
    const inputBaseURL="https://blog.bot.dev"
    const actual=getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected=['https://blog.bot.dev/path/']
    expect(actual).toEqual(expected)

})

test("getURLsFromHTML both",()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="/path/">
                blog
            </a>
            <a href="https://blog.bot.dev">
                blog
            </a>
        </body>
    </html>  
    `
    const inputBaseURL="https://blog.bot.dev"
    const actual=getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected=['https://blog.bot.dev/path/','https://blog.bot.dev/']
    expect(actual).toEqual(expected)

})
test("getURLsFromHTML invalid",()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="invalid">
                blog
            </a>
        </body>
    </html>  
    `
    const inputBaseURL="https://blog.bot.dev"
    const actual=getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected=[]
    expect(actual).toEqual(expected)

})