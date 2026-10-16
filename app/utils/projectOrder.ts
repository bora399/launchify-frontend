export type OrderableProject = {
  id?: string;
  slug?: string;
  productName?: string;
};

export function projectOrderId(project: OrderableProject): string {
  return project.id || project.slug || "";
}

export function readProjectOrder(value: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    return Array.isArray(parsed)
      ? [
          ...new Set(
            parsed.filter(
              (id): id is string => typeof id === "string" && id.length > 0,
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

// Missing/deleted IDs are ignored. New projects retain their API order at the end.
export function orderProjects<T extends OrderableProject>(
  projects: readonly T[],
  order: readonly string[],
): T[] {
  const positions = new Map(order.map((id, index) => [id, index]));
  return [...projects].sort(
    (a, b) =>
      (positions.get(projectOrderId(a)) ?? Infinity) -
      (positions.get(projectOrderId(b)) ?? Infinity),
  );
}

export function moveProject(
  order: readonly string[],
  sourceId: string,
  targetId: string,
): string[] {
  const source = order.indexOf(sourceId);
  const target = order.indexOf(targetId);
  const next = [...order];
  if (source < 0 || target < 0 || source === target) return next;
  next.splice(source, 1);
  next.splice(target, 0, sourceId);
  return next;
}
