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
  const initialPageFromUrl = Number(new URLSearchParams(window.location.search).get("page") || 1);
  const initialPage = Number.isFinite(initialPageFromUrl) && initialPageFromUrl > 0 ? initialPageFromUrl : 1;
  const shouldRehydratePages = initialPage > 1;
  const initialPortfolioData = Array.isArray(initialPortfolio?.data) ? initialPortfolio.data : [];
  const [portfolio, setPortfolio] = useState(shouldRehydratePages ? [] : initialPortfolioData);
  const [pagination, setPagination] = useState({
    current_page: initialPortfolio?.current_page ?? 1,
    first_page: initialPortfolio?.first_page ?? 1,
    last_page: initialPortfolio?.last_page ?? 1,
    next_page_url: initialPortfolio?.next_page_url ?? null,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(shouldRehydratePages || initialPortfolioData.length === 0);
  const [newItems, setNewItems] = useState([]);

  const { t } = useTranslation();
  const resolvedLocale = currentLanguage?.slug ?? window.location.pathname.split('/').filter(Boolean)[0] ?? 'en';

  const handlePortfolio = async (page = null) => {
    const currentPage = Number(pagination.current_page ?? 1);
    const lastPage = Number(pagination.last_page ?? 1);
    const requestedPage = page !== null ? Number(page) : currentPage + 1;

    if (!Number.isFinite(requestedPage) || requestedPage < 1 || requestedPage > lastPage) {
      return;
    }

    setLoadingMore(true);

    try {
      const url = route("site.portfolio.load", {
        locale: resolvedLocale,
        page: requestedPage,
      });

      const response = await axios.get(url);

      if (response.data?.portfolio) {
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
      } else {
        throw new Error("Invalid portfolio response shape");
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
    let isMounted = true;

    const rehydratePortfolioUntilPage = async () => {
      if (!isInitialLoad) {
        return;
      }

      const serverLastPage = Number(initialPortfolio?.last_page ?? 1);
      const targetPage = Math.min(initialPage, Number.isFinite(serverLastPage) && serverLastPage > 0 ? serverLastPage : 1);

      if (targetPage <= 1 && !shouldRehydratePages) {
        if (isMounted) {
          setIsInitialLoad(false);
        }
        return;
      }

      setLoadingMore(true);

      try {
        const pageResponses = await Promise.all(
          Array.from({ length: targetPage }, (_, index) =>
            axios.get(
              route("site.portfolio.load", {
                locale: resolvedLocale,
                page: index + 1,
              })
            )
          )
        );

        if (!isMounted) {
          return;
        }

        const allItems = pageResponses.flatMap((response) => response.data?.portfolio?.data ?? []);
        const mergedItems = Array.from(new Map(allItems.map((item) => [item.id, item])).values());
        const lastResponse = pageResponses[pageResponses.length - 1];
        const lastPortfolioPage = lastResponse?.data?.portfolio;

        setPortfolio(mergedItems);

        if (lastPortfolioPage) {
          setPagination({
            current_page: lastPortfolioPage.current_page,
            first_page: lastPortfolioPage.first_page,
            last_page: lastPortfolioPage.last_page,
            next_page_url: lastPortfolioPage.next_page_url,
          });
        }
      } catch (error) {
        console.error("Failed to rehydrate portfolio data:", error);
      } finally {
        if (isMounted) {
          setIsInitialLoad(false);
          setLoadingMore(false);
        }
      }
    };

    rehydratePortfolioUntilPage();

    return () => {
      isMounted = false;
    };
  }, [initialPage, initialPortfolio?.last_page, isInitialLoad, resolvedLocale, shouldRehydratePages]);

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
