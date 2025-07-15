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

interface PathNode {
  stop: string;
  routeId: string | null;
}

interface QueueNode {
  stop: string;
  routeId: string | null;
  path: PathNode[];
  cost: number;
}

function getCost(
  prevRouteId: string | null,
  currentRouteId: string | null
): number {
  return prevRouteId && currentRouteId && prevRouteId !== currentRouteId
    ? 1001
    : 1;
}

function reconstructSegments(path: PathNode[]): IRouteSegment[] {
  const segments: IRouteSegment[] = [];
  let currentRouteId: string | null = null;
  let currentStops: string[] = [];

  for (let i = 0; i < path.length; i++) {
    const { stop, routeId } = path[i];

    if (routeId !== currentRouteId) {
      if (currentStops.length > 1 && currentRouteId) {
        const route = (routes as IRoute[]).find((r) => r.id === currentRouteId);
        if (!route) throw new Error(`Route ${currentRouteId} not found`);
        segments.push({
          id: route.id,
          name: route.name,
          lineColor: route.lineColor,
          stops: [...currentStops],
        });
      }
      currentStops = currentStops.length
        ? [currentStops[currentStops.length - 1]]
        : [];
      currentRouteId = routeId;
    }
    currentStops.push(stop);
  }

  if (currentStops.length > 1 && currentRouteId) {
    const route = (routes as IRoute[]).find((r) => r.id === currentRouteId);
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

async function searchRouteSegments(
  fromStopId: string,
  toStopId: string
): Promise<SearchResult> {
  try {
    if (!fromStopId || !toStopId) {
      throw new Error("Start and destination stop IDs are required");
    }

    if (fromStopId === toStopId) {
      throw new Error("Start and destination cannot be the same");
    }

    const graph: Graph = graphData;

    if (!graph[fromStopId] || !graph[toStopId]) {
      throw new Error("No valid routes found");
    }

    const directRoute = (routes as IRoute[]).find((route) => {
      const start = route.stops.indexOf(fromStopId);
      const end = route.stops.indexOf(toStopId);
      return start !== -1 && end !== -1 && start < end;
    });

    if (directRoute) {
      const start = directRoute.stops.indexOf(fromStopId);
      const end = directRoute.stops.indexOf(toStopId);
      return {
        segments: [
          {
            id: directRoute.id,
            name: directRoute.name,
            lineColor: directRoute.lineColor,
            stops: directRoute.stops.slice(start, end + 1),
          },
        ],
        error: null,
      };
    }

    const queue: QueueNode[] = [
      {
        stop: fromStopId,
        routeId: null,
        path: [{ stop: fromStopId, routeId: null }],
        cost: 0,
      },
    ];

    const visited = new Map<string, number>();

    while (queue.length > 0) {
      queue.sort((a, b) => a.cost - b.cost);

      const { stop, routeId, path, cost } = queue.shift()!;

      if (stop === toStopId) {
        const segments = reconstructSegments(path);
        return { segments, error: null };
      }

      const neighbors = graph[stop] || [];
      for (const neighbor of neighbors) {
        const key = `${neighbor.stop}:${neighbor.routeId}`;
        const newCost = cost + getCost(routeId, neighbor.routeId);

        if (!visited.has(key) || visited.get(key)! > newCost) {
          visited.set(key, newCost);
          queue.push({
            stop: neighbor.stop,
            routeId: neighbor.routeId,
            path: [...path, { stop: neighbor.stop, routeId: neighbor.routeId }],
            cost: newCost,
          });
        }
      }
    }

    return { segments: null, error: "No route found" };
  } catch (error) {
    return { segments: null, error: (error as Error).message };
  }
}

export default searchRouteSegments;
