import Error from 'next/error'
import { Link } from 'nextra-theme-docs';
 
const title  =  "Comfort yourself with a kitten";

export async function getServerSideProps() {
    const URL=  "https://api.thecatapi.com/v1/images/search?size=full"
    const key = "56a4f1cc-7f60-468d-9dba-e4b6f04b7c7d" // See https://stackoverflow.com/questions/21939713/hide-api-key-for-a-github-page
        
    // CAT
    let response = await fetch(URL, { headers: { "x-api-key": key,  }, });
    const errorCode = response.ok ? false : response.status
    let cat = await response.json()
    cat = cat[0].url

    const quoteUrl =  "https://api.quotable.io/random";
    const quoteRes = await fetch(quoteUrl);
    const errorCodeQuote = quoteRes.ok ? false : quoteRes.status
    const data = await quoteRes.json();
    let quote = data.content;
    //console.log(quote);
    let author = data.author;
   
    return {
      props: { errorCode, cat, quote, author, errorCodeQuote },
    }
  }
   
  export default function Page({ errorCode, cat, quote, author, errorCodeQuote }) {
    if (errorCode) {
      return <Error statusCode={errorCode} />
    }
   
    if (errorCodeQuote) {
      return <Error statusCode={errorCodeQuote} />
    }
  
    return (<div>
      <h2>{title}</h2>
      <em>It appears you have stumbled onto the dark hole page of this website.</em> 
      This page was built to catch the wanderers who have gone astray. 
      <br/>;
      <img src={cat} alt="random cat"/>
      <div id="quote">
        { quote }
      </div>
      <div id="author">
        { author }
      </div>
      <Link href="/">Go to the home page</Link>

    </div>)
  }