import { useEffect, useState, useRef } from "react";
import { router } from '@inertiajs/react';
import axios from '@/Services/requests';
import { Card, Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useTranslation } from 'react-i18next';
import { SkeletonCard } from "@/Components/Skeleton/SkeletonCard";
import { Thumb } from "../Components/Thumb";

export default function Works({ currentLanguage }) {

  const boxRefs = useRef([]);
  const [portfolio, setPortfolio] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [newItems, setNewItems] = useState([]);
  
  const initialPage = new URLSearchParams(window.location.search).get("page") || 1;

  const { t } = useTranslation();

  const handlePortfolio = async (page = null) => {
    setLoadingMore(true);

    try {
      const url =
        page !== null
          ? route("site.portfolio.load", { locale: "lang", page })
          : pagination.next_page_url ?? route("site.portfolio.load", { lang: "lang" });

      const response = await axios.get(url);

      if (response.data) {
        const {
          data,
          first_page,
          current_page,
          last_page,
          next_page_url,
        } = response.data.portfolio;

        setNewItems(data);

        setPortfolio(prevPortfolio => {
          // evita duplicados
          const merged = [...prevPortfolio, ...data];
          return Array.from(new Map(merged.map(item => [item.id, item])).values());
        });

        setPagination({
          current_page,
          first_page,
          last_page,
          next_page_url,
        });

        router.get(
          window.location.pathname + `?page=${current_page}`,
          {},
          {
            replace: true,
            preserveScroll: true,
            preserveState: true,
          }
        );
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

  useEffect(() => {
    if (isInitialLoad) {
      handlePortfolio(initialPage).finally(() => setIsInitialLoad(false));
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
    <section id="works" className="mx-auto xl:mt-20 lg:mt-20 md:mt-20 sm:mt-5 xs:mt-5 p-5">
      <div className="max-w-[1240px] mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] lg:text-center xl:text-left md:text-center sm:text-center xs:text-center text-center">
            {t('portfolio')}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-4 mb-24">
          {isInitialLoad && portfolio.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk_${i}`} />)
          ) : (
            <>
              {portfolio.length > 0 && portfolio.map((item, index) => (
                <Card
                  key={index}
                  className="
                    relative w-full rounded-none 
                    aspect-[3/4]
                    lg:h-[800px] xl:h-[800px] 
                    sm:w-full
                    cursor-pointer overflow-hidden
                ">
                  <a href={route('site.portfolio.show', { locale: currentLanguage.slug, slug: item.slug })}>
                    
                    <Thumb
                      uuid={item.media[0].uuid}
                      alt={item.translation ? item.translation.title : item.default_translation.title}
                      className={`w-full h-auto`}
                      loading="lazy"
                      />
                  
                  </a>
                </Card>
              ))}
            </>
          )}
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
