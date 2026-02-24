import { useEffect, useState, useRef } from "react";
import { router } from '@inertiajs/react';
import axios from '@/Services/requests';
import { Card, Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useTranslation } from 'react-i18next';
import { SkeletonCard } from "@/Components/Skeleton/SkeletonCard";
import { Thumb } from "../Components/Thumb";

export default function Works({ currentLanguage, initialPortfolio }) {

  const boxRefs = useRef([]);
  const initialPortfolioData = Array.isArray(initialPortfolio?.data) ? initialPortfolio.data : [];
  const [portfolio, setPortfolio] = useState(initialPortfolioData);
  const [pagination, setPagination] = useState({
    current_page: initialPortfolio?.current_page ?? 1,
    first_page: initialPortfolio?.first_page ?? 1,
    last_page: initialPortfolio?.last_page ?? 1,
    next_page_url: initialPortfolio?.next_page_url ?? null,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(initialPortfolioData.length === 0);
  const [newItems, setNewItems] = useState([]);
  
  const initialPage = Number(new URLSearchParams(window.location.search).get("page") || 1);

  const { t } = useTranslation();
  const resolvedLocale = currentLanguage?.slug ?? window.location.pathname.split('/').filter(Boolean)[0] ?? 'en';

  const handlePortfolio = async (page = null) => {
    setLoadingMore(true);

    try {
      const hasNextPage = Boolean(pagination.next_page_url);
      const url =
        page !== null
          ? route("site.portfolio.load", { locale: resolvedLocale, page })
          : hasNextPage
            ? pagination.next_page_url
            : route("site.portfolio.load", { locale: resolvedLocale, page: pagination.current_page ?? 1 });

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
    if (isInitialLoad && portfolio.length === 0) {
      handlePortfolio(initialPage).finally(() => setIsInitialLoad(false));
    } else if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, initialPage, portfolio.length]);

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
    <section id="works" className="mx-auto xl:mt-20 lg:mt-20 md:mt-20 sm:mt-5 xs:mt-5 p-[0.5rem]">
      <div className="max-w-[1240px] mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] lg:text-center xl:text-left md:text-center sm:text-center xs:text-center text-center">
            {t('portfolio')}
          </h1>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 xs:grid-cols-3 md:grid-cols-3 gap-x-1 gap-y-1 mb-24">
          {isInitialLoad && portfolio.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk_${i}`} />)
          ) : (
            <>
              {portfolio.length > 0 && portfolio.map((item, index) => (
                <Card
                  key={index}
                  className="
                    relative w-full rounded-none
                    sm:w-full
                    cursor-pointer overflow-hidden
                ">
                  <a
                    href={route('site.portfolio.show', { locale: currentLanguage.slug, slug: item.slug })}
                    className="block"
                  >
                    {/* O aspect ratio vive AQUI */}
                    <div className="relative aspect-[3/4]">
                      {/* O conteúdo preenche a caixa 4:4 */}
                      <Thumb
                        uuid={item.media[0].uuid}
                        alt={item.translation ? item.translation.title : item.default_translation.title}
                        className="absolute inset-0"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                      />
                    </div>
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
