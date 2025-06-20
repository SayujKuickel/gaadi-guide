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
    console.log(graph);

    if (!graph[fromStopId] || !graph[toStopId]) {
      throw new Error("No valid routes found");
    }

    // Check for direct route first
    const directRoute = (routes as IRoute[]).find((route) => {
      const stopIndex = route.stops.indexOf(fromStopId);
      if (stopIndex === -1) return false;
      const toIndex = route.stops.indexOf(toStopId);
      return toIndex !== -1 && toIndex > stopIndex; // Ensure toStopId is after fromStopId
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

    // BFS to find path maximizing stops per route if no direct route
    const queue: {
      stop: string;
      path: { stop: string; routeId: string | null }[];
      currentRouteId: string | null;
    }[] = [
      {
        stop: fromStopId,
        path: [{ stop: fromStopId, routeId: null }],
        currentRouteId: null,
      },
    ];
    const visited = new Set([`${fromStopId}:null`]);

    while (queue.length) {
      const { stop, path, currentRouteId } = queue.shift()!;

      if (stop === toStopId) {
        // Build result with minimized segments
        const routeSegments: IRouteSegment[] = [];
        let currentSegmentStops: string[] = [path[0].stop];
        let currentSegmentRouteId: string | null = null;

        for (let i = 1; i < path.length; i++) {
          const { stop: nextStop, routeId } = path[i];
          // Only split if a transfer is required (routeId changes and no direct continuation)
          if (
            routeId !== currentSegmentRouteId &&
            currentSegmentRouteId !== null &&
            isTransferRequired(path, i, graph)
          ) {
            const route = (routes as IRoute[]).find(
              (r) => r.id === currentSegmentRouteId
            );
            if (!route) {
              throw new Error(`Route ${currentSegmentRouteId} not found`);
            }
            routeSegments.push({
              id: route.id,
              name: route.name,
              lineColor: route.lineColor,
              stops: [...currentSegmentStops],
            });
            currentSegmentStops = [
              currentSegmentStops[currentSegmentStops.length - 1],
            ]; // Carry over last stop
          }
          currentSegmentRouteId = routeId;
          currentSegmentStops.push(nextStop);
        }

        // Add the last segment
        if (currentSegmentStops.length > 1) {
          const route = (routes as IRoute[]).find(
            (r) => r.id === currentSegmentRouteId
          );
          if (!route) {
            throw new Error(`Route ${currentSegmentRouteId} not found`);
          }
          routeSegments.push({
            id: route.id,
            name: route.name,
            lineColor: route.lineColor,
            stops: [...currentSegmentStops],
          });
        }

        // Ensure segments join properly
        for (let i = 0; i < routeSegments.length - 1; i++) {
          const currentSegment = routeSegments[i];
          const nextSegment = routeSegments[i + 1];
          if (
            currentSegment.stops[currentSegment.stops.length - 1] !==
            nextSegment.stops[0]
          ) {
            throw new Error("Segments do not join properly");
          }
        }

        return {
          segments: routeSegments,
          error: null,
        };
      }

      // Prioritize same routeId to maximize stops, then consider transfers
      const neighbors = graph[stop] || [];
      neighbors.sort((a, b) => {
        const aSameRoute = a.routeId === currentRouteId && !a.isTransfer;
        const bSameRoute = b.routeId === currentRouteId && !b.isTransfer;
        return aSameRoute === bSameRoute ? 0 : aSameRoute ? -1 : 1;
      });

      for (const neighbor of neighbors) {
        const { stop: nextStop, routeId, isTransfer } = neighbor;
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
  } catch (error) {
    return { segments: null, error: (error as Error).message };
  }
}

// Helper function to check if a transfer is required
function isTransferRequired(
  path: { stop: string; routeId: string | null }[],
  index: number,
  graph: Graph
): boolean {
  const current = path[index];
  const prev = path[index - 1];
  if (!prev.routeId || !current.routeId || prev.routeId === current.routeId)
    return false;
  // Check if the current route can continue without a transfer
  const neighbors = graph[prev.stop] || [];
  return !neighbors.some(
    (n) =>
      n.stop === current.stop && n.routeId === prev.routeId && !n.isTransfer
  );
}

export default searchRouteSegments;
