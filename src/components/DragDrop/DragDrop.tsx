import React, { createContext, useContext, useState, useCallback } from 'react';

/* ─── Context ───────────────────────────────────────────────────────────── */

export interface DragDropContextValue {
  draggingId: string | null;
  setDraggingId: (id: string | null) => void;
  overDroppableId: string | null;
  setOverDroppableId: (id: string | null) => void;
  sourceDroppableId: string | null;
  setSourceDroppableId: (id: string | null) => void;
  triggerDragEnd: (result: {
    draggableId: string;
    sourceId: string;
    destinationId: string | null;
  }) => void;
}

const DragDropContext = createContext<DragDropContextValue | null>(null);

function useDragDropContext(): DragDropContextValue {
  const ctx = useContext(DragDropContext);
  if (!ctx) {
    throw new Error('useDragDropContext must be used within a DragDropProvider');
  }
  return ctx;
}

/* ─── Provider ──────────────────────────────────────────────────────────── */

export interface DragDropProviderProps {
  children: React.ReactNode;
  onDragEnd?: (result: {
    draggableId: string;
    sourceId: string;
    destinationId: string | null;
  }) => void;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  onDragEnd,
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overDroppableId, setOverDroppableId] = useState<string | null>(null);
  const [sourceDroppableId, setSourceDroppableId] = useState<string | null>(null);

  const triggerDragEnd = useCallback(
    (result: {
      draggableId: string;
      sourceId: string;
      destinationId: string | null;
    }) => {
      onDragEnd?.(result);
      setDraggingId(null);
      setOverDroppableId(null);
      setSourceDroppableId(null);
    },
    [onDragEnd]
  );

  return (
    <DragDropContext.Provider
      value={{
        draggingId,
        setDraggingId,
        overDroppableId,
        setOverDroppableId,
        sourceDroppableId,
        setSourceDroppableId,
        triggerDragEnd,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

/* ─── useDraggable ──────────────────────────────────────────────────────── */

export interface DraggableOptions {
  id: string;
  sourceDroppableId?: string;
  data?: Record<string, unknown>;
}

export interface DraggableResult {
  draggableProps: {
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
  };
  isDragging: boolean;
}

export function useDraggable(options: DraggableOptions): DraggableResult {
  const ctx = useDragDropContext();
  const { id, sourceDroppableId, data } = options;

  const isDragging = ctx.draggingId === id;

  const onDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', id);
      if (data) {
        e.dataTransfer.setData('application/json', JSON.stringify(data));
      }
      e.dataTransfer.effectAllowed = 'move';
      ctx.setDraggingId(id);
      if (sourceDroppableId) {
        ctx.setSourceDroppableId(sourceDroppableId);
      }
    },
    [id, data, sourceDroppableId, ctx]
  );

  const onDragEnd = useCallback(
    (_e: React.DragEvent) => {
      if (ctx.draggingId) {
        ctx.triggerDragEnd({
          draggableId: id,
          sourceId: ctx.sourceDroppableId ?? '',
          destinationId: ctx.overDroppableId,
        });
      }
    },
    [id, ctx]
  );

  return {
    draggableProps: {
      draggable: true,
      onDragStart,
      onDragEnd,
    },
    isDragging,
  };
}

/* ─── useDroppable ──────────────────────────────────────────────────────── */

export interface DroppableOptions {
  id: string;
  accept?: string[];
}

export interface DroppableResult {
  droppableProps: {
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
  };
  isOver: boolean;
}

export function useDroppable(options: DroppableOptions): DroppableResult {
  const ctx = useDragDropContext();
  const { id } = options;

  const isOver = ctx.overDroppableId === id;

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (ctx.overDroppableId !== id) {
        ctx.setOverDroppableId(id);
      }
    },
    [id, ctx]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const draggableId = e.dataTransfer.getData('text/plain');
      ctx.triggerDragEnd({
        draggableId,
        sourceId: ctx.sourceDroppableId ?? '',
        destinationId: id,
      });
    },
    [id, ctx]
  );

  const onDragLeave = useCallback(
    (e: React.DragEvent) => {
      // Only clear if we're leaving the droppable (not entering a child)
      const related = e.relatedTarget as Node | null;
      if (!e.currentTarget.contains(related)) {
        ctx.setOverDroppableId(null);
      }
    },
    [ctx]
  );

  return {
    droppableProps: { onDragOver, onDrop, onDragLeave },
    isOver,
  };
}

/* ─── useDragAndDrop (list reordering convenience hook) ─────────────────── */

export interface DragAndDropOptions<T extends { id: string }> {
  id: string;
  items: T[];
  onReorder: (newOrder: T[]) => void;
}

export interface DragAndDropResult<T extends { id: string }> {
  items: T[];
  draggingId: string | null;
  getItemProps: (item: T) => {
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
}

export function useDragAndDrop<T extends { id: string }>(
  options: DragAndDropOptions<T>
): DragAndDropResult<T> {
  const { items, onReorder } = options;
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const getItemProps = useCallback(
    (item: T) => ({
      draggable: true as const,
      onDragStart: (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'move';
        setDraggingId(item.id);
      },
      onDragEnd: (_e: React.DragEvent) => {
        setDraggingId(null);
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        if (draggedId === item.id) return;

        const draggedIndex = items.findIndex((i) => i.id === draggedId);
        const targetIndex = items.findIndex((i) => i.id === item.id);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const next = [...items];
        const [removed] = next.splice(draggedIndex, 1);
        next.splice(targetIndex, 0, removed);
        onReorder(next);
        setDraggingId(null);
      },
    }),
    [items, onReorder]
  );

  return { items, draggingId, getItemProps };
}
