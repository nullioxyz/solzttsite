import { useEffect, useState, useRef, lazy } from "react"
import axios from '@/Services/requests'
import { Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useTranslation } from 'react-i18next';

const LazyImageModalComponent = lazy(() => import('@/Components/Site/Components/ImageToModal'))

export default function Works() {
  const boxRefs = useRef([]);

  const [portfolio, setPortfolio] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [newItems, setNewItems] = useState([]);

  const { t } = useTranslation();

  const handlePortfolio = async () => {
    setLoadingMore(true);

    const response = await axios.get(pagination.next_page_url ?? route('site.portfolio'));

    if (response.data) {
      const { data, first_page, current_page, last_page, next_page_url } = response.data.portfolio;

      setNewItems(data);
      setPortfolio(prevPortfolio => [...prevPortfolio, ...data]);

      setPagination({
        current_page,
        first_page,
        last_page,
        next_page_url
      });
    }

    setLoadingMore(false);
  };

  const handleLoadMore = async () => {
    handlePortfolio();
  }

  useEffect(() => {
    if (newItems.length > 0) {

      boxRefs.current = boxRefs.current.slice(0, portfolio.length);

      anime({
        targets: boxRefs.current.slice(-newItems.length),
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: (el, i) => i * 100,
      });

      setNewItems([]);

    }

    if (isInitialLoad) {
      handlePortfolio().finally(() => setIsInitialLoad(false));
    }

  }, [newItems, isInitialLoad]);


  return (
    <section id="works" className="flex flex-col justify-between h-auto mt-44 mx-auto p-5 text-black bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="lg:text-left sm:text-center custom:text-center md:text-center">
          <div className="title uppercase">
            <h1 className='text-5xl tracking-tight'>{t('portfolio')}</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-10 mb-24">
          {portfolio.length && portfolio.map((item, index) => (
            <LazyImageModalComponent
              key={index}
              description={item.translation ? item.translation.description : item.default_translation.description}
              coverImage={item.media[0].original_url}
              images={item.media}
              alt={`Image ${index + 1}`}
              reference={el => boxRefs.current[index] = el}
            />
          ))}
        </div>

        {pagination.current_page < pagination.last_page ? (
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase"
              onClick={() => handleLoadMore()}
            >
              {!loadingMore ? t('load_more') : <Spinner />}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}