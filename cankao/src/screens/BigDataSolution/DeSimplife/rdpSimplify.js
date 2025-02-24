const rdpSimplify = (data, epsilon = 0.01) => {
  const path = data.map((point) => point.value);

  const findMaxDistance = (points) => {
    let maxDist = 0;
    let index = 0;
    const end = points.length - 1;

    for (let i = 1; i < end; i++) {
      const dist = pointLineDistance(points[i], points[0], points[end]);
      if (dist > maxDist) {
        index = i;
        maxDist = dist;
      }
    }

    return { index, maxDist };
  };

  const pointLineDistance = (point, start, end) => {
    const l2 = (start.x - end.x) ** 2 + (start.y - end.y) ** 2;
    if (l2 === 0) return distance(point, start);
    let t =
      ((point.x - start.x) * (end.x - start.x) +
        (point.y - start.y) * (end.y - start.y)) /
      l2;
    t = Math.max(0, Math.min(1, t));
    return distance(point, {
      x: start.x + t * (end.x - start.x),
      y: start.y + t * (end.y - start.y),
    });
  };

  const distance = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

  if (path.length < 2) return data; 

  const { maxDist, index } = findMaxDistance(path);
  if (maxDist > epsilon) {
    const l1 = data.slice(0, index + 1);
    const l2 = data.slice(index);
    const r1 = rdpSimplify(l1, epsilon);
    const r2 = rdpSimplify(l2, epsilon);
    return [...r1.slice(0, -1), ...r2];
  } else {
    return [data[0], data[data.length - 1]];
  }
};

export default rdpSimplify;
