import { type IRoute } from "@/types/route.types";
import routes from "@/data/route_data.json";
import graphData from "@/data/graph.json";

interface GraphNode {
  stop: string;
  routeId: string;
  isTransfer?: boolean;
}

interface Graph {
  [key: string]: GraphNode[];
}

export interface IRouteSegment {
  id: string;
  name: string;
  lineColor: string;
  stops: string[];
}

interface SearchResult {
  segments: IRouteSegment[] | null;
  error: string | null;
}

type PathStep = { stop: string; routeId: string | null };

function getRouteById(routeId: string): IRoute | undefined {
  return (routes as IRoute[]).find((r) => r.id === routeId);
}

function isTransferRequired(
  path: PathStep[],
  index: number,
  graph: Graph
): boolean {
  const current = path[index];
  const prev = path[index - 1];
  if (!prev.routeId || !current.routeId || prev.routeId === current.routeId)
    return false;

  const neighbors = graph[prev.stop] || [];
  return !neighbors.some(
    (n) =>
      n.stop === current.stop && n.routeId === prev.routeId && !n.isTransfer
  );
}

function buildRouteSegmentsFromPath(
  path: PathStep[],
  graph: Graph
): IRouteSegment[] {
  const segments: IRouteSegment[] = [];
  let currentStops: string[] = [path[0].stop];
  let currentRouteId: string | null = null;

  for (let i = 1; i < path.length; i++) {
    const { stop: nextStop, routeId } = path[i];

    const isTransfer =
      routeId !== currentRouteId &&
      currentRouteId !== null &&
      isTransferRequired(path, i, graph);

    if (isTransfer) {
      const route = getRouteById(currentRouteId!);
      if (!route) throw new Error(`Route ${currentRouteId} not found`);

      segments.push({
        id: route.id,
        name: route.name,
        lineColor: route.lineColor,
        stops: [...currentStops],
      });

      currentStops = [currentStops.at(-1)!];
    }

    currentRouteId = routeId;
    currentStops.push(nextStop);
  }

  if (currentStops.length > 1 && currentRouteId) {
    const route = getRouteById(currentRouteId);
    if (!route) throw new Error(`Route ${currentRouteId} not found`);
    segments.push({
      id: route.id,
      name: route.name,
      lineColor: route.lineColor,
      stops: [...currentStops],
    });
  }

  return segments;
}

function tryMergeSegments(segments: IRouteSegment[]): IRouteSegment[] {
  const merged: IRouteSegment[] = [];
  let i = 0;

  while (i < segments.length) {
    if (i < segments.length - 1) {
      const current = segments[i];
      const next = segments[i + 1];

      const shouldAttemptMerge =
        current.stops.length <= 3 || next.stops.length <= 3;

      if (shouldAttemptMerge) {
        const combinedStops = [...current.stops];
        if (combinedStops[combinedStops.length - 1] === next.stops[0]) {
          combinedStops.pop();
        }
        combinedStops.push(...next.stops);

        const mergedRoute = (routes as IRoute[]).find((r) => {
          const startIdx = r.stops.indexOf(combinedStops[0]);
          const endIdx = r.stops.indexOf(
            combinedStops[combinedStops.length - 1]
          );
          if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx)
            return false;

          const routeSlice = r.stops.slice(startIdx, endIdx + 1);
          return combinedStops.every((stop, idx) => stop === routeSlice[idx]);
        });

        if (mergedRoute) {
          merged.push({
            id: mergedRoute.id,
            name: mergedRoute.name,
            lineColor: mergedRoute.lineColor,
            stops: combinedStops,
          });
          i += 2;
          continue;
        }
      }
    }

    merged.push(segments[i]);
    i++;
  }

  return merged;
}

async function searchRouteSegments(
  fromStopId: string,
  toStopId: string
): Promise<SearchResult> {
  try {
    if (!fromStopId || !toStopId)
      throw new Error("Start and destination stop IDs are required");
    if (fromStopId === toStopId)
      throw new Error("Start and destination cannot be the same");

    const graph: Graph = graphData;

    if (!graph[fromStopId] || !graph[toStopId])
      throw new Error("No valid routes found");

    const directRoute = (routes as IRoute[]).find((route) => {
      const fromIndex = route.stops.indexOf(fromStopId);
      const toIndex = route.stops.indexOf(toStopId);
      return fromIndex !== -1 && toIndex !== -1 && toIndex > fromIndex;
    });

    if (directRoute) {
      const startIndex = directRoute.stops.indexOf(fromStopId);
      const endIndex = directRoute.stops.indexOf(toStopId);
      const segmentStops = directRoute.stops.slice(startIndex, endIndex + 1);

      return {
        segments: [
          {
            id: directRoute.id,
            name: directRoute.name,
            lineColor: directRoute.lineColor,
            stops: segmentStops,
          },
        ],
        error: null,
      };
    }

    const queue: {
      stop: string;
      path: PathStep[];
      currentRouteId: string | null;
    }[] = [
      {
        stop: fromStopId,
        path: [{ stop: fromStopId, routeId: null }],
        currentRouteId: null,
      },
    ];

    const visited = new Set([`${fromStopId}:null`]);

    while (queue.length > 0) {
      const { stop, path, currentRouteId } = queue.shift()!;

      if (stop === toStopId) {
        let segments = buildRouteSegmentsFromPath(path, graph);
        segments = tryMergeSegments(segments);

        for (let i = 0; i < segments.length - 1; i++) {
          const endStop = segments[i].stops.at(-1);
          const nextStart = segments[i + 1].stops[0];
          if (endStop !== nextStart) {
            throw new Error("Segments do not join properly");
          }
        }

        return { segments, error: null };
      }

      const neighbors = [...(graph[stop] || [])].sort((a, b) => {
        const aSame = a.routeId === currentRouteId && !a.isTransfer;
        const bSame = b.routeId === currentRouteId && !b.isTransfer;
        return aSame === bSame ? 0 : aSame ? -1 : 1;
      });

      for (const neighbor of neighbors) {
        const { stop: nextStop, routeId } = neighbor;
        const key = `${nextStop}:${routeId || "null"}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({
            stop: nextStop,
            path: [...path, { stop: nextStop, routeId }],
            currentRouteId: routeId || currentRouteId,
          });
        }
      }
    }

    return { segments: null, error: "No route found" };
  } catch (err) {
    return { segments: null, error: (err as Error).message };
  }
}

export default searchRouteSegments;
