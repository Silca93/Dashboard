import React, { useEffect, useState } from 'react';

export default function NewsData() {
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=cae85178adf9412ebd124df5fa615fb9');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                
                const validArticles = data.articles.filter(article => 
                    article && article.content && article.urlToImage && article.url
                );
                setArticle(validArticles);

                console.log(data);
                // setArticle(data.articles)
                console.log(validArticles);
           
                

            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message)
            } finally {
                setLoading(false)
            }
        };
        getNews();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const displayedArticles = article.slice(0, 10);

return (
    <div className='w-[80%] h-[90%] bg-zinc-100 rounded-xl bg-opacity-55 flex flex-col gap-2 justify-center items-center'>
        <div className='w-[36rem] h-[30rem]  flex flex-col gap-2 justify-start items-center overflow-y-scroll overflow-x-hidden scrollable'>
            {displayedArticles.map((item, key) => (
                <a href={item.url} target="_blank">

                    <div key={key} className='w-[35rem] h-[9rem] bg-[#ffffff] bg-opacity-30 p-2 rounded-xl flex justify-center items-center'>
                        <div className="flex gap-2 w-full h-[10rem]  justify-center items-center">
                            <div className='left w-[10rem] h-full  flex justify-center items-center'>
                                <img 
                                    src={item.urlToImage} 
                                    alt={item.title} 
                                    width="100%" 
                                    className='object-cover'
                                    onError={(e) => {
                                        e.target.src = 'placeholder-image-url'; 
                                        e.target.onerror = null; 
                                    }}
                                />
                            </div>
                            <div className='right w-[30rem] h-[80%]  flex flex-col justify-center items-center'>
                                <h1 className='font-bold text-sm'>{item.title}</h1>
                                <p className='text-sm'>{item.content.slice(0, 160)}...</p>
                            </div>
                        </div>
                    </div>
                </a>
                ))
            }
        </div>
    </div>
)
}
