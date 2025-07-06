import { useEffect, useState, useRef, lazy, Suspense } from "react";
import axios from '@/Services/requests';
import { Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useTranslation } from 'react-i18next';
import { useSelectReferences } from '@/Contexts/SelectReferencesContext';
import { Link } from "@inertiajs/react";

const LazyImageModalComponent = lazy(() => import('@/Components/Site/Components/ImageToModal'));

export default function Works({ currentLanguage }) {

  const boxRefs = useRef([]);
  const [portfolio, setPortfolio] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [newItems, setNewItems] = useState([]);

  const { t } = useTranslation();
  const { addAsReference, setSelectedReferences } = useSelectReferences();

  const handlePortfolio = async () => {
    setLoadingMore(true);

    try {
      const response = await axios.get(pagination.next_page_url ?? route('site.portfolio.load', 'lang'));
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
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLoadMore = async () => {
    await handlePortfolio();
  };

  const handleAddAsReference = (item) => {
    
    setSelectedReferences(prevRefs =>
      prevRefs.filter(ref => ref.type !== 'available_design')
    );

    const data = {
      id: item.id,
      image: route('file.index', {locale: 'lang', uuid: item.media[0].uuid}),
      name: item.translation ? item.translation.title : item.default_translation.title,
      type: 'portfolio'
    }

    addAsReference(data);
  };

  useEffect(() => {
    if (isInitialLoad) {
      handlePortfolio().finally(() => setIsInitialLoad(false));
    }
  }, [isInitialLoad]);

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
  }, [newItems, portfolio.length]);

  return (
    <section id="works" className="mx-auto">
      <div className="max-w-[1240px] mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] text-center sm:text-left">
            {t('portfolio')}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-4 mb-24">
          <Suspense fallback={<Spinner />}>
            {portfolio.length > 0 && portfolio.map((item, index) => (
              <LazyImageModalComponent
                key={`portfolio_${item.id}`}
                book={false}
                title={item.translation ? item.translation.title : item.default_translation.title}
                description={item.translation ? item.translation.description : item.default_translation.description}
                coverImage={route('file.index', {locale: 'lang', uuid: item.media[0].uuid})}
                images={item.media}
                onAddReference={() => handleAddAsReference(item)}
                itemId={item.id}
                available={true}
                alt={`Image ${index + 1}`}
                reference={el => boxRefs.current[index] = el}
              />
            ))}
          </Suspense>
        </div>

        {pagination.current_page < pagination.last_page && (
          <div className="flex justify-center mb-10">
            <button
              className="px-6 py-3 bg-[#595954] text-white text-lg hover:bg-[#fff] hover:text-[#595954] transition duration-300 uppercase border-[#595954] border"
              onClick={handleLoadMore}
              disabled={loadingMore}
              aria-label={t('load_more')}
              title={t('load_more')}
            >
              {!loadingMore ? t('load_more') : <Spinner />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
