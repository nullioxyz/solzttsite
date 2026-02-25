import { useEffect, useRef, useState } from 'react'
import axios from '@/Services/requests'
import { Card, Spinner } from "@material-tailwind/react";
import anime from 'animejs';
import { useSelectReferences } from '@/Contexts/SelectReferencesContext';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'
import { SkeletonCard } from '@/Components/Skeleton/SkeletonCard';
import { Thumb } from '../Components/Thumb';

export default function AvailableDesign({ currentLanguage, initialDesigns }) {
  const boxRefs = useRef([]);
  const initialPageFromUrl = Number(new URLSearchParams(window.location.search).get("page") || 1);
  const initialPage = Number.isFinite(initialPageFromUrl) && initialPageFromUrl > 0 ? initialPageFromUrl : 1;
  const shouldRehydratePages = initialPage > 1;
  const initialDesignsData = Array.isArray(initialDesigns?.data) ? initialDesigns.data : [];
  const [designs, setDesigns] = useState(shouldRehydratePages ? [] : initialDesignsData);
  const [currentLangData, setCurrentLangData] = useState(currentLanguage ?? []);
  const [pagination, setPagination] = useState({
    current_page: initialDesigns?.current_page ?? 1,
    first_page: initialDesigns?.first_page ?? 1,
    last_page: initialDesigns?.last_page ?? 1,
    next_page_url: initialDesigns?.next_page_url ?? null,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [newItems, setNewItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(shouldRehydratePages || initialDesignsData.length === 0);
  const { t } = useTranslation();
  const resolvedLocale = currentLanguage?.slug ?? window.location.pathname.split('/').filter(Boolean)[0] ?? 'en';

  const handleDesigns = async (page = null) => {
    const currentPage = Number(pagination.current_page ?? 1);
    const lastPage = Number(pagination.last_page ?? 1);
    const requestedPage = page !== null ? Number(page) : currentPage + 1;

    if (!Number.isFinite(requestedPage) || requestedPage < 1 || requestedPage > lastPage) {
      return;
    }

    setLoadingMore(true);
    
    try {
      const url = route("site.available_designs.load", {
        locale: resolvedLocale,
        page: requestedPage,
      });

      const response = await axios.get(url);

      if (response.data?.designs) {
        const { data, first_page, current_page, last_page, next_page_url } = response.data.designs;
        const { currentLang } = response.data;

        setNewItems(data);
        setDesigns(prevDesigns => {
          // merge sem duplicar
          const merged = [...prevDesigns, ...data];
          return Array.from(new Map(merged.map(item => [item.id, item])).values());
        });

        setCurrentLangData(currentLang);
        setPagination({
          current_page,
          first_page,
          last_page,
          next_page_url,
        });

        // atualiza a URL com Inertia
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
        throw new Error("Invalid available designs response shape");
      }
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  
  useEffect(() => {
    let isMounted = true;

    const rehydrateDesignsUntilPage = async () => {
      if (!isInitialLoad) {
        return;
      }

      const serverLastPage = Number(initialDesigns?.last_page ?? 1);
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
              route("site.available_designs.load", {
                locale: resolvedLocale,
                page: index + 1,
              })
            )
          )
        );

        if (!isMounted) {
          return;
        }

        const allItems = pageResponses.flatMap((response) => response.data?.designs?.data ?? []);
        const mergedItems = Array.from(new Map(allItems.map((item) => [item.id, item])).values());
        const lastResponse = pageResponses[pageResponses.length - 1];
        const lastDesignsPage = lastResponse?.data?.designs;
        const currentLang = lastResponse?.data?.currentLang;

        setDesigns(mergedItems);

        if (currentLang) {
          setCurrentLangData(currentLang);
        }

        if (lastDesignsPage) {
          setPagination({
            current_page: lastDesignsPage.current_page,
            first_page: lastDesignsPage.first_page,
            last_page: lastDesignsPage.last_page,
            next_page_url: lastDesignsPage.next_page_url,
          });
        }
      } catch (error) {
        console.error("Error rehydrating available designs:", error);
      } finally {
        if (isMounted) {
          setIsInitialLoad(false);
          setLoadingMore(false);
        }
      }
    };

    rehydrateDesignsUntilPage();

    return () => {
      isMounted = false;
    };
  }, [initialDesigns?.last_page, initialPage, isInitialLoad, resolvedLocale, shouldRehydratePages]);

  useEffect(() => {
    if (newItems.length > 0) {
      boxRefs.current = boxRefs.current.slice(0, designs.length);

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
  }, [newItems, designs.length]);

  return (
    <section id="available" className="flex flex-col justify-between xl:mt-20 lg:mt-20 md:mt-20 sm:mt-5 xs:mt-5 h-auto p-[0.5rem] py-10">
      <div className="max-w-[1240px] mx-auto w-full">
        
        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] lg:text-center xl:text-left md:text-center sm:text-center xs:text-center text-center">
            {t('available')}
          </h1>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 xs:grid-cols-3 md:grid-cols-3 gap-x-1 gap-y-1 mb-24">
          {isInitialLoad && designs.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk_${i}`} />)
          ) : (
            <>
              {designs.length > 0 && designs.map((item, index) => (
                 <Card
                  key={index}
                  className="
                    relative w-full rounded-none 
                    sm:w-full
                    cursor-pointer overflow-hidden
                  ">
                  <a href={route('site.available_designs.show', { locale: (currentLangData?.slug ?? resolvedLocale), slug: item.slug })}
                    className="block"
                  >
                    {/* O aspect ratio vive AQUI */}
                    <div className="relative aspect-[3/4]">
                      {/* O conteúdo preenche a caixa 3:4 */}
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
              onClick={() => handleDesigns()}
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
  )
}
