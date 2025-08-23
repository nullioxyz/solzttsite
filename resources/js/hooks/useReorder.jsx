import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * useReorder
 * @param {Array} initialItems - lista inicial
 * @param {Object} options
 *  - onSave: (payload, nextItems) => Promise<void> | void
 *  - idKey: string (default: 'id')
 *  - sortKey: string (default: 'order')
 *  - direction: 'vertical' | 'horizontal' (default: 'vertical')
 *  - debounceMs: number (default: 0)
 *  - resetOnInitialChange: boolean (default: true) // ressincroniza quando o servidor manda nova lista
 */
export function useReorder(
  initialItems,
  {
    onSave,
    idKey = "id",
    sortKey = "order",
    direction = "vertical",
    debounceMs = 0,
    resetOnInitialChange = true,
  } = {}
) {
  const [items, setItems] = useState(() => initialItems ?? []);
  const prevCommittedRef = useRef(items);
  const timerRef = useRef(null);

  // opcional: manter em sincronia quando o servidor muda a lista (ex.: após um reload)
  useEffect(() => {
    if (!resetOnInitialChange) return;
    setItems(initialItems ?? []);
    prevCommittedRef.current = initialItems ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialItems)]);

  const reorderArray = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }, []);

  const buildPayload = useCallback(
    (list) =>
      list.map((it, idx) => ({
        [idKey]: it[idKey],
        [sortKey]: idx + 1,
      })),
    [idKey, sortKey]
  );

  const persist = useCallback(
    async (next) => {
      if (!onSave) return;
      const payload = buildPayload(next);

      try {
        await onSave(payload, next);
        prevCommittedRef.current = next;
      } catch (err) {
        // rollback
        setItems(prevCommittedRef.current);
        throw err;
      }
    },
    [onSave, buildPayload]
  );

  const onDragEnd = useCallback(
    (result) => {
      if (!result?.destination) return;
      const next = reorderArray(items, result.source.index, result.destination.index);
      setItems(next);

      if (!onSave) return;

      if (debounceMs > 0) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          persist(next);
        }, debounceMs);
      } else {
        void persist(next);
      }
    },
    [items, reorderArray, onSave, debounceMs, persist]
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return useMemo(
    () => ({
      items,
      setItems,
      onDragEnd,      // plugue no <DragDropContext onDragEnd={onDragEnd} />
      direction,      // passe para o <Droppable direction={direction} />
      buildPayload,   // útil se quiser salvar manualmente
    }),
    [items, onDragEnd, direction, buildPayload]
  );
}
