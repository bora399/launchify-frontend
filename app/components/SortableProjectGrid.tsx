"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  moveProject,
  orderProjects,
  projectOrderId,
  readProjectOrder,
  type OrderableProject,
} from "../utils/projectOrder";

type Drag = {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  startScrollY: number;
  clientX: number;
  clientY: number;
  x: number;
  y: number;
  overId: string | null;
  active: boolean;
};

export default function SortableProjectGrid<T extends OrderableProject>({
  projects,
  userId,
  renderProject,
}: {
  projects: T[];
  userId?: string;
  renderProject: (project: T) => ReactNode;
}) {
  const storageKey = userId ? `launchify_project_order_${userId}` : null;
  const [saved, setSaved] = useState<{ key: string | null; order: string[] }>({
    key: null,
    order: [],
  });
  const [drag, setDrag] = useState<Drag | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const dragRef = useRef<Drag | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const ordered = orderProjects(
    projects,
    saved.key === storageKey ? saved.order : [],
  );

  useEffect(() => {
    if (!storageKey) return;
    try {
      setSaved({
        key: storageKey,
        order: readProjectOrder(localStorage.getItem(storageKey)),
      });
    } catch {
      setSaved({ key: storageKey, order: [] });
    }
  }, [storageKey]);

  function reorder(sourceId: string, targetId: string) {
    const ids = ordered.map(projectOrderId);
    const next = moveProject(ids, sourceId, targetId);
    if (next.every((id, index) => id === ids[index])) return;
    setSaved({ key: storageKey, order: next });
    let stored = false;
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        stored = true;
      } catch {
        // Reordering still works for this visit when browser storage is unavailable.
      }
    }
    const project = projects.find((item) => projectOrderId(item) === sourceId);
    setAnnouncement(
      `${project?.productName || project?.slug || "Proje"} ${next.indexOf(sourceId) + 1}. sıraya taşındı.${stored ? "" : " Sıralama bu ziyaret için uygulandı."}`,
    );
  }

  function cancelDrag() {
    dragRef.current = null;
    setDrag(null);
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>, id: string) {
    if (event.button !== 0 || !event.isPrimary) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollY: window.scrollY,
      clientX: event.clientX,
      clientY: event.clientY,
      x: 0,
      y: 0,
      overId: null,
      active: false,
    };
  }

  const updateDrag = useCallback((clientX: number, clientY: number) => {
    const current = dragRef.current;
    if (!current) return;
    const x = clientX - current.startX;
    const y = clientY - current.startY + window.scrollY - current.startScrollY;
    if (!current.active && Math.hypot(x, y) < 6) return;
    let overId: string | null = null;
    for (const card of gridRef.current?.querySelectorAll<HTMLElement>(
      "[data-project-order-id]",
    ) || []) {
      if (card.dataset.projectOrderId === current.id) continue;
      const rect = card.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        overId = card.dataset.projectOrderId || null;
        break;
      }
    }
    const next = { ...current, x, y, clientX, clientY, overId, active: true };
    dragRef.current = next;
    setDrag(next);
  }, []);

  const isDragging = drag?.active ?? false;
  useEffect(() => {
    if (!isDragging) return;
    let frame: number;
    function tick() {
      const current = dragRef.current;
      if (!current?.active) return;
      // Keep off-screen rows reachable while holding a grip on touch screens.
      const delta =
        current.clientY > window.innerHeight - 65
          ? 10
          : current.clientY < 115
            ? -10
            : 0;
      if (delta) {
        const previous = window.scrollY;
        window.scrollBy({ top: delta, behavior: "instant" });
        if (window.scrollY !== previous)
          updateDrag(current.clientX, current.clientY);
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isDragging, updateDrag]);

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId === event.pointerId)
      updateDrag(event.clientX, event.clientY);
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    const current = dragRef.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (current.active && current.overId) reorder(current.id, current.overId);
    cancelDrag();
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <>
      {projects.length > 1 && (
        <p id={hintId} className="workspace-sort-hint">
          Kartları tutamaçtan sürükleyerek sıralayın.
          <span className="sr-only">
            {" "}
            Klavyeyle sıralamak için tutamaç üzerindeyken ok tuşlarını kullanın.
            Sürüklemeyi iptal etmek için Escape tuşuna basın.
          </span>
        </p>
      )}
      <div
        ref={gridRef}
        role="list"
        aria-label="Proje sayfalarınız"
        className="workspace-project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {ordered.map((project, index) => {
          const id = projectOrderId(project);
          const moving = drag?.active && drag.id === id;
          return (
            <div
              key={id}
              role="listitem"
              data-project-order-id={id}
              className={`workspace-sort-item ${moving ? "is-dragging" : ""} ${drag?.overId === id ? "is-drop-target" : ""}`}
              style={
                moving
                  ? { transform: `translate(${drag.x}px, ${drag.y}px)` }
                  : undefined
              }
            >
              {renderProject(project)}
              {projects.length > 1 && (
                <button
                  type="button"
                  className="workspace-drag-handle"
                  aria-label={`${project.productName || project.slug} sırasını değiştir`}
                  aria-describedby={hintId}
                  title="Sürükleyerek sıralayın · Klavyede ok tuşlarını kullanın"
                  onPointerDown={(event) => pointerDown(event, id)}
                  onPointerMove={pointerMove}
                  onPointerUp={pointerUp}
                  onPointerCancel={cancelDrag}
                  onLostPointerCapture={cancelDrag}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      cancelDrag();
                      return;
                    }
                    if (dragRef.current) return;
                    const direction = ["ArrowLeft", "ArrowUp"].includes(
                      event.key,
                    )
                      ? -1
                      : ["ArrowRight", "ArrowDown"].includes(event.key)
                        ? 1
                        : 0;
                    if (!direction) return;
                    event.preventDefault();
                    const target = ordered[index + direction];
                    if (!target) return;
                    reorder(id, projectOrderId(target));
                    requestAnimationFrame(() =>
                      gridRef.current
                        ?.querySelector<HTMLElement>(
                          `[data-project-order-id="${CSS.escape(id)}"] .workspace-drag-handle`,
                        )
                        ?.focus(),
                    );
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {[4, 8, 12].map((y) => (
                      <g key={y}>
                        <circle cx="5" cy={y} r="1.1" />
                        <circle cx="11" cy={y} r="1.1" />
                      </g>
                    ))}
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </>
  );
}
