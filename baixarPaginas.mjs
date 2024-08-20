import scrape from 'website-scraper';
import path from 'path';


async function downloadWebsite(url) {
  try {
    const siteDomain = new URL(url).hostname;

    await scrape({
      urls: [url],  // URL do site a ser baixado
      directory: path.join(process.cwd(), `paginas/${siteDomain}`),
      sources: [
        { selector: 'img', attr: 'src' }, 
        { selector: 'link[rel="stylesheet"]', attr: 'href' }, 
        { selector: 'script', attr: 'src' }
      ],
      recursive: true,
      maxDepth: 3,
      urlFilter: (link) => {
        return link.startsWith(url) || link.startsWith(`${url}/`);
      },
      // filenameGenerator: 'bySiteStructure',  
      // prettifyUrls: true,
    });

    console.log(`Download completo! A página foi salva no diretório 'paginas/${siteDomain}'.`);
  
  } catch (error) {
    console.error(`Erro ao fazer o download: ${error.message}`);
  }
}

// Exemplo de uso
const websiteURL = 'https://david-marcos-full-stack-developer.vercel.app/';  // Substitua com a URL do site que deseja baixar

downloadWebsite(websiteURL);
