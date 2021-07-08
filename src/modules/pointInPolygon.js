// A Javascript program to check if a given point
// lies inside a given polygon
// Src https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
// for explanation of functions onSegment(),
// orien() and doIntersect()

// Define Infinite (Using INT_MAX
// caused overflow problems)
let INF = 10000;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Given three colinear points p, q, r,
// the function checks if point q lies
// on line segment 'pr'
function onSegment(p, q, r) {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  ) {
    return true;
  }
  return false;
}

// To find orien of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orien(p, q, r) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) {
    return 0; // colinear
  }
  return val > 0 ? 1 : 2; // clock or counterclock wise
}

// The function that returns true if
// line segment 'p1q1' and 'p2q2' intersect.
function doIntersect(p1, q1, p2, q2) {
  // Find the four oriens needed for
  // general and special cases
  let o1 = orien(p1, q1, p2);
  let o2 = orien(p1, q1, q2);
  let o3 = orien(p2, q2, p1);
  let o4 = orien(p2, q2, q1);

  // General case
  if (o1 != o2 && o3 != o4) {
    return true;
  }

  // Special Cases
  // p1, q1 and p2 are colinear and
  // p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) {
    return true;
  }

  // p1, q1 and p2 are colinear and
  // q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) {
    return true;
  }

  // p2, q2 and p1 are colinear and
  // p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) {
    return true;
  }

  // p2, q2 and q1 are colinear and
  // q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) {
    return true;
  }

  // Doesn't fall in any of the above cases
  return false;
}

// Returns true if the point p lies
// inside the polygon[] with n vertices
function isInside(polygon, n, p) {
  // There must be at least 3 vertices in polygon[]
  if (n < 3) {
    return false;
  }

  // Create a point for line segment from p to infinite
  let extreme = new Point(INF, p.y);

  // Count intersections of the above line
  // with sides of polygon
  let count = 0,
    i = 0;
  do {
    let next = (i + 1) % n;

    // Check if the line segment from 'p' to
    // 'extreme' intersects with the line
    // segment from 'polygon[i]' to 'polygon[next]'
    if (doIntersect(polygon[i], polygon[next], p, extreme)) {
      // If the point 'p' is colinear with line
      // segment 'i-next', then check if it lies
      // on segment. If it lies, return true, otherwise false
      if (orien(polygon[i], p, polygon[next]) == 0) {
        return onSegment(polygon[i], p, polygon[next]);
      }

      count++;
    }
    i = next;
  } while (i != 0);

  // Return true if count is odd, false otherwise
  return count % 2 == 1; // Same as (count%2 == 1)
}

// Driver Code
// polygon1 = [new Point(0, 0), new Point(10, 0), new Point(10, 10)];
// let n = polygon1.length;
// let p = new Point(20, 20);
// if (isInside(polygon1, n, p)) {
//   return true;
// } else {
//   return false;
// }
// This code is contributed by rag2127
export const inside = (pol, q) => {
  const poligon = pol.map(el => new Point(el.point[0], el.point[1]));
  const len = poligon.length;
  const point = new Point(q[0], q[1]);

  if (isInside(poligon, len, point)) {
    return true;
  }
  return false;
};
